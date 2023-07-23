#!/bin/bash
echo "Making ebooks ..."
sudo apt-get install pandoc
pandoc -o downloads/typescript-book.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README.md
echo "ALL DONE ..."
echo "ALL DONE ..."