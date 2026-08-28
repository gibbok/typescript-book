---
title: TypeScript 7.0 发布候选版已公布
description: TypeScript 7.0 发布候选版预览了原生编译器、并行构建、兼容性变化和扩展的编辑器支持。
lastUpdated: 2026-06-18
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**发布日期：** 2026 年 6 月 18 日

Microsoft 发布了 TypeScript 7.0 发布候选版，这是 TypeScript 7 稳定版发布前的最终预览版。

## 主要变化

此发布候选版将 TypeScript 迁移到新的 Go 编译器和语言服务。其类型检查逻辑从 TypeScript 6 移植而来，以保留现有语义，同时通过原生代码和共享内存并行处理提高性能。

TypeScript 7 新增了并行类型检查和项目引用构建。`--checkers` 选项控制类型检查工作线程的数量，`--builders` 控制项目引用构建器的数量。

公告发布时，可以从 npm 安装该发布候选版：

```shell
npm install --save-dev typescript@rc
```

## 兼容性

此发布候选版未包含稳定的程序化 API。TypeScript 团队提供了 `@typescript/typescript6` 兼容包，使需要 TypeScript 6 API 的工具可以与新编译器同时运行。

此发布候选版还采用了 TypeScript 6 的默认设置，并将 TypeScript 6 中已弃用的选项视为错误。团队应先迁移到 TypeScript 6，再评估 TypeScript 7。

## 来源

阅读官方公告：[Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)。
