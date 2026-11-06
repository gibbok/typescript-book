---
title: "TypeScript 通过并行检查加速增量构建"
description: "TypeScript 现在会在增量构建时并行检查依赖文件的签名。"
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

已合并的编译器改动使广泛导入的模块发生变化时，受影响文件的签名检查能够并行执行。此前这一阶段按顺序执行。

## 变更内容

在作者的基准测试中，32 核 Linux 系统上仅修改注释后的重建时间从 **3.4 秒降至 1.5 秒**。在一个 n8n 软件包中，类似场景从 **5.4 秒降至 4.5 秒**。这些结果仅适用于相应测试负载。

## 性能与限制

并发工作量受 `GOMAXPROCS` 限制；收益取决于可用检查器和依赖关系。`isolatedModules` 不会遍历引用文件，因此无法从中受益。

## 来源

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
