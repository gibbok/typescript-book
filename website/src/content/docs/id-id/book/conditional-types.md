---
title: Tipe Kondisional
sidebar:
  order: 40
  label: 40. Tipe Kondisional
---


Tipe Kondisional adalah cara untuk membuat tipe yang bergantung pada suatu kondisi, ketika tipe yang akan dibuat ditentukan berdasarkan hasil kondisi tersebut. Tipe ini didefinisikan menggunakan kata kunci `extends` dan operator ternary untuk memilih salah satu dari dua tipe secara kondisional.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

