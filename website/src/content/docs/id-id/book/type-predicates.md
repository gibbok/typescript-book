---
title: Predikat Tipe
sidebar:
  order: 24
  label: 24. Predikat Tipe
---


Predikat Tipe dalam TypeScript adalah fungsi yang mengembalikan nilai boolean dan digunakan untuk mempersempit tipe suatu variabel menjadi tipe yang lebih spesifik.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 secara otomatis menginferensi predikat tipe (seperti `x is T`) dalam fungsi seperti `.filter`, sehingga TypeScript mengetahui ketika nilai seperti `undefined` dihapus—menghasilkan tipe yang lebih presisi dan lebih sedikit error. Ini berlaku untuk pemeriksaan yang jelas (misalnya, `x !== undefined`), tetapi tidak untuk pemeriksaan ambigu seperti `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

