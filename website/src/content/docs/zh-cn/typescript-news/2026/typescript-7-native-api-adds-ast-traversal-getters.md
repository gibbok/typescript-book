---
title: TypeScript 7 原生 API 新增 AST 子节点和 token 获取方法
description: TypeScript 原生 API 为 Node 新增子节点和 token 遍历方法，缩小与 JavaScript API 在语法树工具方面的差距。
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**发布日期：** 2026 年 9 月 3 日

TypeScript 原生 API 现在为 `Node` 提供五个用于遍历子节点和 token 的辅助方法：`getChildren()`、`getChildCount()`、`getChildAt()`、`getFirstToken()` 和 `getLastToken()`。

## 主要变化

PR #63893 新增了 JavaScript 版 TypeScript API 中已经存在的其余子节点和 token 获取方法。在位置和文本获取方法已经加入之后，这次改动补齐了原生 `Node` API 的子节点和 token 相关能力。

## 为什么重要

这些方法适用于遍历语法树的 API 使用者，包括需要同时检查 token 和子节点的工具。原生 API 现在也能在这些场景中使用相同的 `Node` 遍历辅助方法。

## 来源

请参阅 [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) 和[跟踪 issue](https://github.com/microsoft/TypeScript/issues/63892)。
