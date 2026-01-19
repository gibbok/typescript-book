#!/bin/bash

# This script creates eBooks from the TypeScript Book.

DIR_DOWNLOADS="downloads"

INPUT_EN="README"
INPUT_CN="README-zh_CN"
INPUT_IT="README-it_IT"
INPUT_PT="README-pt_BR"

OUTPUT_EN="typescript-book"
OUTPUT_CN="typescript-book-zh_CN"
OUTPUT_IT="typescript-book-it_IT"
OUTPUT_PT="typescript-book-pt_BR"

AUTHOR="Simone Poggiali"
TITLE_EN="The Concise TypeScript Book"
TITLE_CN="# 简洁的TypeScript之书"
TITLE_IT="The Concise TypeScript Book"
TITLE_PT="The Concise TypeScript Book"

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
pandoc -o $DIR_DOWNLOADS/$OUTPUT_EN.epub --metadata title="$TITLE_EN" --metadata author="$AUTHOR" -s $INPUT_EN.md
pandoc -o $DIR_DOWNLOADS/$OUTPUT_CN.epub --metadata title="$TITLE_CN" --metadata author="$AUTHOR" -s $INPUT_CN.md
pandoc -o $DIR_DOWNLOADS/$OUTPUT_IT.epub --metadata title="$TITLE_IT" --metadata author="$AUTHOR" -s $INPUT_IT.md
pandoc -o $DIR_DOWNLOADS/$OUTPUT_PT.epub --metadata title="$TITLE_PT" --metadata author="$AUTHOR" -s $INPUT_PT.md

# Validate eBooks
epubcheck $DIR_DOWNLOADS/$OUTPUT_CN.epub
epubcheck $DIR_DOWNLOADS/$OUTPUT_CN.epub
epubcheck $DIR_DOWNLOADS/$OUTPUT_IT.epub
epubcheck $DIR_DOWNLOADS/$OUTPUT_PT.epub

# Generate PDFs
ebook-convert $DIR_DOWNLOADS/$OUTPUT_EN.epub $DIR_DOWNLOADS/$OUTPUT_EN.pdf --pdf-page-numbers
ebook-convert $DIR_DOWNLOADS/$OUTPUT_CN.epub $DIR_DOWNLOADS/$OUTPUT_CN.pdf --pdf-page-numbers
ebook-convert $DIR_DOWNLOADS/$OUTPUT_IT.epub $DIR_DOWNLOADS/$OUTPUT_IT.pdf --pdf-page-numbers
ebook-convert $DIR_DOWNLOADS/$OUTPUT_PT.epub $DIR_DOWNLOADS/$OUTPUT_PT.pdf --pdf-page-numbers

echo "Books were created. Please commit!"