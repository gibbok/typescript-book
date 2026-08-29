---
title: Interface dan Type
sidebar:
  order: 49
  label: 49. Interface dan Type
---


### Sintaks Umum

Dalam TypeScript, interface mendefinisikan struktur objek dengan menentukan nama dan tipe properti atau metode yang harus dimiliki sebuah objek. Sintaks umum untuk mendefinisikan interface dalam TypeScript adalah sebagai berikut:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Demikian pula untuk definisi tipe:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` atau `type TypeName`: Mendefinisikan nama interface.
`property1`: `Type1`: Menentukan properti interface beserta tipe yang sesuai. Beberapa properti dapat didefinisikan, masing-masing dipisahkan oleh titik koma.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Menentukan metode interface. Metode didefinisikan dengan namanya, diikuti daftar parameter dalam tanda kurung dan tipe kembalian. Beberapa metode dapat didefinisikan, masing-masing dipisahkan oleh titik koma.

Contoh interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Contoh type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

Dalam TypeScript, tipe digunakan untuk mendefinisikan bentuk data dan menerapkan pemeriksaan tipe. Ada beberapa sintaks umum untuk mendefinisikan tipe dalam TypeScript, bergantung pada kasus penggunaan tertentu. Berikut beberapa contohnya:

### Tipe Dasar

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objek dan Interface

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Tipe Union dan Intersection

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

