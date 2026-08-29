---
title: Tipe Union
sidebar:
  order: 32
  label: 32. Tipe Union
---


Tipe Union adalah tipe yang merepresentasikan nilai yang dapat berupa salah satu dari beberapa tipe. Tipe Union dinyatakan menggunakan simbol `|` di antara setiap tipe yang mungkin.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

