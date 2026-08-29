---
title: Index Signature
sidebar:
  order: 15
  label: 15. Index Signature
---


Dalam TypeScript, kita dapat menggunakan `string`, `number`, dan `symbol` sebagai index signature:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Perhatikan bahwa JavaScript secara otomatis mengonversi indeks dengan `number` menjadi indeks dengan `string`, sehingga `k[1]` atau `k["1"]` mengembalikan nilai yang sama.

