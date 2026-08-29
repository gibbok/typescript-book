---
title: Symbol
sidebar:
  order: 59
  label: 59. Symbol
---


Simbol adalah tipe data primitif yang merepresentasikan nilai yang tidak dapat diubah serta dijamin unik secara global selama masa hidup program.

Simbol dapat digunakan sebagai kunci untuk properti objek dan menyediakan cara untuk membuat properti yang tidak dapat dienumerasi.

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

Dalam WeakMap dan WeakSet, simbol kini dapat digunakan sebagai kunci.

