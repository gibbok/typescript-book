---
title: Types intersection
sidebar:
  order: 33
  label: 33. Types intersection
---


Un type intersection représente une valeur qui possède toutes les propriétés de deux types ou plus. Les types intersection sont indiqués à l'aide du symbole `&` entre chaque type.

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

