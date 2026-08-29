---
title: Inferensi Tipe infer dalam Tipe Kondisional
sidebar:
  order: 42
  label: 42. Inferensi Tipe infer dalam Tipe Kondisional
---


Kata kunci `infer` digunakan dalam tipe kondisional untuk menginferensi (mengekstrak) tipe parameter generik dari tipe yang bergantung padanya. Hal ini memungkinkan Anda menulis definisi tipe yang lebih fleksibel dan dapat digunakan kembali.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

