#!/usr/bin/env python3

"""Validate generated EPUB and PDF book artifacts."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import zipfile
from dataclasses import dataclass
from pathlib import Path
from xml.etree import ElementTree


MIN_EPUB_BYTES = 50 * 1024
MIN_PDF_BYTES = 100 * 1024
MIN_PDF_PAGES = 2


@dataclass(frozen=True)
class BookArtifact:
    source: str
    output: str
    title: str
    language: str


def parse_artifacts(path: Path) -> list[BookArtifact]:
    content = path.read_text(encoding="utf-8")
    records = re.findall(r'^\s*"([^"]+)"\s*$', content, flags=re.MULTILINE)
    artifacts: list[BookArtifact] = []

    for record in records:
        parts = record.split("|")
        if len(parts) != 4:
            raise ValueError(f"Invalid artifact record in {path}: {record}")
        artifacts.append(BookArtifact(*parts))

    if not artifacts:
        raise ValueError(f"No artifact records found in {path}")

    return artifacts


def check_file(path: Path, min_bytes: int) -> list[str]:
    errors: list[str] = []

    if not path.exists():
        return [f"{path}: file does not exist"]

    if not path.is_file():
        return [f"{path}: path is not a file"]

    size = path.stat().st_size
    if size < min_bytes:
        errors.append(f"{path}: file is too small ({size} bytes)")

    return errors


def get_opf_path(epub: zipfile.ZipFile) -> str | None:
    try:
        container = epub.read("META-INF/container.xml")
    except KeyError:
        return None

    root = ElementTree.fromstring(container)
    rootfile = root.find(".//{*}rootfile")
    if rootfile is None:
        return None

    return rootfile.attrib.get("full-path")


def text_for_first(root: ElementTree.Element, tag: str) -> str:
    value = root.find(f".//{{*}}{tag}")
    return "" if value is None or value.text is None else value.text.strip()


def validate_epub(path: Path, expected: BookArtifact) -> list[str]:
    errors = check_file(path, MIN_EPUB_BYTES)
    if errors:
        return errors

    try:
        with zipfile.ZipFile(path) as epub:
            corrupt_entry = epub.testzip()
            if corrupt_entry is not None:
                errors.append(f"{path}: corrupted ZIP entry {corrupt_entry}")

            names = set(epub.namelist())
            for required in ("mimetype", "META-INF/container.xml"):
                if required not in names:
                    errors.append(f"{path}: missing {required}")

            opf_path = get_opf_path(epub)
            if not opf_path:
                errors.append(f"{path}: missing OPF package path")
                return errors

            if opf_path not in names:
                errors.append(f"{path}: OPF package file not found at {opf_path}")
                return errors

            opf_root = ElementTree.fromstring(epub.read(opf_path))
            title = text_for_first(opf_root, "title")
            language = text_for_first(opf_root, "language")
            manifest_items = opf_root.findall(".//{*}manifest/{*}item")
            spine_items = opf_root.findall(".//{*}spine/{*}itemref")

            if not title:
                errors.append(f"{path}: missing EPUB title metadata")
            if expected.title and title != expected.title:
                errors.append(
                    f"{path}: title metadata is {title!r}, expected {expected.title!r}"
                )
            if not language:
                errors.append(f"{path}: missing EPUB language metadata")
            if expected.language and language != expected.language:
                errors.append(
                    f"{path}: language metadata is {language!r}, expected {expected.language!r}"
                )
            if not manifest_items:
                errors.append(f"{path}: EPUB manifest has no items")
            if not spine_items:
                errors.append(f"{path}: EPUB spine has no reading-order items")
    except zipfile.BadZipFile as exc:
        errors.append(f"{path}: invalid ZIP/EPUB file ({exc})")
    except ElementTree.ParseError as exc:
        errors.append(f"{path}: invalid EPUB XML ({exc})")

    return errors


def pdf_page_count(data: bytes) -> int:
    return len(re.findall(rb"/Type\s*/Page\b", data))


def validate_pdf(path: Path) -> list[str]:
    errors = check_file(path, MIN_PDF_BYTES)
    if errors:
        return errors

    data = path.read_bytes()

    if not data.startswith(b"%PDF-"):
        errors.append(f"{path}: missing PDF header")
    if b"%%EOF" not in data[-2048:]:
        errors.append(f"{path}: missing PDF EOF marker")
    if b"startxref" not in data[-4096:]:
        errors.append(f"{path}: missing PDF startxref marker")

    pages = pdf_page_count(data)
    if pages < MIN_PDF_PAGES:
        errors.append(f"{path}: expected at least {MIN_PDF_PAGES} pages, found {pages}")

    if b"/Title" not in data and b"<dc:title" not in data:
        errors.append(f"{path}: missing PDF title metadata")

    return errors


def run_epubcheck(path: Path) -> list[str]:
    if not shutil_which("epubcheck"):
        return ["epubcheck is not installed"]

    result = subprocess.run(
        ["epubcheck", str(path)],
        check=False,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    if result.returncode != 0:
        return [f"{path}: epubcheck failed\n{result.stdout.strip()}"]
    return []


def shutil_which(command: str) -> str | None:
    from shutil import which

    return which(command)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--downloads-dir",
        default="downloads",
        type=Path,
        help="Directory containing generated EPUB and PDF files.",
    )
    parser.add_argument(
        "--artifacts-file",
        default=Path("tools/book-artifacts.sh"),
        type=Path,
        help="Shared artifact definition file.",
    )
    parser.add_argument(
        "--skip-epubcheck",
        action="store_true",
        help="Skip epubcheck and run only structural EPUB/PDF checks.",
    )
    args = parser.parse_args()

    artifacts = parse_artifacts(args.artifacts_file)
    all_errors: list[str] = []

    print("Verifying book artifacts ...", flush=True)

    for artifact in artifacts:
        epub_path = args.downloads_dir / f"{artifact.output}.epub"
        pdf_path = args.downloads_dir / f"{artifact.output}.pdf"

        print(f"Checking {artifact.output}.epub", flush=True)
        if not args.skip_epubcheck:
            all_errors.extend(run_epubcheck(epub_path))
        all_errors.extend(validate_epub(epub_path, artifact))

        print(f"Checking {artifact.output}.pdf", flush=True)
        all_errors.extend(validate_pdf(pdf_path))

    if all_errors:
        print("\nBook artifact verification failed:", file=sys.stderr)
        for error in all_errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print("Book artifact verification passed.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
