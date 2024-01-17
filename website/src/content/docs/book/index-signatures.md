---
title: Index Signatures
sidebar:
  order: 14
  label: 14. Index Signatures
---


In TypeScript we can use as index signature `string`, `number`, and `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Please note that JavaScript automatically converts an index with `number` to an index with `string` so `k[1]` or `k["1"]` return the same value.

