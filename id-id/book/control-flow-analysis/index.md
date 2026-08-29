# Analisis Alur Kontrol



Analisis Alur Kontrol dalam TypeScript adalah cara untuk menganalisis alur kode secara statis guna menginferensi tipe variabel, yang memungkinkan compiler mempersempit tipe variabel tersebut sesuai kebutuhan berdasarkan hasil analisis.

Sebelum TypeScript 4.4, analisis alur kode hanya diterapkan pada kode di dalam statement if, tetapi mulai TypeScript 4.4, analisis ini juga dapat diterapkan pada ekspresi kondisional dan akses properti diskriminan yang dirujuk secara tidak langsung melalui variabel const.

Sebagai contoh:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Beberapa contoh ketika penyempitan tidak terjadi:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Catatan: Hingga lima tingkat indireksi dianalisis dalam ekspresi kondisional.

