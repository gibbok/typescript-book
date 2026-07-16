---
title: Tipo de unión
sidebar:
  order: 31
  label: 31. Tipo de unión
---


Un tipo de unión representa un valor que puede pertenecer a varios tipos. Se indica mediante el símbolo `|` entre cada tipo posible.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

