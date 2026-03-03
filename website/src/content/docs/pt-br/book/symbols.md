---
title: Symbols
sidebar:
  order: 58
  label: 58. Symbols
---


Symbols são um tipo de dado primitivo que representa valores imutáveis que são garantidos como globalmente únicos durante o tempo de vida do programa.

<!-- skip -->
```typescript
const sym1 = Symbol('key');
const sym2 = Symbol('key');

console.log(sym1 === sym2); // false

const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2',
};
```

