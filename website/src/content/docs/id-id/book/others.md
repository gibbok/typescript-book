---
title: Lain-lain
sidebar:
  order: 62
  label: 62. Lain-lain
---


### Error dan Penanganan Exception

TypeScript memungkinkan Anda menangkap dan menangani galat menggunakan mekanisme penanganan galat standar JavaScript:

Blok Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Anda juga dapat menangani berbagai tipe galat:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

Tipe Galat Kustom:

Galat yang lebih spesifik dapat ditentukan dengan memperluas class `Error`:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Class Mixin

Kelas mixin memungkinkan Anda menggabungkan dan menyusun perilaku dari beberapa kelas ke dalam satu kelas. Kelas ini menyediakan cara untuk menggunakan kembali dan memperluas fungsionalitas tanpa memerlukan rantai pewarisan yang mendalam.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Fitur Bahasa Asinkron

Karena TypeScript merupakan superset dari JavaScript, TypeScript memiliki fitur bahasa asinkron bawaan JavaScript seperti:

Promise:

Promise adalah cara untuk menangani operasi asinkron beserta hasilnya menggunakan metode seperti `.then()` dan `.catch()` guna menangani kondisi berhasil maupun galat.

Pelajari lebih lanjut: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Kata kunci `async`/`await` menyediakan sintaks yang tampak lebih sinkron untuk bekerja dengan Promise. Kata kunci `async` digunakan untuk mendefinisikan fungsi asinkron, sedangkan kata kunci `await` digunakan di dalam fungsi `async` untuk menjeda eksekusi hingga sebuah Promise diselesaikan atau ditolak.

Pelajari lebih lanjut:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

API berikut didukung dengan baik di TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Worker:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Worker:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iterator dan Generator

Iterator dan generator sama-sama didukung dengan baik di TypeScript.

Iterator adalah objek yang mengimplementasikan protokol iterator, yang menyediakan cara untuk mengakses elemen dari koleksi atau urutan satu per satu. Iterator merupakan struktur yang berisi penunjuk ke elemen berikutnya dalam iterasi. Iterator memiliki metode `next()` yang mengembalikan nilai berikutnya dalam urutan beserta nilai boolean yang menunjukkan apakah urutan tersebut sudah `done`.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Generator adalah fungsi khusus yang didefinisikan menggunakan sintaks `function*` yang menyederhanakan pembuatan iterator. Generator menggunakan kata kunci `yield` untuk mendefinisikan urutan nilai serta secara otomatis menjeda dan melanjutkan eksekusi ketika nilai diminta.

Generator mempermudah pembuatan iterator dan sangat berguna untuk bekerja dengan urutan besar atau tak terbatas.

Contoh:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript juga mendukung iterator asinkron dan generator asinkron.

Pelajari lebih lanjut:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Referensi TsDocs JSDoc

Saat bekerja dengan basis kode JavaScript, Anda dapat membantu TypeScript menginferensi tipe yang tepat menggunakan komentar JSDoc beserta anotasi tambahan yang menyediakan informasi tipe.

Contoh:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Dokumentasi lengkap tersedia di tautan berikut:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Sejak versi 3.7, definisi tipe `.d.ts` dapat dibuat dari sintaks JSDoc JavaScript.
Informasi lebih lanjut dapat ditemukan di sini:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Paket dalam organisasi `@types` adalah konvensi penamaan paket khusus yang digunakan untuk menyediakan definisi tipe bagi pustaka atau modul JavaScript yang sudah ada. Misalnya, menggunakan:

```shell
npm install --save-dev @types/lodash
```

akan menginstal definisi tipe `lodash` di proyek Anda saat ini.

Untuk berkontribusi pada definisi tipe suatu paket `@types`, silakan kirim pull request ke [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) adalah ekstensi sintaks bahasa JavaScript yang memungkinkan Anda menulis kode menyerupai HTML di dalam berkas JavaScript atau TypeScript. JSX umumnya digunakan di React untuk mendefinisikan struktur HTML.

TypeScript memperluas kemampuan JSX dengan menyediakan pemeriksaan tipe dan analisis statis.

Untuk menggunakan JSX, Anda perlu menetapkan opsi kompiler `jsx` dalam berkas `tsconfig.json`. Dua opsi konfigurasi yang umum:

* `"preserve"`: menghasilkan berkas `.jsx` dengan JSX yang tidak diubah. Opsi ini memberi tahu TypeScript untuk mempertahankan sintaks JSX apa adanya dan tidak mentransformasinya selama proses kompilasi. Anda dapat menggunakan opsi ini jika memiliki alat terpisah, seperti Babel, yang menangani transformasi tersebut.
* `"react"`: mengaktifkan transformasi JSX bawaan TypeScript. `React.createElement` akan digunakan.

Semua opsi tersedia di sini:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Modul ES6

TypeScript mendukung ES6 (ECMAScript 2015) dan banyak versi berikutnya. Artinya, Anda dapat menggunakan sintaks ES6, seperti fungsi panah, literal templat, kelas, modul, destructuring, dan lainnya.

Untuk mengaktifkan fitur ES6 dalam proyek, Anda dapat menentukan properti `target` di `tsconfig.json`.

Contoh konfigurasi:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Operator Eksponensiasi ES7

Operator eksponensial (`**`) menghitung nilai yang diperoleh dengan memangkatkan operand pertama dengan operand kedua. Fungsinya serupa dengan `Math.pow()`, tetapi memiliki kemampuan tambahan untuk menerima BigInt sebagai operand.
TypeScript sepenuhnya mendukung operator ini dengan menetapkan `target` dalam berkas `tsconfig.json` ke `es2016` atau lebih tinggi.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Pernyataan for-await-of

Ini adalah fitur JavaScript yang didukung sepenuhnya di TypeScript dan memungkinkan Anda melakukan iterasi atas objek iterable asinkron dengan versi target `es2018`.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Meta-properti new target

Anda dapat menggunakan meta-properti `new.target` dalam TypeScript, yang memungkinkan Anda menentukan apakah suatu fungsi atau konstruktor dipanggil menggunakan operator `new`. Meta-properti ini memungkinkan Anda mendeteksi apakah sebuah objek dibuat sebagai hasil dari pemanggilan konstruktor.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Ekspresi Import Dinamis

Modul dapat dimuat secara kondisional atau secara malas sesuai permintaan menggunakan proposal impor dinamis ECMAScript yang didukung di TypeScript.

Sintaks untuk ekspresi impor dinamis dalam TypeScript adalah sebagai berikut:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Perintah ini menjalankan kompiler TypeScript dengan parameter `--watch`, sehingga berkas TypeScript dapat dikompilasi ulang secara otomatis setiap kali diubah.

```shell
tsc --watch
```

Sejak TypeScript versi 4.9, pemantauan berkas terutama mengandalkan peristiwa sistem berkas dan secara otomatis beralih ke polling jika pemantau berbasis peristiwa tidak dapat dibuat.

### Operator Asersi Non-null

Operator asersi non-null (postfix `!`), yang juga disebut asersi penetapan pasti, adalah fitur TypeScript yang memungkinkan Anda menegaskan bahwa variabel atau properti bukan `null` atau `undefined`, meskipun analisis tipe statis TypeScript menunjukkan bahwa nilainya mungkin demikian. Dengan fitur ini, pemeriksaan eksplisit dapat dihilangkan.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Deklarasi dengan nilai default

Deklarasi dengan nilai default digunakan ketika variabel atau parameter diberi nilai default. Artinya, jika tidak ada nilai yang diberikan untuk variabel atau parameter tersebut, nilai default akan digunakan.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Optional Chaining

Operator optional chaining `?.` bekerja seperti operator titik biasa (`.`) untuk mengakses properti atau metode. Namun, operator ini menangani nilai null atau undefined dengan baik, yaitu dengan mengakhiri ekspresi dan mengembalikan `undefined`, alih-alih melempar galat.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Operator Nullish Coalescing

Operator nullish coalescing `??` mengembalikan nilai di sisi kanan jika sisi kiri bernilai `null` atau `undefined`; jika tidak, operator ini mengembalikan nilai di sisi kiri.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Tipe Template Literal

Tipe literal templat memungkinkan Anda memanipulasi nilai string pada tingkat tipe dan menghasilkan tipe string baru berdasarkan tipe yang sudah ada. Tipe ini berguna untuk membuat tipe yang lebih ekspresif dan presisi dari operasi berbasis string.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Overload fungsi

Overload fungsi memungkinkan Anda mendefinisikan beberapa signature fungsi untuk nama fungsi yang sama, masing-masing dengan tipe parameter dan tipe kembalian yang berbeda.
Saat Anda memanggil fungsi yang di-overload, TypeScript menggunakan argumen yang diberikan untuk menentukan signature fungsi yang benar:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Tipe Rekursif

Tipe rekursif adalah tipe yang dapat merujuk pada dirinya sendiri. Tipe ini berguna untuk mendefinisikan struktur data yang memiliki struktur hierarkis atau rekursif (dengan kemungkinan bersarang tanpa batas), seperti linked list, tree, dan graph.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Tipe Kondisional Rekursif

Kita dapat mendefinisikan relasi tipe yang kompleks menggunakan logika dan rekursi dalam TypeScript.
Mari kita uraikan dengan istilah sederhana:

Tipe kondisional memungkinkan Anda mendefinisikan tipe berdasarkan kondisi boolean:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Rekursi berarti definisi tipe yang merujuk pada dirinya sendiri di dalam definisinya:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Tipe kondisional rekursif menggabungkan logika kondisional dan rekursi. Artinya, sebuah definisi tipe dapat bergantung pada dirinya sendiri melalui logika kondisional, sehingga menciptakan relasi tipe yang kompleks dan fleksibel.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Dukungan Modul ECMAScript di Node

Node.js menambahkan dukungan untuk modul ECMAScript mulai versi 15.3.0, dan TypeScript telah memiliki dukungan modul ECMAScript untuk Node.js sejak versi 4.7. Dukungan ini dapat diaktifkan dengan menggunakan properti `module` bernilai `nodenext` dalam berkas `tsconfig.json`. Berikut contohnya:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js mendukung dua ekstensi berkas untuk modul: `.mjs` untuk modul ES dan `.cjs` untuk modul CommonJS. Ekstensi berkas yang setara dalam TypeScript adalah `.mts` untuk modul ES dan `.cts` untuk modul CommonJS. Ketika kompiler TypeScript melakukan transpilasi berkas-berkas ini ke JavaScript, kompiler akan membuat berkas `.mjs` dan `.cjs`.

Jika ingin menggunakan modul ES dalam proyek, Anda dapat mengatur properti `type` menjadi `"module"` dalam berkas `package.json`. Hal ini menginstruksikan Node.js untuk memperlakukan proyek tersebut sebagai proyek modul ES.

Selain itu, TypeScript juga mendukung deklarasi tipe dalam berkas `.d.ts`. Berkas deklarasi ini menyediakan informasi tipe untuk pustaka atau modul yang ditulis dalam TypeScript, sehingga pengembang lain dapat memanfaatkannya dengan fitur pemeriksaan tipe dan pelengkapan otomatis TypeScript.

### Fungsi Asersi

Dalam TypeScript, fungsi asersi adalah fungsi yang menunjukkan bahwa suatu kondisi tertentu telah diverifikasi berdasarkan nilai kembaliannya. Dalam bentuk paling sederhana, fungsi `assert` memeriksa predikat yang diberikan dan memunculkan galat ketika predikat tersebut bernilai `false`.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Atau, fungsi tersebut dapat dideklarasikan sebagai ekspresi fungsi:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Fungsi asersi memiliki kesamaan dengan type guard. Type guard pada awalnya diperkenalkan untuk melakukan pemeriksaan saat runtime dan memastikan tipe suatu nilai dalam cakupan tertentu.
Secara khusus, type guard adalah fungsi yang mengevaluasi predikat tipe dan mengembalikan nilai boolean yang menunjukkan apakah predikat tersebut `true` atau `false`. Hal ini sedikit berbeda dari fungsi asersi, yang dimaksudkan untuk memunculkan galat alih-alih mengembalikan `false` ketika predikat tidak terpenuhi.

Contoh type guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Tipe Tuple Variadik

Tipe tuple variadik adalah fitur yang diperkenalkan dalam TypeScript versi 4.0. Jadi, mari kita mulai dengan meninjau kembali apa itu tuple:

Tipe tuple adalah array dengan panjang yang telah ditentukan, dan tipe setiap elemennya diketahui:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Istilah "variadik" berarti aritas tak tentu (menerima jumlah argumen yang bervariasi).

Tuple variadik adalah tipe tuple yang memiliki semua properti seperti sebelumnya, tetapi bentuk persisnya belum ditentukan:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Dalam kode sebelumnya, kita dapat melihat bahwa bentuk tuple ditentukan oleh generik `T` yang diberikan.

Tuple variadik dapat menerima beberapa generik, sehingga sangat fleksibel:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Dengan tuple variadik baru, kita dapat menggunakan:

* Elemen spread dalam sintaks tipe tuple kini dapat berupa generik, sehingga kita dapat merepresentasikan operasi tingkat tinggi pada tuple dan array bahkan ketika kita tidak mengetahui tipe sebenarnya yang sedang kita operasikan.
* Elemen rest dapat muncul di posisi mana pun dalam tuple.

Contoh:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Tipe Boxed

Tipe boxed merujuk pada objek pembungkus yang digunakan untuk merepresentasikan tipe primitif sebagai objek. Objek pembungkus ini menyediakan fungsionalitas dan metode tambahan yang tidak tersedia secara langsung pada nilai primitif.

Ketika Anda mengakses metode seperti `charAt` atau `normalize` pada primitif `string`, JavaScript membungkusnya dalam objek `String`, memanggil metode tersebut, lalu membuang objek itu.

Demonstrasi:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript merepresentasikan perbedaan ini dengan menyediakan tipe terpisah untuk tipe primitif dan objek pembungkus yang sesuai:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Tipe boxed biasanya tidak diperlukan. Hindari penggunaan tipe boxed dan gunakan tipe primitif sebagai gantinya, misalnya `string` alih-alih `String`.

### Kovarians dan Kontravarians dalam TypeScript

Kovariansi dan kontravariansi menjelaskan bagaimana relasi tipe berperilaku dalam tipe generik.

Dalam TypeScript:

* Array bersifat **kovarian**, tetapi tidak sepenuhnya aman secara tipe.
* Tipe parameter fungsi bersifat:
  * **kontravarian** ketika `strictFunctionTypes` diaktifkan
  * **bivarian** dalam kondisi lainnya

Kovariansi berarti relasinya dipertahankan: jika tipe A adalah subtipe dari tipe B, maka `F<A>` juga merupakan subtipe dari `F<B>`. Dalam TypeScript, hal ini umumnya muncul dalam tipe kembalian dan array (meskipun kovariansi array tidak sepenuhnya aman secara tipe).

Kontravariansi berarti relasinya dibalik: jika tipe A adalah subtipe dari tipe B, maka `F<B>` merupakan subtipe dari `F<A>`. Dalam TypeScript, tipe parameter fungsi dimaksudkan untuk bersifat kontravarian, yang berarti fungsi yang menerima tipe lebih luas dapat digunakan ketika tipe yang lebih sempit diharapkan.

Namun, dalam praktiknya, TypeScript sering mengizinkan bivarians untuk parameter fungsi (kecuali `strictFunctionTypes` diaktifkan), yang berarti kedua arah mungkin diterima meskipun tidak sepenuhnya aman secara tipe.

Contoh: Bayangkan sebuah ruang untuk semua hewan dan ruang terpisah khusus untuk anjing.

* **Kovariansi**:  
  Anda dapat menggunakan “ruang anjing” ketika “ruang hewan” diharapkan, karena semua anjing adalah hewan.  
  Namun, Anda tidak dapat menggunakan “ruang hewan” ketika “ruang anjing” diharapkan, karena ruang tersebut mungkin berisi hewan yang bukan anjing.

* **Kontravariansi** (pikirkan dalam konteks fungsi):  
  Jika Anda memiliki sesuatu yang dapat menangani **hewan apa pun**, Anda dapat menggunakannya ketika sesuatu yang menangani **hanya anjing** diharapkan.  
  Namun, tidak sebaliknya.

Contoh kovariansi:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

Contoh kontravariansi:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Anotasi Varians Opsional untuk Parameter Tipe

Mulai TypeScript 4.7.0, kita dapat menggunakan kata kunci `out` dan `in` untuk menentukan anotasi varians.

Untuk kovariansi, gunakan kata kunci `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Untuk kontravariansi, gunakan kata kunci `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Index Signature Pola Template String

Index signature pola template string memungkinkan kita mendefinisikan index signature yang fleksibel menggunakan pola template string. Fitur ini memungkinkan kita membuat objek yang dapat diindeks dengan pola kunci string tertentu, sehingga memberikan kontrol dan kekhususan lebih besar ketika mengakses dan memanipulasi properti.

Mulai versi 4.4, TypeScript memungkinkan index signature untuk simbol dan pola template string.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Operator satisfies

Operator `satisfies` memungkinkan Anda memeriksa apakah tipe tertentu memenuhi antarmuka atau kondisi tertentu. Dengan kata lain, operator ini memastikan bahwa suatu tipe memiliki semua properti dan metode yang diperlukan oleh antarmuka tertentu. Ini adalah cara untuk memastikan sebuah variabel sesuai dengan definisi suatu tipe.
Berikut contohnya:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Import dan Export Khusus Tipe

Impor dan ekspor khusus tipe memungkinkan Anda mengimpor atau mengekspor tipe tanpa mengimpor atau mengekspor nilai atau fungsi yang terkait dengan tipe tersebut. Hal ini dapat berguna untuk mengurangi ukuran bundel Anda.

Untuk menggunakan impor khusus tipe, Anda dapat menggunakan kata kunci `import type`.

TypeScript mengizinkan penggunaan ekstensi berkas deklarasi dan implementasi (`.ts`, `.mts`, `.cts`, dan `.tsx`) dalam impor khusus tipe, terlepas dari pengaturan `allowImportingTsExtensions`.

Sebagai contoh:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Bentuk-bentuk berikut didukung:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Deklarasi using dan Pengelolaan Sumber Daya Eksplisit

Deklarasi `using` adalah binding imutabel dengan cakupan blok, serupa dengan `const`, yang digunakan untuk mengelola sumber daya yang dapat di-dispose. Ketika diinisialisasi dengan sebuah nilai, metode `Symbol.dispose` dari nilai tersebut dicatat dan kemudian dijalankan saat keluar dari cakupan blok yang mengapitnya.

Hal ini didasarkan pada fitur Pengelolaan Sumber Daya ECMAScript, yang berguna untuk menjalankan tugas pembersihan penting setelah objek dibuat, seperti menutup koneksi, menghapus berkas, dan membebaskan memori.

Catatan:

* Karena baru diperkenalkan dalam TypeScript versi 5.2, sebagian besar runtime belum memiliki dukungan bawaan. Anda akan memerlukan polyfill untuk: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Selain itu, Anda perlu mengonfigurasi `tsconfig.json` sebagai berikut:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Contoh:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

Kode tersebut akan menampilkan:

```shell
1
2
disposed
3
```

Sumber daya yang dapat di-dispose harus mematuhi antarmuka `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Deklarasi `using` mencatat operasi disposal sumber daya dalam sebuah stack, sehingga sumber daya di-dispose dalam urutan deklarasi terbalik:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Sumber daya dijamin akan di-dispose, bahkan jika kode berikutnya dijalankan atau terjadi exception. Hal ini dapat menyebabkan proses disposal memunculkan exception yang mungkin menekan exception lainnya. Untuk mempertahankan informasi tentang galat yang ditekan, exception bawaan baru, `SuppressedError`, diperkenalkan.

#### Deklarasi await using

Deklarasi `await using` menangani sumber daya yang dapat di-dispose secara asinkron. Nilainya harus memiliki metode `Symbol.asyncDispose`, yang akan ditunggu dengan `await` pada akhir blok.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Sumber daya yang dapat di-dispose secara asinkron harus mematuhi antarmuka `Disposable` atau `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

Kode tersebut menampilkan:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Deklarasi `using` dan `await using` diizinkan dalam pernyataan: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Atribut Import

Atribut impor TypeScript 5.3 (label untuk impor) memberi tahu runtime cara menangani modul (JSON, dan sebagainya). Hal ini meningkatkan keamanan dengan memastikan impor yang jelas dan selaras dengan Content Security Policy (CSP) untuk pemuatan sumber daya yang lebih aman. TypeScript memastikan atribut tersebut valid, tetapi menyerahkan interpretasinya kepada runtime untuk penanganan modul tertentu.

Contoh:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

dengan impor dinamis:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Pemeriksaan Sintaks Ekspresi Reguler

Sejak TypeScript 5.5.4, TypeScript memeriksa literal regex untuk galat umum pada saat kompilasi (misalnya sintaks yang tidak valid, backreference yang salah, dan fitur yang tidak didukung untuk versi JS target Anda). Hal ini membantu menemukan bug lebih awal, tetapi tidak memeriksa string `new RegExp("...")`.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` memungkinkan Anda memuat modul tetapi menunda eksekusinya hingga Anda benar-benar menggunakan sesuatu dari modul tersebut. Hal ini membantu menghindari pekerjaan dan efek samping yang tidak diperlukan.

* Hanya berfungsi dengan: `import defer * as name from "module"`
* Kode hanya berjalan ketika Anda mengakses ekspor
