---
title: Tipo a partir de Módulo
sidebar:
  order: 36
  label: 36. Tipo a partir de Módulo
---


Em TypeScript, `import type` permite importar um tipo de um módulo:

<!-- skip -->
```typescript
// person.ts
export type Person = {
    name: string;
    age: number;
};

// app.ts
import type { Person } from './person';
```

