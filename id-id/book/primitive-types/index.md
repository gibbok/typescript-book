# Tipe Primitif



TypeScript mendukung 7 tipe primitif. Tipe data primitif merujuk pada tipe yang bukan merupakan objek dan tidak memiliki metode apa pun yang terkait dengannya. Dalam TypeScript, semua tipe primitif bersifat immutable, yang berarti nilainya tidak dapat diubah setelah ditetapkan.

### string

Tipe primitif `string` menyimpan data tekstual, dan nilainya selalu diapit tanda kutip ganda atau tunggal.

```typescript
const x: string = 'x';
const y: string = 'y';
```

String dapat mencakup beberapa baris jika diapit oleh karakter backtick (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Tipe data `boolean` dalam TypeScript menyimpan nilai biner, yaitu `true` atau `false`.

```typescript
const isReady: boolean = true;
```

### number

Tipe data `number` dalam TypeScript direpresentasikan dengan nilai floating-point 64-bit. Tipe `number` dapat merepresentasikan bilangan bulat dan pecahan.
TypeScript juga mendukung bilangan heksadesimal, biner, dan oktal, misalnya:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

`bigint` merepresentasikan nilai bilangan bulat yang dapat lebih besar daripada bilangan bulat aman maksimum yang didukung oleh `number`, yaitu 2^53 - 1.

`bigint` dapat dibuat dengan memanggil fungsi bawaan `BigInt()` atau dengan menambahkan `n` di akhir literal numerik bilangan bulat apa pun:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Catatan:

* Nilai `bigint` tidak dapat dicampur dengan `number` dan tidak dapat digunakan dengan `Math` bawaan; nilai-nilai tersebut harus dikonversi ke tipe yang sama.
* Nilai `bigint` hanya tersedia jika konfigurasi target adalah ES2020 atau yang lebih tinggi.

### Symbol

Symbol adalah pengidentifikasi unik yang dapat digunakan sebagai kunci properti dalam objek untuk mencegah konflik penamaan.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null dan undefined

Tipe `null` dan `undefined` sama-sama merepresentasikan ketiadaan nilai atau tidak adanya nilai apa pun.

Tipe `undefined` berarti nilai belum ditetapkan atau diinisialisasi, atau menunjukkan ketiadaan nilai yang tidak disengaja.

Tipe `null` berarti kita mengetahui bahwa field tersebut tidak memiliki nilai, sehingga nilainya tidak tersedia, dan ini menunjukkan ketiadaan nilai yang disengaja.

### Array

`array` adalah tipe data yang dapat menyimpan beberapa nilai dengan tipe yang sama atau berbeda. Array dapat didefinisikan menggunakan sintaks berikut:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript mendukung array readonly menggunakan sintaks berikut:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript mendukung tuple dan tuple readonly:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Tipe data `any` secara harfiah merepresentasikan "sembarang" nilai dan merupakan tipe default ketika TypeScript tidak dapat menginferensi tipe atau ketika tipe tidak ditentukan.

Saat menggunakan `any`, compiler TypeScript melewati pemeriksaan tipe, sehingga tidak ada keamanan tipe ketika `any` digunakan. Secara umum, jangan gunakan `any` untuk membungkam compiler saat terjadi error; sebaliknya, berfokuslah untuk memperbaiki error tersebut, karena penggunaan `any` memungkinkan kontrak dilanggar dan manfaat autocomplete TypeScript hilang.

Tipe `any` dapat berguna selama migrasi bertahap dari JavaScript ke TypeScript, karena tipe ini dapat membungkam compiler.

Untuk proyek baru, gunakan konfigurasi TypeScript `noImplicitAny`, yang memungkinkan TypeScript melaporkan error ketika `any` digunakan atau diinferensi.

Tipe `any` biasanya menjadi sumber error yang dapat menyamarkan masalah sebenarnya pada tipe Anda. Hindari menggunakannya sebisa mungkin.

