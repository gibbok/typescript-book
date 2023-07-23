# Tools

These are tools for working with Markdown books.

To install, use `nvm use` and `npm i`.

To format all TypeScript snippets using Prettier, use `npm run format`.

To compile snippets using TypeScript, use `npm run compile`.

To lint the Markdown files, use `lint:md`.

To lint all Markdown files and apply Prettier formatting to all TypeScript snippets and compile them using TypeScript, use `npm run check`.

To mark snippets that you do not want to compile, use `<!-- skip -->` just before the TypeScript demarcation.

To generate epub files run in `tools` folder `make-books.sh` then test manually and commit.
