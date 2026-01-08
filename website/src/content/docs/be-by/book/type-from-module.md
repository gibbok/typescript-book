---
title: Type from Module
sidebar:
  order: 36
  label: 36. Type from Module
---


Type from Module refers to the ability to use a module's exported values to automatically infer their types. When a module exports a value with a specific type, TypeScript can use that information to automatically infer the type of that value when it is imported into another module.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

