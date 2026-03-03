---
title: Tipos de Interseção
sidebar:
  order: 32
  label: 32. Tipos de Interseção
---


Um Tipo de Interseção (Intersection Type) é um tipo que representa um valor que possui todas as propriedades de dois ou mais tipos. Tipos de Interseção são denotados usando o símbolo `&` entre cada tipo.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Interseção

const j: J = {
    a: 'a',
    b: 'b',
};
```

