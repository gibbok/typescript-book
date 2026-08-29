---
title: Tipe Struktural yang Dihapus
sidebar:
  order: 57
  label: 57. Tipe Struktural yang Dihapus
---


Dalam TypeScript, objek tidak harus cocok dengan tipe tertentu secara persis. Misalnya, jika kita membuat objek yang memenuhi persyaratan suatu antarmuka, kita dapat menggunakan objek tersebut di tempat yang memerlukan antarmuka itu, meskipun tidak ada hubungan eksplisit di antara keduanya.
Contoh:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

