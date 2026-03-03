---
title: Intersektionstyper
sidebar:
  order: 32
  label: 32. Intersektionstyper
---


En intersektionstyp är en typ som representerar ett värde som har alla egenskaper hos två eller flera typer. Intersektionstyper betecknas med symbolen `&` mellan varje typ.

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

