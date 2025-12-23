---
title: Interfaccia e tipo
sidebar:
  order: 48
  label: 48. Interfaccia e tipo
---


### Sintassi comune

In TypeScript, le interfacce definiscono la struttura degli oggetti, specificando i nomi e i tipi di proprietà o metodi che un oggetto deve avere. La sintassi comune per definire un'interfaccia in TypeScript è la seguente:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Analogamente per la definizione del tipo:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` o `type TypeName`: Definisce il nome dell'interfaccia.
`property1`: `Type1`: Specifica le proprietà dell'interfaccia insieme ai tipi corrispondenti. È possibile definire più proprietà, ciascuna separata da un punto e virgola.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Specifica i metodi dell'interfaccia. I metodi sono definiti con i loro nomi, seguiti da un elenco di parametri tra parentesi e dal tipo di ritorno. È possibile definire più metodi, ciascuno separato da un punto e virgola.

Esempio di interfaccia:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Esempio di tipo:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

In TypeScript, i tipi vengono utilizzati per definire la forma dei dati e applicare il controllo dei tipi. Esistono diverse sintassi comuni per la definizione dei tipi in TypeScript, a seconda del caso d'uso specifico. Ecco alcuni esempi:

### Tipi di base

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array di stringhe
let myTuple: [string, number] = ['a', 123]; // tupla
```

### Oggetti e interfacce

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Tipi di unione e intersezione

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with name and age properties
```

