# Tools

These are tools for working with Markdown books.

To install, use `nvm use` and `npm i`.

To format all TypeScript snippets using Prettier, use `npm run format`.

To compile snippets using TypeScript, use `npm run compile`.

To lint the Markdown files, use `lint:md`.

To lint all Markdown files and apply Prettier formatting to all TypeScript snippets and compile them using TypeScript, use `npm run check`.

To mark snippets that you do not want to compile, use `<!-- skip -->` just before the TypeScript demarcation.

Generate epub file for English version:

```shell
pandoc -o downloads/typescript-book.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README.md
```

Generate epub file for Chinese version:

```shell
pandoc -o downloads/typescript-book-zh_CN.epub --metadata title="The Concise TypeScript Book" --metadata author="Simone Poggiali"  -s README-zh_CN.md
```
