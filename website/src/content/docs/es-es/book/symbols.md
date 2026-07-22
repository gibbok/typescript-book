---
title: Símbolos
sidebar:
  order: 60
  label: 60. Símbolos
---


Los símbolos son un tipo de datos primitivo que representa un valor inmutable cuya unicidad global se garantiza durante toda la vida del programa.

Pueden utilizarse como claves de propiedades de objetos y permiten crear propiedades no enumerables.

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

Ahora se permiten símbolos como claves en WeakMap y WeakSet.

