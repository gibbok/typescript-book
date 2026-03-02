---
title: Unionstyp
sidebar:
  order: 31
  label: 31. Unionstyp
---


En unionstyp är en typ som representerar ett värde som kan vara en av flera typer. Unionstyper betecknas med symbolen `|` mellan varje möjlig typ.

```typescript
let x: string | number;
x = 'hello'; // Giltig
x = 123; // Giltig
```

