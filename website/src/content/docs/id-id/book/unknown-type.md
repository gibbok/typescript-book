---
title: Tipe Unknown
sidebar:
  order: 46
  label: 46. Tipe Unknown
---


Dalam TypeScript, tipe `unknown` merepresentasikan nilai yang tipenya tidak diketahui. Tidak seperti tipe `any`, yang memungkinkan nilai dari tipe apa pun, `unknown` memerlukan pemeriksaan atau asersi tipe sebelum dapat digunakan dengan cara tertentu. Oleh karena itu, operasi apa pun tidak diizinkan pada `unknown` tanpa terlebih dahulu melakukan asersi atau narrowing ke tipe yang lebih spesifik.

Tipe `unknown` hanya dapat ditetapkan ke `any` dan `unknown` itu sendiri, serta merupakan alternatif yang aman secara tipe untuk `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

