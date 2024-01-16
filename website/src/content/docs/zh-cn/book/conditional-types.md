---
title: 条件类型
sidebar:
  order: 39
  label: 39. 条件类型
---


条件类型是一种创建依赖于条件的类型的方法，其中要创建的类型是根据条件的结果确定的。它们是使用 `extends` 关键字和三元运算符来定义的，以便有条件地在两种类型之间进行选择。

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // true 类型
type IsMyNumberAnArray = IsArray<typeof myNumber>; // false 类型
```

