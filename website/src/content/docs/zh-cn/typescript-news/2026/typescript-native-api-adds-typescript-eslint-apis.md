---
title: TypeScript 原生 API 新增 typescript-eslint 所需的 API
description: TypeScript 原生 API 新增 typescript-eslint 所需的检查器和类型 API，减少工具集成中的兼容性缺口。
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**发布日期：** 2026 年 9 月 14 日

TypeScript 原生 API 现在公开了 `typescript-eslint` 所需的更多检查器和类型 API，从而减少依赖 TypeScript 编程 API 的工具之间的兼容性缺口。

## 变化内容

此次变更新增了 `getAwaitedType`、`getContextualTypeForArgumentAtIndex`、`getIndexInfoOfType`、`getIndexTypeOfType`、`getTypeOfPropertyOfType` 和 `getExportSymbolOfSymbol` 等 API。接口和类类型还新增 `getThisType()`，并导出 `IndexKind` 以支持索引类型查询。

同步和异步原生 API 均已更新。

## 为什么重要

TypeScript 的这个拉取请求专门用于补充 `typescript-eslint` 指出的缺失 API，使集成工具能够获得更多此前依赖既有 TypeScript API 的检查器和类型信息。

## 来源

阅读官方 TypeScript 拉取请求：[Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264)。
