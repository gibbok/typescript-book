---
title: Anotasi Tipe
sidebar:
  order: 12
  label: 12. Anotasi Tipe
---


Pada variabel yang dideklarasikan menggunakan `var`, `let`, dan `const`, anotasi tipe dapat ditambahkan secara opsional:

```typescript
const x: number = 1;
```

TypeScript dapat menginferensi tipe dengan baik, terutama untuk tipe yang sederhana, sehingga deklarasi ini tidak diperlukan dalam sebagian besar kasus.

Pada fungsi, anotasi tipe dapat ditambahkan ke parameter:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Berikut adalah contoh yang menggunakan fungsi anonim (juga disebut fungsi lambda):

```typescript
const sum = (a: number, b: number) => a + b;
```

Anotasi ini dapat dihindari ketika terdapat nilai default untuk sebuah parameter:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Anotasi tipe kembalian dapat ditambahkan ke fungsi:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Hal ini sangat berguna untuk fungsi yang lebih kompleks, karena menuliskan tipe kembalian sebelum implementasi dapat membantu Anda memikirkan fungsi tersebut secara menyeluruh.

Secara umum, pertimbangkan untuk memberi anotasi pada signature tipe, tetapi tidak pada variabel lokal di dalam isi fungsi, dan selalu tambahkan tipe pada literal objek.

