---
title: Tipo Union
sidebar:
  order: 31
  label: 31. Tipo Union
---


Um Tipo Union é um tipo que representa um valor que pode ser um de vários tipos. Tipos Union são denotados usando o símbolo `|` entre cada tipo possível.

```typescript
let x: string | number;
x = 'hello'; // Válido
x = 123; // Válido
```

