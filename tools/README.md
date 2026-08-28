# Tools for Working with Markdown Books

If you're working with Markdown books, here are some essential tools and commands to help you streamline your workflow.

## Installation

The Docker workflow provides all dependencies required to generate and verify the
books. With Docker running, use this command from `tools`:

```shell
make docker-books
```

The repository is mounted into the container, so generated EPUB and PDF files are
written directly to the local `downloads` folder. The Docker image is built on the
first command and reused on subsequent commands. Its Node.js dependencies stay
inside the container. It includes EPUBCheck 5.3.0 and invokes it through a Java
wrapper, so EPUB validation works when invoked by Python without leaving cache files
in the checkout. The Noto fonts required for PDF generation are stored in
`tools/fonts` and copied into the image during the build.

### Local installation

To run the tools without Docker, ensure Node.js is installed. Then set up the
required dependencies with the following commands:

In folder `tools` and `website`:

```shell
nvm use
npm install
```

```shell
brew install pandoc
brew install epubcheck
brew install poppler
brew install --cask calibre
```

## Commands

Use `make` to run the main commands:

* `make format`: Format Markdown files for books.
* `make check`: Run several checks to ensure the Markdown files are valid.
* `make website`: Create different Markdown pages for the website.
* `make website-preview`: Build and preview website locally.
* `make website-e2e`: Build the production website and run its core Playwright end-to-end tests.
* `make website-deploy`: Build and deploy website to GitHub Pages.
* `make books`: Create EPUB and PDF books.
* `make verify-books`: Verify the generated EPUB and PDF files.
* `make docker-books`: Build the Docker image and create EPUB and PDF books in the local `downloads` folder.

### Website End-to-End Tests

The Playwright suite covers only the website's main reader journeys: loading readable
book content, using the right-side page navigation, and finding content with search.

Install the browser once from the `website` folder:

```shell
npx playwright install chromium
```

Then run the production build and tests from the `tools` folder:

```shell
make website-e2e
```

Playwright saves an HTML report, screenshots, and videos for each run. In pull
requests, CI uploads this evidence, links it from a single updated PR comment, and
deletes the uploaded artifacts after the PR is merged.

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

### EPUB and PDF Generation

To generate EPUB and PDF files from your Markdown books, navigate to the `tools` folder and run the following command:

```shell
make books
```

The verification step uses `pdfinfo` for page totals and `pdffonts` to require the
appropriate embedded Noto families for every locale. It rejects legacy Georgia,
Verdana, Menlo, Apple, Times New Roman, and STSongti embeddings.

To regenerate every artifact with the container toolchain, run:

```shell
make docker-books
```

### Tagging

Use this tag format for TypeScript 7 book releases:

```shell
git switch main
git pull origin main
git tag -a typescript-7-book-v1 -m "TypeScript 7 book, revision 1"
git push origin typescript-7-book-v1
```

These tools will assist you in efficiently working with Markdown books and ensure a smooth and organized process. Happy writing!

## Debug EPUB Issues

To debug the EPUB files you create, follow these steps:

First, download and install Sigil. You can use the following command to install Sigil:

```shell
brew install --cask sigil
```

Next, run an EPUB check to validate your EPUB file. For example:

```shell
epubcheck ../downloads/typescript-book.epub
```

Finally, open the EPUB file using Sigil for detailed inspection.

## How to Contribute to This E-Book

To contribute to this e-book, follow these steps:

* Update the main Markdown file with your changes.
* Run `make check` to ensure the linter and other checks pass.
* Preview the website locally with `make website-preview` to make sure it works as expected.
* Generate the e-books by running `make books`.
* Submit your PR and share your awesome contributions!
