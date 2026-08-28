#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCK_FILE="$SCRIPT_DIR/noto-fonts.lock"
FONT_DIR="${NOTO_FONT_DIR:-$SCRIPT_DIR/.noto-fonts}"
ARCHIVE_DIR="$FONT_DIR/.archives"
MODE=install

usage() {
    cat <<'EOF'
Usage: ./install-noto-fonts.sh [--prepare|--install|--verify]

--prepare  Download, checksum, and extract the pinned fonts into tools/.noto-fonts.
--install  Prepare the bundle and copy it to the current user's font directory (default).
--verify   Validate an existing bundle without downloading or copying fonts.

Set NOTO_FONT_DIR or NOTO_INSTALL_DIR to use another bundle or installation directory.
EOF
}

case "${1:---install}" in
    --prepare) MODE=prepare ;;
    --install) MODE=install ;;
    --verify) MODE=verify ;;
    -h|--help) usage; exit 0 ;;
    *) usage >&2; exit 2 ;;
esac

for command in curl unzip; do
    command -v "$command" >/dev/null || {
        echo "Required command is unavailable: $command" >&2
        exit 1
    }
done

if ! command -v shasum >/dev/null && ! command -v sha256sum >/dev/null; then
    echo "Required command is unavailable: shasum or sha256sum" >&2
    exit 1
fi

sha256() {
    if command -v shasum >/dev/null; then
        shasum -a 256 "$1" | awk '{print $1}'
    else
        sha256sum "$1" | awk '{print $1}'
    fi
}

check_archive() {
    local archive=$1 expected=$2 actual
    actual=$(sha256 "$archive")
    if [ "$actual" != "$expected" ]; then
        echo "Checksum mismatch: $archive" >&2
        echo "Expected $expected, got $actual" >&2
        exit 1
    fi
}

download_archive() {
    local archive_name=$1
    local url=$2
    local expected=$3
    local archive="$ARCHIVE_DIR/$archive_name"
    mkdir -p "$ARCHIVE_DIR"
    if [ -f "$archive" ]; then
        check_archive "$archive" "$expected"
        return
    fi

    echo "Downloading $archive_name"
    curl --fail --location --retry 3 --output "$archive.part" "$url"
    check_archive "$archive.part" "$expected"
    mv "$archive.part" "$archive"
}

verify_fonts() {
    local missing=0 archive url checksum entry output family detected
    while IFS='|' read -r archive url checksum entry output family; do
        case "$archive" in ''|'#'*) continue ;; esac
        if [ ! -f "$FONT_DIR/$output" ]; then
            echo "Missing font: $FONT_DIR/$output" >&2
            missing=1
            continue
        fi
        if command -v fc-scan >/dev/null; then
            detected=$(fc-scan --format '%{family}\n' "$FONT_DIR/$output" | head -1)
            if [ "$detected" != "$family" ]; then
                echo "Unexpected family for $output: expected $family, got ${detected:-none}" >&2
                missing=1
            fi
        fi
    done < "$LOCK_FILE"
    [ "$missing" -eq 0 ] || exit 1
    echo "Pinned Noto bundle is valid in $FONT_DIR"
}

prepare_fonts() {
    local archive url checksum entry output family source
    mkdir -p "$FONT_DIR"
    while IFS='|' read -r archive url checksum entry output family; do
        case "$archive" in ''|'#'*) continue ;; esac
        download_archive "$archive" "$url" "$checksum"
        source="$ARCHIVE_DIR/$archive"
        if [ ! -f "$FONT_DIR/$output" ]; then
            echo "Extracting $output"
            unzip -p "$source" "$entry" > "$FONT_DIR/$output.part"
            test -s "$FONT_DIR/$output.part"
            mv "$FONT_DIR/$output.part" "$FONT_DIR/$output"
        fi
    done < "$LOCK_FILE"
    verify_fonts
}

install_fonts() {
    local install_dir archive url checksum entry output family
    if [ "$(uname -s)" = "Darwin" ]; then
        install_dir="${NOTO_INSTALL_DIR:-$HOME/Library/Fonts}"
    else
        install_dir="${NOTO_INSTALL_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/fonts}"
    fi
    mkdir -p "$install_dir"
    while IFS='|' read -r archive url checksum entry output family; do
        case "$archive" in ''|'#'*) continue ;; esac
        install -m 0644 "$FONT_DIR/$output" "$install_dir/$output"
    done < "$LOCK_FILE"
    command -v fc-cache >/dev/null && fc-cache --force "$install_dir" >/dev/null
    if command -v fc-match >/dev/null; then
        while IFS='|' read -r archive url checksum entry output family; do
            case "$archive" in ''|'#'*) continue ;; esac
            if ! fc-match --format '%{family}\n' "$family" | head -1 | grep -Fqx "$family"; then
                echo "Installed family cannot be resolved by Fontconfig: $family" >&2
                exit 1
            fi
        done < "$LOCK_FILE"
    fi
    echo "Installed pinned Noto fonts in $install_dir"
}

case "$MODE" in
    verify) verify_fonts ;;
    prepare) prepare_fonts ;;
    install) prepare_fonts; install_fonts ;;
esac
