---
title: Tipo de Módulo
sidebar:
  order: 36
  label: 36. Tipo de Módulo
---


Tipo de Módulo refere-se à capacidade de usar os valores exportados de um módulo para inferir automaticamente seus tipos. Quando um módulo exporta um valor com um tipo específico, o TypeScript pode usar essa informação para inferir automaticamente o tipo desse valor quando ele é importado em outro módulo.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r é number
```

