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
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

Tipe Literal String, Numerik, dan Boolean digunakan dalam union, type guard, dan type alias.
Dalam contoh berikut, Anda dapat melihat sebuah type alias union. `O` hanya terdiri dari nilai-nilai yang ditentukan; string lain tidak valid:

```typescript
type O = 'a' | 'b' | 'c';
```

