---
title: Mapped Type
sidebar:
  order: 38
  label: 38. Mapped Type
---


Mapped Type dalam TypeScript memungkinkan Anda membuat tipe baru berdasarkan tipe yang sudah ada dengan mentransformasi setiap properti menggunakan fungsi pemetaan. Dengan memetakan tipe yang sudah ada, Anda dapat membuat tipe baru yang merepresentasikan informasi yang sama dalam format berbeda. Untuk membuat mapped type, Anda mengakses properti tipe yang sudah ada menggunakan operator `keyof`, lalu mengubahnya untuk menghasilkan tipe baru.
Dalam contoh berikut:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

Kita mendefinisikan `MyMappedType` untuk memetakan properti-properti `T`, sehingga menghasilkan tipe baru dengan setiap properti berupa array dari tipe aslinya. Dengan menggunakan ini, kita membuat `MyNewType` untuk merepresentasikan informasi yang sama seperti `MyType`, tetapi setiap propertinya berupa array.

