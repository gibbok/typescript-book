---
title: TypeScript News
description: Concise summaries of the latest official TypeScript releases, announcements, and changes for TypeScript developers.
sidebar:
    hidden: true
---

Follow important TypeScript releases and project updates through concise summaries based on official TypeScript sources.

## Latest news

### [TypeScript 7 fixes setter accessibility in unions and intersections](./2026/typescript-7-fixes-setter-accessibility/)

**Published:** August 24, 2026

The native checker now respects setter accessibility separately from getter accessibility on union and intersection properties.

### [TypeScript 7 adds a workspace-symbol search scope](./2026/typescript-7-workspace-symbol-search-scope/)

**Published:** August 7, 2026

The native language service adds a setting that can limit workspace-symbol searches to the current project instead of every open project.

### [TypeScript 7 improves Go to Implementation memory use](./2026/typescript-7-go-to-implementation-memory-fix/)

**Published:** July 30, 2026

The native language service now avoids quadratic memory growth when finding many implementations in large, deeply typed projects.

### [TypeScript 7 refreshes config diagnostics after file changes](./2026/typescript-7-refreshes-config-diagnostics/)

**Published:** July 30, 2026

The native language service now republishes `tsconfig.json` and `jsconfig.json` errors after watched config files change.

### [TypeScript 7 native tooling is consolidating](./2026/typescript-7-native-tooling-consolidates/)

**Published:** July 27, 2026

Maintainers clarified that the `tsgo` name is going away, the native codebase will return to the main TypeScript repository, and the native VS Code extension will be bundled.

### [TypeScript 7 native API adds emit methods](./2026/typescript-7-native-api-adds-emit-methods/)

**Published:** July 24, 2026

The native TypeScript API adds filesystem and in-memory emit methods for whole programs and selected JavaScript or declaration outputs.

### [TypeScript 7.0 is now available](./2026/typescript-7-released/)

**Published:** July 8, 2026

TypeScript 7 introduces the new Go-based compiler and language service, with substantially faster builds and editor operations.

### [TypeScript 7.0 release candidate announced](./2026/typescript-7-release-candidate/)

**Published:** June 18, 2026

The TypeScript team released the final preview of TypeScript 7, including parallel type checking, project builds, and expanded editor support.
