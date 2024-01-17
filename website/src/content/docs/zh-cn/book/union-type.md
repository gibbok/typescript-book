---
title: 联合类型
sidebar:
  order: 31
  label: 31. 联合类型
---


联合类型是一种表示值的类型，该值可以是多种类型之一。联合类型使用 `|` 表示 每种可能类型之间的符号。

```typescript
let x: string | number;
x = 'hello'; // 有效
x = 123; // 有效
```

