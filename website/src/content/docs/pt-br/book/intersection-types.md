---
title: Tipos Intersection
sidebar:
  order: 32
  label: 32. Tipos Intersection
---


Um Tipo Intersection é um tipo que representa um valor que possui todas as propriedades de dois ou mais tipos. Tipos Intersection são denotados usando o símbolo `&` entre cada tipo.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

