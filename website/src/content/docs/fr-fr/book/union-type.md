---
title: Type union
sidebar:
  order: 32
  label: 32. Type union
---


Un type union représente une valeur qui peut appartenir à l'un de plusieurs types. Les types union sont indiqués à l'aide du symbole `|` entre chaque type possible.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

