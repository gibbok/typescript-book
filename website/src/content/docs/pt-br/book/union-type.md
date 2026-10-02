---
title: Tipo de União
sidebar:
  order: 32
  label: 32. Tipo de União
---


Um tipo de união (Union Type) é um tipo que representa um valor cujo tipo pode ser um entre vários tipos. Tipos de união são denotados usando o símbolo `|` entre cada tipo possível.

```typescript
let x: string | number;
x = 'hello'; // Válido
x = 123; // Válido
```

