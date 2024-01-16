---
title: 分配条件类型
sidebar:
  order: 40
  label: 40. 分配条件类型
---


分布式条件类型是一种功能，通过单独对联合的每个成员应用转换，允许类型分布在类型的联合上。当使用映射类型或高阶类型时，这尤其有用。

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

