---
title: Type à partir d'un module
sidebar:
  order: 37
  label: 37. Type à partir d'un module
---


Le type à partir d'un module désigne la possibilité d'utiliser les valeurs exportées d'un module afin d'en inférer automatiquement les types. Lorsqu'un module exporte une valeur avec un type précis, TypeScript peut utiliser cette information pour inférer automatiquement le type de cette valeur lorsqu'elle est importée dans un autre module.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

