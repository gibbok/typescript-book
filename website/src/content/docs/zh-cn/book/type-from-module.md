---
title: 模块的类型
sidebar:
  order: 36
  label: 36. 模块的类型
---


模块的类型是指使用模块的导出值自动推断其类型的能力。当模块导出特定类型的值时，TypeScript 可以使用该信息在将该值导入到另一个模块时自动推断该值的类型。

<!-- skip -->
```typescript
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r 是 number 类型
```

