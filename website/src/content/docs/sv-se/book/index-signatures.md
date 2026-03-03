---
title: Indexsignaturer
sidebar:
  order: 14
  label: 14. Indexsignaturer
---


I TypeScript kan vi använda `string`, `number` och `symbol` som indexsignatur:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Observera att JavaScript automatiskt konverterar ett index med `number` till ett index med `string`, så `k[1]` eller `k["1"]` returnerar samma värde.

