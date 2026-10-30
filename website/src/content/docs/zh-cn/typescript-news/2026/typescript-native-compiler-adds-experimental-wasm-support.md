---
title: "TypeScript 原生编译器新增实验性 WebAssembly 支持"
description: "TypeScript 合并了一项实验性 WASI WebAssembly 支持，可用于命令行、语言服务器和浏览器中的 JavaScript API。"
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**发布日期:** 2026-10-29

微软于 2026 年 10 月 29 日合并了原生 TypeScript 编译器的实验性 `wasip1/wasm` 支持。该变更允许编译器在 WASI 宿主中运行，并提供可在浏览器中使用的 JavaScript API 传输方式。

## 变更内容

* 同一个 `tsc.wasm` 既可作为 WASI 命令运行 CLI 或语言服务器，也可作为 reactor 处理同步和异步 JavaScript API 调用。
* 新的产物包 `@typescript/typescript-wasip1-wasm` 包含 WebAssembly 编译器和库文件。`typescript/wasm` 宿主提供 `instantiateWasm` 和 `instantiateWasmSync`；两个包必须使用完全相同的版本。
* VS Code for Web 扩展新增通过 `tsc.wasm --lsp` 运行的入口。该变更还包含 Node.js API 测试和 Chromium 浏览器冒烟测试。

## 可用性

这是已合并的实验性变更，并非稳定版 WebAssembly 发布公告。二进制文件、包结构和 `typescript/wasm` 宿主可能随时更改。

## 来源

[阅读已合并的 TypeScript 拉取请求](https://github.com/microsoft/TypeScript/pull/64174).
