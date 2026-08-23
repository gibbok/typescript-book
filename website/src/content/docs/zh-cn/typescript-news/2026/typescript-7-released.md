---
title: TypeScript 7.0 现已发布
description: TypeScript 7.0 引入基于 Go 的原生编译器和语言服务，大幅提升构建和编辑器的性能。
lastUpdated: 2026-07-08
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**发布日期：** 2026 年 7 月 8 日

Microsoft 已发布 TypeScript 7.0，这是首个基于该项目全新原生 Go 代码库构建的稳定版本。

## 主要变化

TypeScript 7 使用原生代码、共享内存多线程和其他优化。根据 TypeScript 团队公布的基准测试，完整构建速度比 TypeScript 6 快 7.7 至 11.9 倍。

此版本还将语言服务迁移到语言服务器协议（Language Server Protocol）。受支持的编辑器可以使用相同的原生基础，更快地加载项目、提供诊断和代码补全，以及执行导航操作。

从 npm 安装稳定版本：

```shell
npm install --save-dev typescript
```

## 兼容性

TypeScript 7.0 尚未提供稳定的程序化 API。嵌入 TypeScript 的工具，包括当前的 Astro、Vue、MDX、Svelte 和部分 Angular 工作流，在新 API 可用之前可能仍需使用 TypeScript 6。

TypeScript 团队预计将在 TypeScript 7.1 中引入新 API。项目升级前应检查其框架和工具的支持情况。

## 来源

阅读官方公告：[Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)。
