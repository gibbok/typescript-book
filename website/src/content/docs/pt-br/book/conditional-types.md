---
title: Tipos Condicionais
sidebar:
  order: 39
  label: 39. Tipos Condicionais
---


Tipos Condicionais são uma maneira de criar um tipo que depende de uma condição, onde o tipo a ser criado é determinado com base no resultado da condição. Eles são definidos usando a palavra-chave `extends` e um operador ternário para escolher condicionalmente entre dois tipos.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Tipo true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Tipo false
```

