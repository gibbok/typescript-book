---
title: TypeScript native API adds APIs needed by typescript-eslint
description: The native TypeScript API adds checker and type APIs needed by typescript-eslint, reducing compatibility gaps for tooling.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Published:** September 14, 2026

The native TypeScript API now exposes additional checker and type APIs needed by `typescript-eslint`, reducing compatibility gaps for tools that depend on TypeScript's programmatic API.

## What changed

The change adds APIs including `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType`, and `getExportSymbolOfSymbol`. Interface and class types also gain `getThisType()`, and `IndexKind` is exported for index-type queries.

Both the synchronous and asynchronous native API surfaces were updated.

## Why it matters

The TypeScript pull request was created specifically to add APIs identified as missing by `typescript-eslint`. This gives integrations more of the checker and type information they previously expected from the established TypeScript API.

## Source

Read the official TypeScript pull request: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
