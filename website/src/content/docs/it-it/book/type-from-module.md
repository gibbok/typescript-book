---
title: Tipo da modulo
sidebar:
  order: 36
  label: 36. Tipo da modulo
---


Il tipo da modulo si riferisce alla possibilità di utilizzare i valori esportati di un modulo per dedurne automaticamente il tipo. Quando un modulo esporta un valore con un tipo specifico, TypeScript può utilizzare tali informazioni per dedurre automaticamente il tipo di quel valore quando viene importato in un altro modulo.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r è un numero
```

