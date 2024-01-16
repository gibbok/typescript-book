---
title: Func 返回值的类型
sidebar:
  order: 35
  label: 35. Func 返回值的类型
---


Func Return 中的类型是指根据函数的实现自动推断函数的返回类型的能力。这允许 TypeScript 无需显式类型注释即可确定函数返回值的类型。

```typescript
const add = (x: number, y: number) => x + y; // TypeScript 可以推断函数的返回类型是数字
```

