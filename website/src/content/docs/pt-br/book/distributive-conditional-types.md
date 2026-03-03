---
title: Tipos Condicionais Distributivos
sidebar:
  order: 40
  label: 40. Tipos Condicionais Distributivos
---


Tipos condicionais distributivos em TypeScript distribuem operações de tipo sobre uniões. Quando um tipo condicional é aplicado a um tipo union, ele se aplica a cada membro da união separadamente.

```typescript
type ToArray<T> = T extends any ? T[] : never;

type A = ToArray<string | number>; // string[] | number[]
```

