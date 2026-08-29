# Pengenalan TypeScript



### Apa itu TypeScript?

TypeScript adalah bahasa pemrograman bertipe kuat yang dikembangkan berdasarkan JavaScript. Bahasa ini awalnya dirancang oleh Anders Hejlsberg pada tahun 2012 dan saat ini dikembangkan serta dipelihara oleh Microsoft sebagai proyek sumber terbuka.

TypeScript dikompilasi menjadi JavaScript dan dapat dijalankan dalam lingkungan runtime JavaScript apa pun (misalnya, browser atau Node.js pada server).

TypeScript mendukung berbagai paradigma pemrograman seperti pemrograman fungsional, generic, imperatif, dan berorientasi objek, serta merupakan bahasa terkompilasi (ditranspilasi) yang dikonversi menjadi JavaScript sebelum dijalankan.

### Mengapa TypeScript?

TypeScript adalah bahasa bertipe kuat yang membantu mencegah kesalahan pemrograman umum dan menghindari jenis error runtime tertentu sebelum program dijalankan.

Bahasa bertipe kuat memungkinkan pengembang menentukan berbagai batasan dan perilaku program dalam definisi tipe data, sehingga memudahkan verifikasi kebenaran perangkat lunak dan pencegahan cacat. Hal ini sangat bermanfaat dalam aplikasi berskala besar.

Beberapa manfaat TypeScript:

* Pengetikan statis, secara opsional bertipe kuat
* Inferensi Tipe
* Akses ke fitur ES6 dan ES7
* Kompatibilitas Lintas Platform dan Lintas Browser
* Dukungan tooling dengan IntelliSense

### TypeScript dan JavaScript

TypeScript ditulis dalam berkas berekstensi `.ts` atau `.tsx`, sedangkan JavaScript ditulis dalam berkas berekstensi `.js` atau `.jsx`.

Berkas dengan ekstensi `.tsx` atau `.jsx` dapat berisi sintaks JSX untuk JavaScript, yang digunakan dalam React untuk pengembangan UI.

TypeScript adalah superset bertipe dari JavaScript (ECMAScript 2015) dalam hal sintaks. Semua kode JavaScript merupakan kode TypeScript yang valid, tetapi kebalikannya tidak selalu berlaku.

Sebagai contoh, perhatikan sebuah fungsi dalam berkas JavaScript dengan ekstensi `.js`, seperti berikut:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Fungsi tersebut dapat dikonversi dan digunakan dalam TypeScript dengan mengubah ekstensi berkas menjadi `.ts`. Namun, jika fungsi yang sama diberi anotasi tipe TypeScript, fungsi tersebut tidak dapat dijalankan dalam lingkungan runtime JavaScript apa pun tanpa kompilasi. Kode TypeScript berikut akan menghasilkan error sintaks jika tidak dikompilasi:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript dirancang untuk mendeteksi kemungkinan error runtime pada waktu kompilasi dengan memungkinkan pengembang mengekspresikan maksud melalui anotasi tipe. Selain itu, TypeScript juga dapat menemukan masalah tertentu meskipun tidak ada anotasi tipe eksplisit yang diberikan, berkat inferensi tipe. Sebagai contoh, cuplikan kode berikut tidak menentukan tipe TypeScript apa pun:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

Dalam kasus ini, TypeScript mendeteksi error dan melaporkan:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Sistem tipe TypeScript sangat dipengaruhi oleh perilaku runtime JavaScript. Sebagai contoh, operator penjumlahan (+), yang dalam JavaScript dapat melakukan penggabungan string atau penjumlahan numerik, dimodelkan dengan cara yang sama dalam TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

Tim di balik TypeScript telah mengambil keputusan yang disengaja untuk menandai penggunaan JavaScript yang tidak biasa sebagai error. Sebagai contoh, perhatikan kode JavaScript valid berikut:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

Namun, TypeScript menghasilkan error:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Error ini terjadi karena TypeScript memberlakukan kompatibilitas tipe secara ketat, dan dalam kasus ini, TypeScript mengidentifikasi operasi yang tidak valid antara `number` dan `boolean`.

### Pembuatan Kode TypeScript

Compiler TypeScript memiliki dua tanggung jawab utama: memeriksa error tipe dan mengompilasi menjadi JavaScript. Kedua proses ini tidak bergantung satu sama lain. Tipe tidak memengaruhi eksekusi kode dalam lingkungan runtime JavaScript karena tipe dihapus sepenuhnya selama kompilasi. TypeScript tetap dapat menghasilkan JavaScript meskipun terdapat error tipe.

Berikut adalah contoh kode TypeScript dengan error tipe:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Namun, kode tersebut tetap dapat menghasilkan keluaran JavaScript yang dapat dijalankan:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Tipe TypeScript tidak dapat diperiksa pada saat runtime. Sebagai contoh:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Karena tipe dihapus setelah kompilasi, kode ini tidak dapat dijalankan dalam JavaScript. Untuk mengenali tipe pada saat runtime, kita perlu menggunakan mekanisme lain. TypeScript menyediakan beberapa opsi, salah satu yang umum adalah "tagged union". Sebagai contoh:

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

Properti "kind" adalah nilai yang dapat digunakan pada saat runtime untuk membedakan objek dalam JavaScript.

Sebuah nilai pada saat runtime juga dapat memiliki tipe yang berbeda dari tipe yang dinyatakan dalam deklarasi tipe. Misalnya, pengembang dapat salah menafsirkan tipe API dan memberikan anotasi yang keliru.

TypeScript adalah superset dari JavaScript, sehingga kata kunci "class" dapat digunakan sebagai tipe dan nilai pada saat runtime.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

Dalam JavaScript, sebuah "class" memiliki properti "prototype", dan operator "instanceof" dapat digunakan untuk menguji apakah properti prototype dari sebuah constructor muncul di mana pun dalam rantai prototype suatu objek.

TypeScript tidak berpengaruh pada performa runtime karena semua tipe akan dihapus. Namun, TypeScript menimbulkan sedikit overhead pada waktu build.

### JavaScript Modern Saat Ini (Downleveling)

TypeScript dapat mengompilasi kode ke versi JavaScript apa pun yang telah dirilis sejak ECMAScript 3 (1999). Ini berarti TypeScript dapat mentranspilasi kode yang menggunakan fitur JavaScript terbaru ke versi yang lebih lama, sebuah proses yang dikenal sebagai Downleveling. Hal ini memungkinkan penggunaan JavaScript modern sekaligus mempertahankan kompatibilitas maksimal dengan lingkungan runtime yang lebih lama.

Penting untuk diperhatikan bahwa selama transpilasi ke versi JavaScript yang lebih lama, TypeScript mungkin menghasilkan kode yang dapat menimbulkan overhead performa dibandingkan dengan implementasi native.

Berikut adalah beberapa fitur JavaScript modern yang dapat digunakan dalam TypeScript:

* Modul ECMAScript sebagai pengganti callback "define" bergaya AMD atau pernyataan "require" CommonJS.
* Class sebagai pengganti prototype.
* Deklarasi variabel menggunakan "let" atau "const" sebagai pengganti "var".
* Perulangan "for-of" atau ".forEach" sebagai pengganti perulangan "for" tradisional.
* Arrow function sebagai pengganti function expression.
* Destructuring assignment.
* Nama properti/metode yang disingkat dan nama properti terkomputasi.
* Parameter fungsi default.

Dengan memanfaatkan fitur JavaScript modern ini, pengembang dapat menulis kode TypeScript yang lebih ekspresif dan ringkas.

