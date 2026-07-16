---
title: Inferencia de tipos con infer en tipos condicionales
sidebar:
  order: 41
  label: 41. Inferencia de tipos con infer en tipos condicionales
---


La palabra clave `infer` se utiliza en tipos condicionales para inferir (extraer) el tipo de un parámetro genérico desde un tipo que depende de él. Esto permite escribir definiciones más flexibles y reutilizables.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

