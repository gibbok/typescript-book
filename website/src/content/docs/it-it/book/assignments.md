---
title: Assegnazioni
sidebar:
  order: 22
  label: 22. Assegnazioni
---


Il restringimento TypeScript tramite assegnazioni è un modo per restringere il tipo di una variabile in base al valore assegnato. Quando a una variabile viene assegnato un valore, TypeScript ne deduce il tipo in base al valore assegnato e restringe il tipo della variabile in modo che corrisponda al tipo dedotto.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

