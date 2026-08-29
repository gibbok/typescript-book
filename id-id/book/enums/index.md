# Enum



Dalam TypeScript, `enum` adalah sekumpulan nilai konstanta bernama.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enum dapat didefinisikan dengan berbagai cara:

### Enum numerik

Dalam TypeScript, Enum Numerik adalah Enum yang setiap konstantanya diberi nilai numerik, dimulai dari 0 secara default.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Nilai kustom dapat ditentukan dengan menetapkannya secara eksplisit:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enum string

Dalam TypeScript, Enum String adalah Enum yang setiap konstantanya diberi nilai string.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Catatan: TypeScript memungkinkan penggunaan Enum heterogen ketika member string dan numerik dapat digunakan bersama.

### Enum konstan

Enum konstan dalam TypeScript adalah jenis Enum khusus yang semua nilainya diketahui pada waktu kompilasi dan disisipkan secara inline di setiap tempat enum digunakan, sehingga menghasilkan kode yang lebih efisien.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Akan dikompilasi menjadi:

```typescript
console.log('EN' /* Language.English */);
```

Catatan:
Const enum memiliki nilai hardcoded, yang menghapus enum, sehingga dapat lebih efisien dalam library mandiri tetapi secara umum tidak diinginkan. Selain itu, const enum tidak dapat memiliki member yang dihitung.

### Pemetaan balik

Dalam TypeScript, pemetaan balik pada Enum mengacu pada kemampuan untuk mengambil nama anggota Enum dari nilainya. Secara default, anggota Enum memiliki pemetaan maju dari nama ke nilai, tetapi pemetaan balik dapat dibuat dengan menetapkan nilai secara eksplisit untuk setiap anggota. Pemetaan balik berguna ketika Anda perlu mencari anggota Enum berdasarkan nilainya, atau ketika Anda perlu mengiterasi semua anggota Enum. Perhatikan bahwa hanya anggota enum numerik yang akan menghasilkan pemetaan balik, sedangkan anggota enum string sama sekali tidak menghasilkan pemetaan balik.

Enum berikut:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Dikompilasi menjadi:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Oleh karena itu, pemetaan nilai ke kunci berfungsi untuk anggota enum numerik, tetapi tidak untuk anggota enum string:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Enum ambient

Enum ambient dalam TypeScript adalah jenis enum yang didefinisikan dalam berkas deklarasi (`*.d.ts`) tanpa implementasi terkait. Enum ini memungkinkan Anda menentukan sekumpulan konstanta bernama yang dapat digunakan dengan aman secara tipe di berbagai berkas tanpa harus mengimpor detail implementasi di setiap berkas.

### Anggota terkomputasi dan konstan

Dalam TypeScript, anggota terkomputasi adalah anggota Enum yang nilainya dihitung saat runtime, sedangkan anggota konstan adalah anggota yang nilainya ditetapkan pada waktu kompilasi dan tidak dapat diubah saat runtime. Anggota terkomputasi diperbolehkan dalam Enum biasa, sedangkan anggota konstan diperbolehkan dalam enum biasa maupun const enum.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Enum dinyatakan sebagai union yang terdiri dari tipe-tipe anggotanya. Nilai setiap anggota dapat ditentukan melalui ekspresi konstan atau nonkonstan, dengan anggota yang memiliki nilai konstan diberi tipe literal. Sebagai ilustrasi, perhatikan deklarasi tipe E dan subtipenya E.A, E.B, dan E.C. Dalam kasus ini, E merepresentasikan union E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

