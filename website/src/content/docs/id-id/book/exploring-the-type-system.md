---
title: Menjelajahi Sistem Tipe
sidebar:
  order: 10
  label: 10. Menjelajahi Sistem Tipe
---


### Layanan Bahasa TypeScript

TypeScript Language Service, yang juga dikenal sebagai tsserver, menawarkan berbagai fitur seperti pelaporan error, diagnostik, kompilasi saat menyimpan, penggantian nama, menuju definisi, daftar pelengkapan, bantuan signature, dan lainnya. Layanan ini terutama digunakan oleh lingkungan pengembangan terintegrasi (IDE) untuk menyediakan dukungan IntelliSense. Layanan ini terintegrasi dengan lancar dengan Visual Studio Code dan digunakan oleh alat seperti Conquer of Completion (Coc).

Pengembang dapat memanfaatkan API khusus dan membuat plugin language service kustom mereka sendiri untuk meningkatkan pengalaman penyuntingan TypeScript. Hal ini dapat sangat berguna untuk menerapkan fitur linting khusus atau mengaktifkan pelengkapan otomatis bagi bahasa template kustom.

<!-- markdownlint-disable MD044 -->
Contoh plugin kustom yang digunakan di dunia nyata adalah "typescript-styled-plugin", yang menyediakan pelaporan error sintaks dan dukungan IntelliSense untuk properti CSS dalam styled component.
<!-- markdownlint-enable MD044 -->

Untuk informasi lebih lanjut dan panduan memulai cepat, Anda dapat merujuk ke Wiki TypeScript resmi di GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Pengetikan Struktural

TypeScript didasarkan pada sistem tipe struktural. Artinya, kompatibilitas dan ekuivalensi tipe ditentukan oleh struktur atau definisi aktual tipe tersebut, bukan oleh nama atau tempat deklarasinya seperti dalam sistem tipe nominal, misalnya C# atau C.

Sistem tipe struktural TypeScript dirancang berdasarkan cara kerja sistem duck typing dinamis JavaScript saat runtime.

Contoh berikut merupakan kode TypeScript yang valid. Seperti yang dapat Anda amati, "X" dan "Y" memiliki member "a" yang sama meskipun nama deklarasinya berbeda. Tipe ditentukan oleh strukturnya, dan dalam kasus ini, karena strukturnya sama, keduanya kompatibel dan valid.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Aturan Dasar Perbandingan TypeScript

Proses perbandingan TypeScript bersifat rekursif dan dijalankan pada tipe yang bersarang di tingkat mana pun.

Tipe "X" kompatibel dengan "Y" jika "Y" setidaknya memiliki member yang sama dengan "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Parameter fungsi dibandingkan berdasarkan tipe, bukan namanya:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Tipe kembalian fungsi harus sama:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Tipe kembalian fungsi sumber harus merupakan subtipe dari tipe kembalian fungsi target:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Mengabaikan parameter fungsi diperbolehkan karena merupakan praktik umum dalam JavaScript, misalnya saat menggunakan "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Oleh karena itu, deklarasi tipe berikut sepenuhnya valid:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Setiap parameter opsional tambahan pada tipe sumber adalah valid:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Setiap parameter opsional pada tipe target yang tidak memiliki parameter terkait pada tipe sumber adalah valid dan bukan merupakan error:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Parameter rest diperlakukan sebagai rangkaian parameter opsional yang tidak terbatas:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Fungsi dengan overload valid jika signature overload kompatibel dengan signature implementasinya:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Perbandingan parameter fungsi berhasil jika parameter sumber dan target dapat ditetapkan ke supertipe atau subtipe (bivariance).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Enum dapat dibandingkan dan kompatibel dengan angka, demikian pula sebaliknya, tetapi membandingkan nilai Enum dari tipe Enum yang berbeda adalah tidak valid.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Instance dari suatu class menjalani pemeriksaan kompatibilitas untuk member private dan protected:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

Pemeriksaan perbandingan tidak mempertimbangkan perbedaan hierarki pewarisan, misalnya:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Tipe generic dibandingkan berdasarkan strukturnya setelah parameter generic diterapkan; hanya tipe hasil akhir yang dibandingkan sebagai tipe non-generic.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Ketika argumen tipe pada generic tidak ditentukan, semua argumen yang tidak ditentukan diperlakukan sebagai tipe "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Ingat:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Harap perhatikan bahwa ketika "strictNullChecks" diaktifkan, "null" dan "undefined" diperlakukan serupa dengan "void"; jika tidak, keduanya serupa dengan "never".

### Tipe sebagai Himpunan

Dalam TypeScript, tipe adalah himpunan nilai yang mungkin. Himpunan ini juga disebut sebagai domain tipe. Setiap nilai dari suatu tipe dapat dipandang sebagai elemen dalam sebuah himpunan. Tipe menetapkan batasan yang harus dipenuhi oleh setiap elemen dalam himpunan agar dianggap sebagai anggota himpunan tersebut.
Tugas utama TypeScript adalah memeriksa dan memverifikasi apakah satu himpunan merupakan subhimpunan dari himpunan lain.

TypeScript mendukung berbagai jenis himpunan:

| Istilah himpunan   | TypeScript                      | Catatan                                                                                                            |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Himpunan kosong    | never                           | "never" berisi apa pun selain dirinya sendiri                                                                     |
| Himpunan satu elemen | undefined / null / literal type |                                                                                                                  |
| Himpunan berhingga | boolean / union                 |                                                                                                                    |
| Himpunan tak berhingga | string / number / object    |                                                                                                                    |
| Himpunan semesta   | any / unknown                   | Setiap elemen merupakan anggota "any" dan setiap himpunan merupakan subhimpunannya / "unknown" adalah padanan "any" yang aman terhadap tipe |

Berikut beberapa contoh:

| TypeScript            | Istilah himpunan        | Contoh                                                                          |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (himpunan kosong)    | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Tipe literal          | Himpunan satu elemen   | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Nilai dapat ditetapkan ke T | Nilai ∈ T (anggota dari) | type XY = 'X' \| 'Y';                                                    |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 dapat ditetapkan ke T2 | T1 ⊆ T2 (subhimpunan dari) | type XY = 'X' \| 'Y';                                                    |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (subhimpunan dari) | type X = 'X' extends string ? true : false;                                |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (union)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (intersection) | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Himpunan semesta       | const x: unknown = 1                                                            |

Union, (T1 | T2), menghasilkan himpunan yang lebih luas (keduanya):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Intersection, (T1 & T2), menghasilkan himpunan yang lebih sempit (hanya yang sama):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

Kata kunci `extends` dapat dianggap sebagai "subhimpunan dari" dalam konteks ini. Kata kunci tersebut menetapkan batasan untuk suatu tipe. Ketika `extends` digunakan dengan generic, kata kunci tersebut membatasi parameter tipe generic ke tipe yang lebih spesifik.

Harap perhatikan bahwa `extends` di sini tidak berkaitan dengan pewarisan class dalam pengertian OOP.

TypeScript bekerja dengan tipe struktural dan tidak memiliki hierarki nominal yang ketat. Bahkan, seperti pada contoh di bawah, dua tipe dapat saling tumpang-tindih tanpa salah satunya menjadi subtipe dari yang lain karena TypeScript mempertimbangkan struktur, atau bentuk, objek.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### Menetapkan Tipe: Deklarasi Tipe dan Asersi Tipe

Tipe dapat ditetapkan dengan berbagai cara dalam TypeScript:

#### Deklarasi Tipe

Dalam contoh berikut, kita menggunakan x: X (": Tipe") untuk mendeklarasikan tipe bagi variabel x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Jika variabel tidak memiliki format yang ditentukan, TypeScript akan melaporkan error. Misalnya:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Asersi Tipe

Asersi dapat ditambahkan menggunakan kata kunci `as`. Ini memberi tahu compiler bahwa pengembang memiliki lebih banyak informasi tentang suatu tipe dan meniadakan error apa pun yang mungkin terjadi.

Sebagai contoh:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Dalam contoh di atas, object x diasersikan memiliki tipe X menggunakan kata kunci as. Ini memberi tahu compiler TypeScript bahwa object tersebut sesuai dengan tipe yang ditentukan meskipun memiliki properti tambahan b yang tidak terdapat dalam definisi tipe.

Asersi tipe berguna dalam situasi ketika tipe yang lebih spesifik perlu ditentukan, terutama saat bekerja dengan DOM. Misalnya:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Di sini, asersi tipe as HTMLInputElement digunakan untuk memberi tahu TypeScript bahwa hasil getElementById harus diperlakukan sebagai HTMLInputElement.
Asersi tipe juga dapat digunakan untuk memetakan ulang key, seperti yang ditunjukkan dalam contoh di bawah dengan template literal:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

Dalam contoh ini, tipe `J<Type>` menggunakan mapped type dengan template literal untuk memetakan ulang key dari Type. Tipe tersebut membuat properti baru dengan "prefix_" yang ditambahkan ke setiap key, dan nilai terkaitnya adalah fungsi yang mengembalikan nilai properti asli.

Perlu diperhatikan bahwa saat menggunakan asersi tipe, TypeScript tidak akan menjalankan pemeriksaan properti berlebih. Oleh karena itu, umumnya lebih baik menggunakan deklarasi tipe ketika struktur object telah diketahui sebelumnya.

#### Deklarasi Ambient

Deklarasi ambient adalah file yang mendeskripsikan tipe untuk kode JavaScript; file tersebut memiliki format nama file `.d.ts.`. Deklarasi ini biasanya diimpor dan digunakan untuk memberikan anotasi pada pustaka JavaScript yang sudah ada atau untuk menambahkan tipe ke file JS yang sudah ada dalam proyek Anda.

Tipe untuk banyak pustaka umum dapat ditemukan di:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

dan dapat diinstal menggunakan:

```shell
npm install --save-dev @types/library-name
```

Untuk Deklarasi Ambient yang Anda definisikan, Anda dapat mengimpornya menggunakan referensi "triple-slash":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Anda dapat menggunakan Deklarasi Ambient bahkan di dalam file JavaScript dengan menggunakan `// @ts-check`.

Kata kunci `declare` memungkinkan definisi tipe untuk kode JavaScript yang sudah ada tanpa mengimpornya, serta berfungsi sebagai placeholder untuk tipe dari file lain atau tipe global.

### Pemeriksaan Properti dan Pemeriksaan Properti Berlebih

TypeScript didasarkan pada sistem tipe struktural, tetapi pemeriksaan properti berlebih merupakan fitur TypeScript yang memungkinkannya memeriksa apakah suatu object memiliki properti persis seperti yang ditentukan dalam tipe.

Pemeriksaan Properti Berlebih dilakukan ketika menetapkan object literal ke variabel atau ketika meneruskannya sebagai argumen ke properti berlebih fungsi, misalnya.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Tipe Lemah

Suatu tipe dianggap lemah jika hanya berisi sekumpulan properti yang semuanya opsional:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript menganggap penetapan apa pun ke tipe lemah sebagai error jika tidak ada tumpang-tindih. Misalnya, kode berikut menghasilkan error:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Meskipun tidak disarankan, jika diperlukan, pemeriksaan ini dapat dilewati dengan menggunakan asersi tipe:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Atau dengan menambahkan `unknown` ke index signature pada tipe lemah:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Pemeriksaan Ketat Object Literal (Freshness)

Pemeriksaan ketat object literal, yang terkadang disebut sebagai "freshness", adalah fitur dalam TypeScript yang membantu menemukan properti berlebih atau salah eja yang mungkin tidak terdeteksi dalam pemeriksaan tipe struktural biasa.

Saat membuat object literal, compiler TypeScript menganggapnya "fresh". Jika object literal tersebut ditetapkan ke variabel atau diteruskan sebagai parameter, TypeScript akan menghasilkan error jika object literal menentukan properti yang tidak ada dalam tipe target.

Namun, "freshness" hilang ketika object literal diperlebar atau asersi tipe digunakan.

Berikut beberapa contoh untuk menggambarkannya:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Inferensi Tipe

TypeScript dapat menyimpulkan tipe ketika tidak ada anotasi yang diberikan dalam situasi berikut:

* Inisialisasi variabel.
* Inisialisasi member.
* Menetapkan nilai default untuk parameter.
* Tipe kembalian fungsi.

Sebagai contoh:

```typescript
let x = 'x'; // The type inferred is string
```

Compiler TypeScript menganalisis nilai atau ekspresi dan menentukan tipenya berdasarkan informasi yang tersedia.

### Inferensi Lebih Lanjut

Ketika beberapa ekspresi digunakan dalam inferensi tipe, TypeScript mencari "tipe umum terbaik". Misalnya:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Jika compiler tidak dapat menemukan tipe umum terbaik, compiler mengembalikan union type. Sebagai contoh:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript menggunakan "contextual typing" berdasarkan lokasi variabel untuk menyimpulkan tipe. Dalam contoh berikut, compiler mengetahui bahwa `e` bertipe `MouseEvent` karena tipe event `click` didefinisikan dalam file lib.d.ts, yang berisi deklarasi ambient untuk berbagai konstruksi umum JavaScript dan DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Pelebaran Tipe

Pelebaran tipe adalah proses ketika TypeScript menetapkan tipe ke variabel yang diinisialisasi tanpa anotasi tipe. Proses ini memungkinkan tipe sempit diperlebar, tetapi tidak sebaliknya.
Dalam contoh berikut:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript menetapkan `string` ke `x` berdasarkan satu nilai yang diberikan saat inisialisasi (`x`); ini merupakan contoh pelebaran.

TypeScript menyediakan cara untuk mengendalikan proses pelebaran, misalnya dengan menggunakan "const".

### Const

Menggunakan kata kunci `const` saat mendeklarasikan variabel menghasilkan inferensi tipe yang lebih sempit dalam TypeScript.

Sebagai contoh:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Dengan menggunakan `const` untuk mendeklarasikan variabel x, tipenya dipersempit ke nilai literal tertentu, yaitu 'x'. Karena tipe x dipersempit, nilai tersebut dapat ditetapkan ke variabel y tanpa error.
Tipe tersebut dapat disimpulkan karena variabel `const` tidak dapat ditetapkan ulang, sehingga tipenya dapat dipersempit ke tipe literal tertentu; dalam kasus ini, tipe literal 'x'.

#### Modifier Const pada Parameter Tipe

Mulai TypeScript versi 5.0, atribut `const` dapat ditentukan pada parameter tipe generic. Ini memungkinkan inferensi tipe yang paling presisi. Mari kita lihat contoh tanpa menggunakan `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Seperti yang dapat Anda lihat, properti `a` dan `b` disimpulkan dengan tipe `string`.

Sekarang, mari kita lihat perbedaannya dengan versi `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Sekarang kita dapat melihat bahwa properti `a` dan `b` disimpulkan sebagai string literal, bukan sekadar tipe `string`.

#### Asersi Const

Fitur ini memungkinkan Anda mendeklarasikan variabel dengan tipe literal yang lebih presisi berdasarkan nilai inisialisasinya, yang menandakan kepada compiler bahwa nilai tersebut harus diperlakukan sebagai literal yang immutable. Berikut beberapa contoh:

Pada satu properti:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Pada keseluruhan object:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Hal ini dapat sangat berguna ketika mendefinisikan tipe untuk tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Anotasi Tipe Eksplisit

Kita dapat menentukan dan memberikan tipe secara eksplisit. Dalam contoh berikut, properti `x` bertipe `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Kita dapat membuat anotasi tipe lebih spesifik dengan menggunakan union dari tipe literal:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Penyempitan Tipe

Penyempitan tipe adalah proses dalam TypeScript ketika tipe umum dipersempit menjadi tipe yang lebih spesifik. Hal ini terjadi ketika TypeScript menganalisis kode dan menentukan bahwa kondisi atau operasi tertentu dapat memperjelas informasi tipe.

Penyempitan tipe dapat terjadi dengan berbagai cara, termasuk:

#### Kondisi

Dengan menggunakan pernyataan kondisional, seperti `if` atau `switch`, TypeScript dapat mempersempit tipe berdasarkan hasil kondisi. Sebagai contoh:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Melempar atau Mengembalikan

Melempar error atau mengembalikan nilai lebih awal dari sebuah branch dapat digunakan untuk membantu TypeScript mempersempit tipe. Sebagai contoh:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Cara lain untuk mempersempit tipe dalam TypeScript meliputi:

* Operator `instanceof`: Digunakan untuk memeriksa apakah suatu objek merupakan instance dari class tertentu.
* Operator `in`: Digunakan untuk memeriksa apakah suatu properti terdapat dalam objek.

* Operator `typeof`: Digunakan untuk memeriksa tipe suatu nilai saat runtime.
* Fungsi bawaan seperti `Array.isArray()`: Digunakan untuk memeriksa apakah suatu nilai merupakan array.

#### Union Terdiskriminasi

Menggunakan "Union Terdiskriminasi" adalah sebuah pola dalam TypeScript ketika sebuah "tag" eksplisit ditambahkan ke objek untuk membedakan berbagai tipe di dalam sebuah union. Pola ini juga disebut sebagai "tagged union". Dalam contoh berikut, "tag" direpresentasikan oleh properti "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Type Guard Buatan Pengguna

Dalam kasus ketika TypeScript tidak dapat menentukan suatu tipe, kita dapat menulis fungsi pembantu yang dikenal sebagai "type guard buatan pengguna". Dalam contoh berikut, kita akan menggunakan predikat tipe untuk mempersempit tipe setelah menerapkan pemfilteran tertentu:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Penyempitan switch-true

TypeScript 5.3 menambahkan penyempitan switch-true, yang memungkinkan Anda mengganti rangkaian if/else yang rumit dengan switch (true) menggunakan kondisi boolean. Fitur ini meningkatkan keterbacaan dan tetap mempersempit tipe. Fitur ini serupa dengan pattern matching, tetapi lebih sederhana.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

