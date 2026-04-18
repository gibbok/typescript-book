---
title: Symbols
sidebar:
  order: 59
  label: 59. Symbols
---


Symbols са примитивен тип данни, който представлява неизменима стойност, гарантирано уникална в рамките на изпълнението на програмата.

Symbols могат да се използват като ключове за свойства на обекти и предоставят начин за създаване на не-енумерируеми свойства.

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

В WeakMap и WeakSet, symbols вече могат да се използват като ключове.

