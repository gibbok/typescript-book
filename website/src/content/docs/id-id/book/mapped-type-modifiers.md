---
title: Modifier Mapped Type
sidebar:
  order: 39
  label: 39. Modifier Mapped Type
---


Modifier Mapped Type dalam TypeScript memungkinkan transformasi properti di dalam tipe yang sudah ada:

* `readonly` atau `+readonly`: Ini menjadikan properti dalam mapped type sebagai read-only.
* `-readonly`: Ini memungkinkan properti dalam mapped type bersifat mutable.
* `?`: Ini menetapkan properti dalam mapped type sebagai opsional.

Contoh:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

