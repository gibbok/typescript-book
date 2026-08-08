# TypeScript 7 新增工作区符号搜索范围


**发布日期：** 2026 年 8 月 7 日

Microsoft 为 TypeScript 的原生语言服务合并了工作区符号搜索范围功能。

## 变更内容

新的 `workspaceSymbols.scope` 首选项有两个值。`allOpenProjects` 是默认值，会在所有已打开的项目中搜索符号。`currentProject` 会将搜索限制在包含所提供文档的项目中。

原生 VS Code 扩展现在会将受支持的 TypeScript 或 JavaScript 文档添加到 `workspace/symbol` 请求中。它会优先使用活动文档；否则会使用另一个已打开的受支持文档。仅当 `workspaceSymbols.scope` 为 `currentProject` 时，语言服务才会使用该文档；否则会保留跨所有已打开项目的搜索。

## 意义

在包含多个项目且这些项目具有同名或相似名称符号的工作区中，`currentProject` 可以将结果限制在相关项目中。默认值会保留现有行为，因此此项变更为可选项。

## 可用性

此变更在 TypeScript 7.0 发布后合并到 TypeScript 原生代码库中。原始来源未指出包含该功能的稳定 npm 版本，因此在依赖该设置之前，请查看已安装版本的发行说明。
