---
title: Predicati di tipo
sidebar:
  order: 25
  label: 25. Predicati di tipo
---


I predicati di tipo in TypeScript sono funzioni che restituiscono un valore booleano e vengono utilizzate per restringere il tipo di una variabile a un tipo più specifico.

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

