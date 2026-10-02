---
title: Símbolos (Symbols)
sidebar:
  order: 59
  label: 59. Símbolos (Symbols)
---


Símbolos são um tipo de dados primitivo que representa um valor imutável, cuja unicidade global é garantida durante toda a execução do programa.

Símbolos podem ser usados como chaves para propriedades de objetos e fornecem uma maneira de criar propriedades não enumeráveis.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // Saída: value 1
console.log(obj[key2]); // Saída: value 2
```

Em WeakMaps e WeakSets, símbolos agora são permitidos como chaves.

