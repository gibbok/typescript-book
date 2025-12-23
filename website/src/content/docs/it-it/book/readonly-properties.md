---
title: Proprietà di sola lettura
sidebar:
  order: 13
  label: 13. Proprietà di sola lettura
---


È possibile impedire la scrittura su una proprietà utilizzando il modificatore `readonly`, che assicura che la proprietà non possa essere riscritta ma non fornisce alcuna garanzia di immutabilità totale:

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

