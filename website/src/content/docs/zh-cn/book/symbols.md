---
title: Symbols
sidebar:
  order: 58
  label: 58. Symbols
---


符号是一种原始数据类型，表示不可变值，保证在程序的整个生命周期中全局唯一。

符号可以用作对象属性的键，并提供一种创建不可枚举属性的方法。

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

在 WeakMap 和 WeakSet 中，现在允许符号作为键。

