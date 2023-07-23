# Tools for Working with Markdown Books

If you're working with Markdown books, here are some essential tools and commands to help you streamline your workflow.

## Installation

Before you begin, ensure you have Node.js installed. To set up the required dependencies, use the following commands:

```shell
nvm use
npm install
```

## Formatting

Consistent code formatting is crucial. To format all TypeScript snippets, we use Prettier. Execute the following command for formatting:

```shell
npm run format
```

## Compilation

To compile TypeScript snippets within the Markdown files, utilize the following command:

```shell
npm run compile
```

## Linting

To ensure that your Markdown files adhere to proper formatting rules, use the linting command:

```shell
npm run lint:md
```

## Linting and Formatting

For a comprehensive process that includes linting all Markdown files, applying Prettier formatting to all TypeScript snippets, and compiling them using TypeScript, use the following command:

```shell
npm run check
```

## Skipping Compilation

If you have specific snippets in the Markdown files that you don't want to compile, simply add `<!-- skip -->` just before the TypeScript demarcation for those snippets.

## Epub Generation

To generate Epub files from your Markdown books, navigate to the `tools`` folder and run the following command:

```shell
make-books.sh
```

After generating the Epub files, thoroughly test them, and once you're satisfied with the results, commit the changes.

These tools will assist you in efficiently working with Markdown books and ensure a smooth and organized process. Happy writing!
