---
title: TypeScript 7 refreshes config diagnostics after file changes
description: The native language service now republishes tsconfig.json and jsconfig.json errors after watched config files change.
lastUpdated: 2026-07-30
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Published:** July 30, 2026

Microsoft merged a fix that refreshes configuration-file diagnostics in TypeScript's native language service after a tracked `tsconfig.json` or `jsconfig.json` file changes.

## What changed

Configuration-file diagnostics are published during a language-service snapshot update. Previously, a watched config-file change scheduled a diagnostics refresh but did not schedule a snapshot update. New configuration errors could therefore remain stale until the editor made another request that updated the snapshot.

The language service now detects changes to tracked config files and schedules a debounced snapshot update. This republishes pushed diagnostics without depending on a follow-up request from the editor.

## Why it matters

When an editor or external tool changes a tracked `tsconfig.json` or `jsconfig.json`, the native language service can report the updated configuration errors from the file-watcher event alone. A regression test verifies this behavior with an invalid `target` value.

## Availability

The change was merged into the TypeScript native codebase after the TypeScript 7.0 release. The source does not identify a stable npm version that includes it, so check the release notes for the installed version before relying on the fix.

## Source

Read the official change: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
