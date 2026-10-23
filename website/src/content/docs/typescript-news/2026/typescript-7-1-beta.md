---
title: "TypeScript 7.1 Beta introduces modular APIs and ES2026 support"
description: "TypeScript 7.1 Beta adds modular native APIs, ES2026 support, source imports, content mappers, and performance improvements."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Published:** October 20, 2026

Microsoft released TypeScript 7.1 Beta with new native compiler APIs and JavaScript language support. Try the preview with:

```shell
npm install -D typescript@beta
```

## What changed

* `--target es2026` and `--lib es2026` are now supported as stable options, with updated standard-library declarations.
* New API entry points include `typescript/sync`, `typescript/async`, `typescript/fs`, and `typescript/ast`. `API` and `Program` objects must be disposed, for example with `using`.
* Source-phase imports (`import source` and `import.source()`) support module-source objects, including WebAssembly use cases, with appropriate `--module` and `esnext` settings.
* Content mappers can expose embedded TypeScript in files such as `.vue` and `.svelte`. Command-line execution requires `--runExternalCode`.
* Microsoft reports faster builds and lower memory use than TypeScript 7.0 in its published benchmarks.

## Availability

This is a beta, not a stable release. Check framework and tooling compatibility before upgrading. The import-attribute support in ambient modules was covered in a separate news article.

## Source

Read the official announcement: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
