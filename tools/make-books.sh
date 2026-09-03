#!/bin/bash
set -euo pipefail

# This script creates eBooks from the TypeScript Book.

DIR_DOWNLOADS="downloads"
AUTHOR="Simone Poggiali"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "$SCRIPT_DIR/book-artifacts.sh"

cd ../

echo "Making ebooks ..."

# Check dependencies
if command -v pandoc &>/dev/null; then
    echo "pandoc is installed"
else
    echo "You need to install pandoc. Please visit: https://pandoc.org/installing.html"
    exit 1
fi
if command -v epubcheck &>/dev/null; then
    echo "epubcheck is installed"
else
    echo "You need to install epubcheck. Please visit: https://www.w3.org/publishing/epubcheck/docs/installation/"
    exit 1
fi
if command -v ebook-convert &>/dev/null; then
    echo "calibre is installed"
else
    echo "You need to install calibre. Please visit: https://calibre-ebook.com/download"
    exit 1
fi

# Generate eBooks
for artifact in "${BOOK_ARTIFACTS[@]}"; do
    IFS="|" read -r input output title language <<< "$artifact"
    pandoc_options=(
        --data-dir=.
        --lua-filter=tools/epub-anchor-filter.lua
        --output "$DIR_DOWNLOADS/$output.epub"
        --metadata title="$title"
        --metadata author="$AUTHOR"
        --metadata lang="$language"
        --standalone
    )
    if [[ "$language" == "ar" ]]; then
        pandoc_options+=(--metadata dir=rtl --metadata page-progression-direction=rtl --css=tools/rtl.css)
    fi
    pandoc "${pandoc_options[@]}" "$input.md"
done

# Generate PDFs. Calibre selects these fonts while converting EPUB to PDF; the
# book CSS is intentionally not the source of PDF typography.
for artifact in "${BOOK_ARTIFACTS[@]}"; do
    IFS="|" read -r _ output _ language <<< "$artifact"
    serif_family="Noto Serif"
    sans_family="Noto Sans"
    mono_family="Noto Sans Mono"
    case "$language" in
        zh-CN)
            serif_family="Noto Serif CJK SC"
            sans_family="Noto Sans CJK SC"
            mono_family="Noto Sans Mono CJK SC"
            ;;
        ja-JP|ko-KR)
            serif_family="Noto Serif CJK JP"
            sans_family="Noto Sans CJK JP"
            mono_family="Noto Sans Mono CJK JP"
            ;;
    esac
    pdf_options=(
        --pdf-page-numbers \
        --pdf-serif-family="$serif_family" \
        --pdf-sans-family="$sans_family" \
        --pdf-mono-family="$mono_family" \
        --pdf-standard-font=serif
    )
    if [[ "$language" == "ar" ]]; then
        pdf_options+=(--extra-css=tools/pdf-rtl.css)
    fi
    ebook-convert "$DIR_DOWNLOADS/$output.epub" "$DIR_DOWNLOADS/$output.pdf" "${pdf_options[@]}"
done

python3 tools/verify-books.py

echo "Books were created. Please commit!"
