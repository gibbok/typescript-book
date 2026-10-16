---
title: Interfejs i typ
sidebar:
  order: 49
  label: 49. Interfejs i typ
---


### Podstawowa składnia

W TypeScript interfejsy definiują strukturę obiektów, określając nazwy i typy właściwości lub metod, które musi mieć dany obiekt. Podstawowa składnia definiowania interfejsu w TypeScript wygląda następująco:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Podobnie wygląda definicja typu:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` lub `type TypeName`: definiuje nazwę interfejsu lub typu.
`property1: Type1`: określa właściwości interfejsu wraz z odpowiadającymi im typami. Można zdefiniować wiele właściwości, oddzielając każdą z nich średnikiem.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: określa metody interfejsu. Metody definiuje się za pomocą ich nazw, po których następuje ujęta w nawiasy lista parametrów oraz typ zwracany. Można zdefiniować wiele metod, oddzielając każdą z nich średnikiem.

Przykład interfejsu:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Przykład typu:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

W TypeScript typy służą do definiowania kształtu danych i wymuszania kontroli typów. Istnieje kilka często używanych składni definiowania typów w TypeScript, zależnie od konkretnego przypadku użycia. Oto kilka przykładów:

### Typy podstawowe

```typescript
let myNumber: number = 123; // typ number
let myBoolean: boolean = true; // typ boolean
let myArray: string[] = ['a', 'b']; // tablica ciągów znaków
let myTuple: [string, number] = ['a', 123]; // krotka
```

### Obiekty i interfejsy

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Typy sumy i przecięcia

```typescript
type MyType = string | number; // Typ unii
let myUnion: MyType = 'hello'; // Może być ciągiem znaków
myUnion = 123; // Lub liczbą

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Typ przecięcia
let myCombined: CombinedType = { name: 'John', age: 25 }; // Obiekt z właściwościami name i age
```

