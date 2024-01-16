---
title: 赋值
sidebar:
  order: 21
  label: 21. 赋值
---


使用赋值缩小 TypeScript 是一种根据分配给变量的值来缩小变量类型的方法。当为变量分配值时，TypeScript 会根据分配的值推断其类型，并缩小变量的类型以匹配推断的类型。

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

