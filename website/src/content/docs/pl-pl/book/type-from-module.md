---
title: Typ na podstawie modułu
sidebar:
  order: 37
  label: 37. Typ na podstawie modułu
---


Typ na podstawie modułu oznacza możliwość użycia wartości eksportowanych przez moduł do automatycznego wnioskowania ich typów. Gdy moduł eksportuje wartość określonego typu, TypeScript może użyć tej informacji do automatycznego wywnioskowania typu tej wartości po zaimportowaniu jej do innego modułu.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

