---
title: Readonly Properties
sidebar:
  order: 13
  label: 13. Readonly Properties
---


Is it possible to prevent writing on a property by using the modifier `readonly`which  makes sure that the property cannot be re-written but does not provide any guarantee of total immutability:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

