---
title: Namngiven tuppeltyp (Märkt)
sidebar:
  order: 32
  label: 32. Namngiven tuppeltyp (Märkt)
---


Tuppeltyper kan inkludera valfria etiketter eller namn för varje element. Dessa etiketter är till för läsbarhet och verktygsstöd, och påverkar inte de operationer du kan utföra med dem.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

