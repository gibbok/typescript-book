---
title: Interfaz y tipo
sidebar:
  order: 50
  label: 50. Interfaz y tipo
---


### Sintaxis habitual

En TypeScript, las interfaces definen la estructura de los objetos y especifican los nombres y tipos de las propiedades o métodos que deben tener. La sintaxis habitual para definir una interfaz es la siguiente:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

La definición de tipos utiliza una sintaxis similar:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` o `type TypeName`: define el nombre de la interfaz.
`property1`: `Type1`: especifica las propiedades de la interfaz y sus tipos correspondientes. Pueden definirse varias propiedades separadas por punto y coma.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: especifica los métodos de la interfaz. Se definen con su nombre, una lista de parámetros entre paréntesis y el tipo de retorno. Pueden definirse varios métodos separados por punto y coma.

Ejemplo de interfaz:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Ejemplo de tipo:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

En TypeScript, los tipos definen la forma de los datos y aplican la comprobación de tipos. Existen varias sintaxis habituales según el caso de uso. Estos son algunos ejemplos:

### Tipos básicos

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objetos e interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Tipos de unión e intersección

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

