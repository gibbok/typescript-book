---
title: Símbolos
sidebar:
  order: 58
  label: 58. Símbolos
---


Símbolos são um tipo de dado primitivo que representa um valor imutável que é garantido ser globalmente único ao longo da vida útil do programa.

Símbolos podem ser usados como chaves para propriedades de objetos e fornecem uma maneira de criar propriedades não enumeráveis.

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

Em WeakMaps e WeakSets, símbolos agora são permitidos como chaves.

