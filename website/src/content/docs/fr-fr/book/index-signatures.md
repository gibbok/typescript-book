---
title: Signatures d'index
sidebar:
  order: 15
  label: 15. Signatures d'index
---


Dans TypeScript, nous pouvons utiliser `string`, `number` et `symbol` comme signatures d’index :

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Veuillez noter que JavaScript convertit automatiquement un index de type `number` en index de type `string`. Ainsi, `k[1]` et `k["1"]` renvoient la même valeur.

