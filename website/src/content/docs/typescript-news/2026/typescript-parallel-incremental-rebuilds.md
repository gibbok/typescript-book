---
title: "TypeScript speeds up incremental rebuilds with parallel signature checks"
description: "TypeScript now checks dependent-file signatures in parallel during incremental rebuilds, improving performance after edits to widely imported files."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

A merged compiler change parallelizes signature checks for files affected by edits to widely imported modules. Previously, this phase processed dependent files sequentially.

## What changed

In the contributor's benchmark, a rebuild after a comment-only edit fell from **3.4 seconds to 1.5 seconds** on a 32-core Linux machine. In an n8n package, a comparable rebuild fell from **5.4 seconds to 4.5 seconds**. These are workload-specific results, not general speedup guarantees.

## Performance and limits

The work is bounded by `GOMAXPROCS`; gains depend on available checkers and the dependency graph. The change does not help `isolatedModules` builds, which do not traverse referencing files.

## Source

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
