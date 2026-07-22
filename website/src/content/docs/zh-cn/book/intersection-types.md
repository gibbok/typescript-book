---
title: 交集类型
sidebar:
  order: 35
  label: 35. 交集类型
---


交集类型是表示具有两种或多种类型的所有属性的值的类型。交叉类型在每种类型之间使用 & 符号表示。

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // 交集

const j: J = {
    a: 'a',
    b: 'b',
};
```

