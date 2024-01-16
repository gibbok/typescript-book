---
title: Named Tuple Type (Labeled)
sidebar:
  order: 29
  label: 29. Named Tuple Type (Labeled)
---


Tuple types can include optional labels or names for each element. These labels are for readability and tooling assistance, and do not affect the operations you can perform with them.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

