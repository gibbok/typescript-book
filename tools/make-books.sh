#!/bin/bash
echo "Making ebooks ..."
DIR_DOWNLOADS=downloads

cd ../
if command -v pandoc &>/dev/null; then
    echo "pandoc is installed"
else
    echo "You need to install pandoc. Please visit: https://pandoc.org/installing.html"
fi

pandoc -o $DIR_DOWNLOADS/typescript-book.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README.md
pandoc -o $DIR_DOWNLOADS/typescript-book-zh_CN.epub --metadata title="# 简洁的TypeScript之书" --metadata author="Simone Poggiali"  -s README-zh_CN.md

echo "Books were created. Please commit!"