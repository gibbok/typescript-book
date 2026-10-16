---
title: Tipe Literal
sidebar:
  order: 17
  label: 17. Tipe Literal
---


Tipe Literal adalah himpunan berelemen tunggal di dalam tipe kolektif; tipe ini mendefinisikan nilai yang sangat spesifik dan merupakan primitif JavaScript.

Tipe Literal dalam TypeScript adalah number, string, dan boolean.

Contoh literal:

```typescript
const a = 'a'; // Tipe literal string
const b = 1; // Tipe literal numerik
const c = true; // Tipe literal boolean
```

Tipe literal string, numerik, dan boolean digunakan dalam union, type guard, dan type alias.
Dalam contoh berikut, Anda dapat melihat sebuah type alias union. `O` hanya terdiri dari nilai-nilai yang ditentukan; string lain tidak valid:

```typescript
type O = 'a' | 'b' | 'c';
```

