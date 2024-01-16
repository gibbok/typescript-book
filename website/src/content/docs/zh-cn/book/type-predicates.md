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

