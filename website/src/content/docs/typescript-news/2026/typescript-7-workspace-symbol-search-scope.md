---
title: TypeScript 7 adds a workspace-symbol search scope
description: The native language service adds a setting that can limit workspace-symbol searches to the current project.
lastUpdated: 2026-08-07
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Published:** August 7, 2026

Microsoft merged a workspace-symbol search scope for TypeScript's native language service.

## What changed

The new `workspaceSymbols.scope` preference has two values. `allOpenProjects` is the default and searches symbols across every open project. `currentProject` limits the search to projects that contain the supplied document.

The native VS Code extension now adds a supported TypeScript or JavaScript document to `workspace/symbol` requests. It prioritizes the active document and otherwise uses an open supported document. The language service uses that document only when `workspaceSymbols.scope` is `currentProject`; otherwise it keeps the all-open-project search.

## Why it matters

In a workspace that contains multiple projects with similarly named symbols, `currentProject` can restrict the result set to the relevant project. The default preserves the existing behavior, so the change is opt-in.

## Availability

The change was merged into the TypeScript native codebase after TypeScript 7.0. The source does not identify a stable npm version that includes it, so check the release notes for the installed version before relying on the setting.
