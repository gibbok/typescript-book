---
title: Tipe dari Modul
sidebar:
  order: 37
  label: 37. Tipe dari Modul
---


Tipe dari Modul mengacu pada kemampuan untuk menggunakan nilai yang diekspor sebuah modul guna menginferensi tipenya secara otomatis. Ketika sebuah modul mengekspor nilai dengan tipe tertentu, TypeScript dapat menggunakan informasi tersebut untuk secara otomatis menginferensi tipe nilai itu ketika diimpor ke modul lain.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

