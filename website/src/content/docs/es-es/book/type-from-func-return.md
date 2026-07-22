---
title: Tipo a partir del retorno de una función
sidebar:
  order: 37
  label: 37. Tipo a partir del retorno de una función
---


El tipo a partir del retorno de una función permite inferir automáticamente el tipo de retorno según su implementación. De este modo, TypeScript puede determinar el tipo del valor devuelto sin anotaciones de tipo explícitas.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

