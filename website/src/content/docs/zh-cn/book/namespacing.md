---
title: 命名空间
sidebar:
  order: 57
  label: 57. 命名空间
---


在 TypeScript 中，命名空间用于将代码组织到逻辑容器中，防止命名冲突并提供一种将相关代码分组在一起的方法。使用关键字 `export` 允许在"外部"模块中访问名称空间。

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

