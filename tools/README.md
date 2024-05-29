# Tools for Working with Markdown Books

If you're working with Markdown books, here are some essential tools and commands to help you streamline your workflow.

## Installation

Before you begin, ensure you have Node.js installed. To set up the required dependencies, use the following commands:

In folder `tools` and `website`:

```shell
nvm use
npm install
```

## Commands

Use `make` to run the main commands:

* `make format`: Format Markdown files for books.
* `make check`: Run several checks to ensure the Markdown files are valid.
* `make website`: Create different Markdown pages for the website.
* `make website-preview`: Build and preview website locally.
* `make website-deploy`: Build and deploy website to GitHub Pages.
* `make books`: Create .epub books.

### Formatting

Consistent code formatting is crucial. To format all TypeScript snippets, we use Prettier. Execute the following command for formatting:

```shell
npm run format
```

### Compilation

To compile TypeScript snippets within the Markdown files, utilize the following command:

```shell
npm run compile
```

### Linting

To ensure that your Markdown files adhere to proper formatting rules, use the linting command:

```shell
npm run lint:md
```

### Linting and Formatting

For a comprehensive process that includes linting all Markdown files, applying Prettier formatting to all TypeScript snippets, and compiling them using TypeScript, use the following command:

```shell
npm run check
```

The project uses the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)Visual Studio Code extension to automatically update the table of contents.

Use the following command to install it:

```shell
code --install-extension yzhang.markdown-all-in-one
```

### Skipping Compilation

If you have specific snippets in the Markdown files that you don't want to compile, simply add `<!-- skip -->` just before the TypeScript demarcation for those snippets.

### Epub Generation

To generate Epub files from your Markdown books, navigate to the `tools` folder and run the following command:

```shell
make-books.sh
```

After generating the Epub files, thoroughly test them, and once you're satisfied with the results, commit the changes.

These tools will assist you in efficiently working with Markdown books and ensure a smooth and organized process. Happy writing!

## Debug Epub issues

You can download and use the following tools to validate and debug the created EPUB files.

```shell
brew install epubcheck
brew install --cask sigil
```

For instance, run the EPUB check using:

```shell
epubcheck ../downloads/typescript-book.epub
```

## How to Contribute to This E-Book

To contribute to this e-book, follow these steps:

* Update the main Markdown file with your changes.
* Run `make check` to ensure the linter and other checks pass.
* Preview the website locally with `make website-preview` to make sure it works as expected.
* Generate the e-books by running `make books`.
* Submit your PR and share your awesome contributions!
