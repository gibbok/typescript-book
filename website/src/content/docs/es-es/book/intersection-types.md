---
title: Tipos de intersección
sidebar:
  order: 34
  label: 34. Tipos de intersección
---


Un tipo de intersección representa un valor que posee todas las propiedades de dos o más tipos. Se indica mediante el símbolo `&` entre cada tipo.

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

