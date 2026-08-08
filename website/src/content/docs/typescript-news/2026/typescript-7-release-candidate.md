---
title: TypeScript 7.0 release candidate announced
description: The TypeScript 7.0 release candidate previewed the native compiler, parallel builds, compatibility changes, and expanded editor support.
lastUpdated: 2026-06-18
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Published:** June 18, 2026

Microsoft released the TypeScript 7.0 release candidate as the final preview before the stable TypeScript 7 release.

## What changed

The release candidate moved TypeScript to its new Go-based compiler and language service. Its type-checking logic was ported from TypeScript 6 to preserve existing semantics while improving performance through native code and shared-memory parallelism.

TypeScript 7 added parallel type-checking and project-reference builds. The `--checkers` option controls the number of type-checking workers, while `--builders` controls the number of project-reference builders.

At the time of the announcement, the release candidate could be installed from npm:

```shell
npm install --save-dev typescript@rc
```

## Compatibility

The release candidate did not include a stable programmatic API. The TypeScript team provided the `@typescript/typescript6` compatibility package so tools requiring the TypeScript 6 API could run alongside the new compiler.

The release candidate also adopted TypeScript 6 defaults and treated options deprecated in TypeScript 6 as errors. Teams were advised to migrate to TypeScript 6 first before evaluating TypeScript 7.

## Source

Read the official announcement: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
