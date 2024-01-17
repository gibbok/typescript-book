---
title: 未知类型
sidebar:
  order: 45
  label: 45. 未知类型
---


在 TypeScript 中，未知类型表示未知类型的值。与允许任何类型值的 `any` 类型不同，`unknown` 需要在以特定方式使用它之前进行类型检查或断言，因此在未首先断言或缩小到更具体的类型的情况下，不允许对 `unknown` 进行任何操作 。

`unknown` 类型只能分配给任何类型和未知类型本身，它是any 的类型安全替代方案。

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // 有效
let value2: any = value; // 有效
let value3: boolean = value; // 无效
let value4: number = value; // 无效
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

