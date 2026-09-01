---
title: Arayüz ve Tür
sidebar:
  order: 49
  label: 49. Arayüz ve Tür
---


### Yaygın Sözdizimi

TypeScript'te arayüzler, bir nesnenin sahip olması gereken özelliklerin veya metotların adlarını ve türlerini belirterek nesnelerin yapısını tanımlar. TypeScript'te arayüz tanımlamak için yaygın sözdizimi şöyledir:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Tür tanımı için de benzer şekilde:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` veya `type TypeName`: Arayüzün adını tanımlar.
`property1`: `Type1`: Arayüzün özelliklerini karşılık gelen türleriyle birlikte belirtir. Her biri noktalı virgülle ayrılan birden fazla özellik tanımlanabilir.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Arayüzün metotlarını belirtir. Metotlar; adları, ardından parantez içindeki parametre listesi ve dönüş türüyle tanımlanır. Her biri noktalı virgülle ayrılan birden fazla metot tanımlanabilir.

Arayüz örneği:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Tür örneği:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

TypeScript'te türler, verilerin şeklini tanımlamak ve tür denetimini zorunlu kılmak için kullanılır. Belirli kullanım durumuna bağlı olarak TypeScript'te tür tanımlamak için birkaç yaygın sözdizimi vardır. İşte bazı örnekler:

### Temel Türler

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Nesneler ve Arayüzler

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Birleşim ve Kesişim Türleri

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

