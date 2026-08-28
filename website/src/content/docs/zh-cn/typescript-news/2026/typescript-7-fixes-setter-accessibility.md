---
title: TypeScript 7 修复联合类型和交叉类型中的 setter 可访问性
description: 原生类型检查器现在会在联合类型和交叉类型属性上分别处理 setter 与 getter 的可访问性。
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**发布日期：** 2026 年 8 月 24 日

Microsoft 合并了一项原生 TypeScript 类型检查器修复，使由联合类型和交叉类型合成的属性能够分别保留读取和写入的可访问性。

## 主要变化

此前，这类合成属性可能忽略 setter 的可访问性，因为检查实际上使用的是 getter 的可访问性。因此，公共 getter 与受保护 setter 的组合可能会错误地允许通过联合类型或交叉类型写入。

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

类型检查器现在会单独记录写入可访问性。读取 `foo` 仍然有效，而赋值会正确报告可访问性错误。

## 为什么重要

类可以有意公开读取操作，同时限制写入操作。此修复确保 TypeScript 将对象类型组合为联合类型或交叉类型时仍保留这一边界，而不会意外扩大写入权限。

## 可用性

该更改在 TypeScript 7.0 之后合并到原生 TypeScript 代码库。来源未指定包含此更改的稳定 npm 版本，因此在依赖此行为前应检查所安装版本的发行说明。

## 来源

阅读已合并的 TypeScript 拉取请求：[Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932)。
