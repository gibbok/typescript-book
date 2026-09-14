---
title: Indexové signatury
sidebar:
  order: 15
  label: 15. Indexové signatury
---


V TypeScriptu můžeme v indexových signaturách používat `string`, `number` a `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Pamatujte, že JavaScript automaticky převádí index typu `number` na index typu `string`, takže `k[1]` i `k["1"]` vracejí stejnou hodnotu.

