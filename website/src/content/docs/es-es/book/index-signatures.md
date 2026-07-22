---
title: Firmas de índice
sidebar:
  order: 17
  label: 17. Firmas de índice
---


En TypeScript podemos utilizar `string`, `number` y `symbol` como firmas de índice:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Ten en cuenta que JavaScript convierte automáticamente un índice `number` en un índice `string`, por lo que `k[1]` y `k["1"]` devuelven el mismo valor.

