#!/bin/bash
echo "Making ebooks ..."
sudo apt-get install pandoc
mkdir downloadsXXX
pandoc -o downloadsXXX/typescript-book.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README.md
pandoc -o downloadsXXX/typescript-book-zh_CN.epub --metadata title="# 简洁的TypeScript之书" --metadata author="Simone Poggiali"  -s README-zh_CN.md
cd downloadsXXX
git add -A
git commit -m 'automatically added books'
ls