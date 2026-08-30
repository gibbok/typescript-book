---
title: Sygnatury indeksowe
sidebar:
  order: 15
  label: 15. Sygnatury indeksowe
---


W TypeScript można używać typów `string`, `number` i `symbol` jako sygnatur indeksowych:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Należy pamiętać, że JavaScript automatycznie konwertuje indeks typu `number` na indeks typu `string`, dlatego `k[1]` i `k["1"]` zwracają tę samą wartość.

