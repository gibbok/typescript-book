---
title: Mesclagem e Extensão
sidebar:
  order: 52
  label: 52. Mesclagem e Extensão
---


Interfaces podem ser mescladas (declaração merging) e podem estender outras interfaces:

```typescript
interface Person {
    name: string;
}

interface Person {
    age: number;
}

// Mescladas para: { name: string; age: number; }

interface Employee extends Person {
    employeeId: number;
}
```

