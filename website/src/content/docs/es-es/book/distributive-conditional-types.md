---
title: Tipos condicionales distributivos
sidebar:
  order: 42
  label: 42. Tipos condicionales distributivos
---


Los tipos condicionales distributivos permiten distribuir un tipo sobre una unión aplicando una transformación a cada miembro por separado.
Esto resulta especialmente útil con tipos mapeados o tipos de orden superior.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

