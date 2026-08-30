---
title: Distributive bedingte Typen
sidebar:
  order: 41
  label: 41. Distributive bedingte Typen
---


Distributive bedingte Typen sind eine Funktion, mit der ein Typ über eine Union von Typen verteilt werden kann, indem auf jeden Member der Union einzeln eine Transformation angewendet wird.
Dies kann besonders bei der Arbeit mit gemappten Typen oder Typen höherer Ordnung nützlich sein.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

