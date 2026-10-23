---
title: "TypeScript 7.1 Beta 引入模块化 API 和 ES2026 支持"
description: "TypeScript 7.1 Beta 增加模块化原生 API、ES2026 支持、源阶段导入、内容映射器和性能优化。"
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**发布日期:** 2026 年 10 月 20 日

微软发布了 TypeScript 7.1 Beta，带来新的原生编译器 API 和 JavaScript 语言支持。可使用以下命令试用预览版：

```shell
npm install -D typescript@beta
```

## 主要变化

* 现在正式支持 `--target es2026` 和 `--lib es2026` 选项，并更新了标准库声明。
* 新的 API 入口包括 `typescript/sync`、`typescript/async`、`typescript/fs` 和 `typescript/ast`。`API` 和 `Program` 对象必须释放，例如使用 `using`。
* 源阶段导入（`import source` 和 `import.source()`）可获取模块源对象，包括 WebAssembly 场景，但需要适当的 `--module` 和 `esnext` 设置。
* 内容映射器可让 TypeScript 处理 `.vue` 和 `.svelte` 等文件中的嵌入代码。通过命令行执行时需要 `--runExternalCode`。
* 微软公布的基准测试显示，相比 TypeScript 7.0，构建更快且内存占用更低。

## 可用性

这是测试版，而非稳定版。升级前请确认框架和工具链的兼容性。环境模块声明中的导入属性支持已在另一篇新闻中介绍。

## 来源

阅读官方公告： [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
