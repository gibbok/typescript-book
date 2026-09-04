---
title: TypeScript 7 native API adds AST child and token getters
description: The native TypeScript API adds Node child and token traversal methods, closing a gap with the JavaScript API for syntax-tree tooling.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Published:** September 3, 2026

The native TypeScript API now exposes five `Node` helpers for traversing child nodes and tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, and `getLastToken()`.

## What changed

PR #63893 adds the remaining child and token getters that already exist on the JavaScript-based TypeScript API. The change completes the child/token part of the native `Node` API after position and text getters had already been added.

## Why it matters

These methods are useful to API consumers that walk the syntax tree, including tools that need to inspect tokens as well as child nodes. The native API can now use the same `Node` traversal helpers for these cases.

## Source

Read [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) and the [tracking issue](https://github.com/microsoft/TypeScript/issues/63892).
