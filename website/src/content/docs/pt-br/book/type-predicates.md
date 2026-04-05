---
title: Predicados de Tipo
sidebar:
  order: 23
  label: 23. Predicados de Tipo
---


Predicados de Tipo (Type Predicates) no TypeScript são funções que retornam um valor booleano e são usadas para estreitar o tipo de uma variável para um tipo mais específico.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('não é uma string');
    }
};
```

O TypeScript 5.5 infere automaticamente predicados de tipo (como `x is T`) em funções como `.filter`, de forma que ele saiba quando valores como `undefined` são removidos — resultando em tipos mais precisos e menos erros; isso funciona para verificações claras (por exemplo, `x !== undefined`), mas não para verificações ambíguas como `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

