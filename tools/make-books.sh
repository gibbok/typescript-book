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
    pandoc --data-dir=. --lua-filter=tools/epub-anchor-filter.lua -o "$DIR_DOWNLOADS/$output.epub" --metadata title="$title" --metadata author="$AUTHOR" --metadata lang="$language" -s "$input.md"
done

# Generate PDFs
for artifact in "${BOOK_ARTIFACTS[@]}"; do
    IFS="|" read -r _ output _ _ <<< "$artifact"
    ebook-convert "$DIR_DOWNLOADS/$output.epub" "$DIR_DOWNLOADS/$output.pdf" --pdf-page-numbers
done

python3 tools/verify-books.py

echo "Books were created. Please commit!"
