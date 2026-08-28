# Tools for Working with Markdown Books

If you're working with Markdown books, here are some essential tools and commands to help you streamline your workflow.

## Installation

The Docker workflow provides all dependencies required to format, check, generate,
and verify the books. With Docker running, use these commands from `tools`:

```shell
make docker-books
make docker-verify-books
```

The repository is mounted into the container, so generated EPUB and PDF files are
written directly to the local `downloads` folder. The Docker image is built on the
first command and reused on subsequent commands. Its Node.js dependencies stay
inside the container. It includes EPUBCheck 5.3.0 and invokes it through a Java
wrapper, so EPUB validation works when invoked by Python without leaving cache files
in the checkout. Before building, Docker downloads and verifies the pinned Noto bundle
in `tools/.noto-fonts`, then copies that bundle into the image. This makes PDF font
selection independent of macOS system fonts and Debian's changing font packages. To run
the Markdown checks or regenerate the website book pages in the container, use:

```shell
make docker-check
make docker-website
```

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

### Pinned PDF fonts

PDF generation uses the static Noto releases recorded in
`tools/noto-fonts.lock`: Noto Serif and Sans 2.015, Noto Sans Mono 2.014,
Noto Serif CJK 2.003, and Noto Sans CJK 2.004. The lock file records the official
release URLs, archive SHA-256 checksums, and each extracted font file.

Install the verified bundle for local Calibre builds:

```shell
./install-noto-fonts.sh
```

The command downloads only into ignored `tools/.noto-fonts`, verifies every archive,
checks the registered family names when Fontconfig is available, and installs the
selected files in your user font directory. Use `./install-noto-fonts.sh --prepare` to
prepare only the Docker bundle, or `./install-noto-fonts.sh --verify` to check an
existing bundle. Docker commands run `--prepare` automatically.

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
* `make docker-verify-books`: Verify local book artifacts in the Docker container.

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

To regenerate every artifact with the pinned container toolchain and compare page
counts with the published GitHub baseline, run:

```shell
make docker-books
make docker-verify-books
```

The comparison resolves `main` once to a commit SHA before downloading the eight
published PDFs. Its page-count differences are a report, not a compatibility failure.
After checking representative English, Chinese, and Japanese pages for readable text,
code, and missing-glyph boxes, commit the updated artifacts.

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
