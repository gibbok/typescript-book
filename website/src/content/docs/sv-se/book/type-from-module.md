---
title: Typ från modul
sidebar:
  order: 36
  label: 36. Typ från modul
---


Typ från modul avser möjligheten att använda en moduls exporterade värden för att automatiskt härleda deras typer. När en modul exporterar ett värde med en specifik typ kan TypeScript använda den informationen för att automatiskt härleda typen av det värdet när det importeras till en annan modul.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

