---
title: Firme di indice
sidebar:
  order: 14
  label: 14. Firme di indice
---


In TypeScript possiamo usare come firma di indice `string`, `number` e `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Stesso risultato di k[1]
```

Si noti che JavaScript converte automaticamente un indice con `number` in un indice con `string`, quindi `k[1]` o `k["1"]` restituiscono lo stesso valore.

