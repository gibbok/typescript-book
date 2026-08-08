---
title: TypeScript 7 improves Go to Implementation memory use
description: A native language service fix prevents quadratic memory growth when finding implementations in large, deeply typed projects.
lastUpdated: 2026-07-30
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Published:** July 30, 2026

Microsoft merged a memory-scaling fix for Go to Implementation in TypeScript's native language service.

## What changed

The language service uses a breadth-first worklist to find implementations. For an interface member with many implementations, repeated program-wide searches could return the same references again. Retained references, queued work, and result groups could therefore grow quadratically and exhaust memory in large, deeply typed projects.

The fix deduplicates reference nodes before adding them to the work queue and avoids retaining duplicate symbol definitions. A regression test checks that doubling the number of implementations produces approximately linear growth instead of quadratic growth.

## Why it matters

Go to Implementation can now process this pattern without retaining the same internal references repeatedly. The final editor response was already deduplicated, so the change targets the hidden memory and work required to produce that response.

## Availability

The change was merged into the TypeScript native codebase after the TypeScript 7.0 release. The source does not identify a stable npm version containing the fix, so users should check the release notes for their installed version before relying on it.

## Source

Read the official change: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
