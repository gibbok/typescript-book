---
title: Distributive Conditional Types
sidebar:
  order: 40
  label: 40. Distributive Conditional Types
---


Distributive Conditional Types are a feature that allow a type to be distributed over a union of types, by applying a transformation to each member of the union individually.
This can be especially useful when working with mapped types or higher-order types.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

