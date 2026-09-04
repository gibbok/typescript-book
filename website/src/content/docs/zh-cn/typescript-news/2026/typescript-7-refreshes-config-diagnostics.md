---
title: TypeScript 7 在配置文件更改后刷新诊断信息
description: 原生语言服务现在会在受监视的配置文件更改后重新发布 tsconfig.json 和 jsconfig.json 错误。
lastUpdated: 2026-07-30
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**发布日期：** 2026 年 7 月 30 日

Microsoft 在 TypeScript 的原生语言服务中合并了一项修复，可在受监视的 `tsconfig.json` 或 `jsconfig.json` 文件更改后刷新配置文件诊断信息。

## 变更内容

配置文件诊断信息会在语言服务快照更新期间发布。此前，受监视的配置文件发生更改时只会安排诊断刷新，不会安排快照更新。因此，在编辑器发出另一个会更新快照的请求之前，新的配置错误可能一直处于过期状态。

现在，语言服务会检测受监视配置文件的更改，并安排一次经过防抖处理的快照更新。这样，无需依赖编辑器的后续请求即可重新发布推送式诊断信息。

## 意义

当编辑器或外部工具更改受监视的 `tsconfig.json` 或 `jsconfig.json` 文件时，原生语言服务仅根据文件监视器事件就能报告更新后的配置错误。回归测试使用无效的 `target` 值验证了此行为。

## 可用性

此变更在 TypeScript 7.0 发布后合并到 TypeScript 原生代码库中。原始来源未指出包含此修复的稳定 npm 版本，因此在依赖该修复之前，请查看已安装版本的发行说明。

## 来源

阅读官方变更：[Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799)。
