---
title: 映射类型修饰符
sidebar:
  order: 38
  label: 38. 映射类型修饰符
---


TypeScript 中的映射类型修饰符支持对现有类型中的属性进行转换：

* `readonly` 或 `+readonly`：这会将映射类型中的属性呈现为只读。
* `-readonly`：这允许映射类型中的属性是可变的。
* `?`：这将映射类型中的属性指定为可选。

例子：

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // 所有属性标记为只读

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // 所有标记为可变的属性

type MyPartial<T> = { [P in keyof T]?: T[P] }; // 所有标记为可选的属性
````

