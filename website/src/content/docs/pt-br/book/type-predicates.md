---
title: Predicados de Tipo
sidebar:
  order: 23
  label: 23. Predicados de Tipo
---


Predicados de Tipo no TypeScript são funções que retornam um valor booleano e são usadas para estreitar o tipo de uma variável para um tipo mais específico.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

