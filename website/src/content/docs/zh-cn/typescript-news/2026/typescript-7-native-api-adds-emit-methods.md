---
title: TypeScript 7 原生 API 新增 emit 方法
description: TypeScript 原生 API 新增面向整个程序和选定 JavaScript 或声明输出的文件系统与内存 emit 方法。
lastUpdated: 2026-07-24
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**发布日期：** 2026 年 7 月 24 日

TypeScript 原生代码库新增了程序化 emit API，供需要生成 JavaScript 或声明输出的工具使用。

## 主要变化

合并后的 API 提供四种 emit 方式，它们在输出位置和文件选择方式上有所不同。

* `program.emit(emitOnly?: EmitOnly)` 将整个程序输出到文件系统，包括已配置的虚拟文件系统，并遵循 `noEmit` 和 `noEmitOnError` 等阻止 emit 的选项。
* `program.emitToString(emitOnly?: EmitOnly)` 将整个程序输出为内存中的字符串结果，并同样遵循阻止 emit 的选项。
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` 为选定文件返回内存中的 JavaScript 输出，并绕过阻止 emit 的选项。
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` 为选定文件提供对应的声明输出。

这让 API 使用者可以分别选择常规的整个程序 emit 或有针对性的内存输出。

## 可用性

该变更于 2026 年 7 月 24 日合并到 TypeScript 原生代码库。来源没有说明哪些稳定 npm 版本包含这些 API，因此工具应确认所用 TypeScript 版本是否支持它们。

## 来源

阅读官方拉取请求：[API emit](https://github.com/microsoft/typescript-go/pull/4699)。
