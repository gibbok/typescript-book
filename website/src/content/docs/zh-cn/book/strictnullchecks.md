---
title: 严格空检查
sidebar:
  order: 18
  label: 18. 严格空检查
---


`strictNullChecks` 是一个 TypeScript 编译器选项，强制执行严格的 null 检查。启用此选项后，只有在变量和参数已使用联合类型 `null` | `undefined` 显式声明为该类型时，才可以对其进行赋值`null` 或者 `undefined`。如果变量或参数未显式声明为可为空，TypeScript 将生成错误以防止潜在的运行时错误。

