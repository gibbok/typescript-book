---
title: Tipe Kondisional Distributif
sidebar:
  order: 41
  label: 41. Tipe Kondisional Distributif
---


Tipe Kondisional Distributif adalah fitur yang memungkinkan suatu tipe didistribusikan pada sebuah union tipe dengan menerapkan transformasi pada setiap member union secara individual.
Hal ini dapat sangat berguna ketika bekerja dengan mapped type atau higher-order type.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

