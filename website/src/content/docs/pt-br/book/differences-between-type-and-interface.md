---
title: Diferenças entre Type e Interface
sidebar:
  order: 53
  label: 53. Diferenças entre Type e Interface
---


Diferenças principais:

1. **Declaração merging**: Interfaces suportam, types não
2. **Uniões**: Types suportam uniões, interfaces não
3. **Tipos computados**: Types podem usar tipos computados
4. **Extending**: Interfaces usam `extends`, types usam `&`

```typescript
// Interface - declaração merging
interface User {
    name: string;
}
interface User {
    age: number;
}

// Type - uniões
type Status = 'success' | 'error';

// Type - tipos computados
type Keys = 'a' | 'b';
type Obj = { [K in Keys]: string };
```

