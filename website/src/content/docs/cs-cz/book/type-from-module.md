---
title: Typ z modulu
sidebar:
  order: 37
  label: 37. Typ z modulu
---


Typ z modulu označuje možnost používat exportované hodnoty modulu k automatickému odvození jejich typů. Když modul exportuje hodnotu s konkrétním typem, TypeScript může tuto informaci použít k automatickému odvození typu této hodnoty při jejím importu do jiného modulu.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

