---
title: infer 条件类型中的类型推断
sidebar:
  order: 41
  label: 41. infer 条件类型中的类型推断
---


`infer` 关键字在条件类型中使用，用于从依赖于泛型参数的类型中推断（提取）泛型参数的类型。这允许您编写更灵活且可重用的类型定义。

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

