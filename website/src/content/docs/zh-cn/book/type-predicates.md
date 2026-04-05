---
title: 类型谓词
sidebar:
  order: 23
  label: 23. 类型谓词
---


TypeScript 中的类型谓词是返回布尔值的函数，用于将变量的类型缩小为更具体的类型。

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 会自动推断函数（例如 `.filter`）中的类型谓词（例如 `x is T`），因此它知道何时会移除像 `undefined` 这样的值——从而提供更精确的类型并减少错误；这对于明确的类型检查（例如 `x !== undefined`）有效，但对于像 `!!x` 这样含义模糊的类型检查则无效。

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

