#!/bin/bash
echo "Making ebooks ..."
DIR_DOWNLOADS=downloads

cd ../

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

# Generate eBooks
pandoc -o $DIR_DOWNLOADS/typescript-book.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README.md
pandoc -o $DIR_DOWNLOADS/typescript-book-zh_CN.epub --metadata title="# 简洁的TypeScript之书" --metadata author="Simone Poggiali"  -s README-zh_CN.md

# Validate eBooks
epubcheck $DIR_DOWNLOADS/typescript-book.epub
epubcheck $DIR_DOWNLOADS/typescript-book-zh_CN.epub

echo "Books were created. Please commit!"