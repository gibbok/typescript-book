---
title: Tipo a partir de un módulo
sidebar:
  order: 37
  label: 37. Tipo a partir de un módulo
---


El tipo a partir de un módulo permite utilizar los valores exportados para inferir automáticamente sus tipos. Cuando un módulo exporta un valor con un tipo concreto, TypeScript puede usar esa información al importarlo en otro módulo.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

