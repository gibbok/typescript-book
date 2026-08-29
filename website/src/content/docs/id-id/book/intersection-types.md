---
title: Tipe Intersection
sidebar:
  order: 33
  label: 33. Tipe Intersection
---


Tipe Intersection adalah tipe yang merepresentasikan nilai yang memiliki semua properti dari dua atau lebih tipe. Tipe Intersection dinyatakan menggunakan simbol `&` di antara setiap tipe.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

