---
title: Tipe Tuple Bernama (Berlabel)
sidebar:
  order: 30
  label: 30. Tipe Tuple Bernama (Berlabel)
---


Tipe tuple dapat menyertakan label atau nama opsional untuk setiap elemen. Label ini digunakan untuk keterbacaan dan dukungan tooling, serta tidak memengaruhi operasi yang dapat Anda lakukan dengannya.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

