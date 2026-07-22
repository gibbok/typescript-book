---
title: Distributive Conditional Types
sidebar:
  order: 43
  label: 43. Distributive Conditional Types
---


Distributive Conditional Types are a feature that allows a type to be distributed over a union of types by applying a transformation to each member of the union individually.
This can be especially useful when working with mapped types or higher-order types.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

