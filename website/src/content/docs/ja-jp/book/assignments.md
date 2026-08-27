---
title: 代入
sidebar:
  order: 22
  label: 22. 代入
---


TypeScript で代入を使用した型の絞り込みは、変数に代入された値に基づいて、その変数の型を絞り込む方法です。変数に値が代入されると、TypeScript は代入された値に基づいて型を推論し、推論された型に一致するように変数の型を絞り込みます。

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

