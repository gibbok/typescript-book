---
title: Tipo a partir de un valor
sidebar:
  order: 35
  label: 35. Tipo a partir de un valor
---


El tipo a partir de un valor hace referencia a la inferencia automática de un tipo desde un valor o expresión.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

