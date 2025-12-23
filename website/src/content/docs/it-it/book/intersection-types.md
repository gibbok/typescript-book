---
title: Tipi Intersezione
sidebar:
  order: 32
  label: 32. Tipi Intersezione
---


Un Tipo Intersezione è un tipo che rappresenta un valore che ha tutte le proprietà di due o più tipi. I Tipi Intersezione sono indicati con il simbolo `&` tra ogni tipo.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersezione

const j: J = {
    a: 'a',
    b: 'b',
};
```

