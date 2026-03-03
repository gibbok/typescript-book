---
title: Tipos Condicionais Distributivos
sidebar:
  order: 40
  label: 40. Tipos Condicionais Distributivos
---


Tipos Condicionais Distributivos são um recurso que permite que um tipo seja distribuído sobre uma união de tipos, aplicando uma transformação a cada membro da união individualmente.
Isso pode ser especialmente útil ao trabalhar com tipos mapeados ou tipos de ordem superior.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

