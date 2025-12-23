---
title: Simboli
sidebar:
  order: 58
  label: 58. Simboli
---


I simboli sono un tipo di dati primitivo che rappresenta un valore immutabile la cui unicità globale è garantita per tutta la durata del programma.

I simboli possono essere utilizzati come chiavi per le proprietà degli oggetti e forniscono un modo per creare proprietà non enumerabili.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // valore 1
console.log(obj[key2]); // valore 2
```

In WeakMaps e WeakSet, i simboli sono ora consentiti come chiavi.

