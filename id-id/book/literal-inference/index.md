# Inferensi Literal



Inferensi Literal adalah fitur dalam TypeScript yang memungkinkan tipe suatu variabel atau parameter diinferensi berdasarkan nilainya.

Dalam contoh berikut, kita dapat melihat bahwa TypeScript menganggap `x` sebagai tipe literal karena nilainya tidak dapat diubah di kemudian hari, sedangkan `y` diinferensi sebagai string karena dapat diubah di kemudian hari.

```typescript
const x = 'x'; // Tipe literal 'x', karena nilai ini tidak dapat diubah
let y = 'y'; // Tipe string, karena kita dapat mengubah nilai ini
```

Dalam contoh berikut, kita dapat melihat bahwa `o.x` diinferensi sebagai `string` (dan bukan literal `a`) karena TypeScript menganggap nilainya dapat diubah di kemudian hari.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Ini adalah string yang lebih lebar
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argumen bertipe 'string' tidak dapat ditetapkan ke parameter bertipe 'X'
```

Seperti yang dapat Anda lihat, kode tersebut menghasilkan error saat meneruskan `o.x` ke `fn` karena `X` merupakan tipe yang lebih sempit.

Kita dapat mengatasi masalah ini dengan menggunakan type assertion dengan `const` atau tipe `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

atau:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

