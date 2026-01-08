---
title: Interface and Type
sidebar:
  order: 48
  label: 48. Interface and Type
---


### Common Syntax

In TypeScript, interfaces define the structure of objects, specifying the names and types of properties or methods that an object must have. The common syntax for defining an interface in TypeScript is as follows:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Similarly for type definition:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` or `type TypeName`: Defines the name of the interface.
`property1`: `Type1`: Specifies the properties of the interface along with their corresponding types. Multiple properties can be defined, each separated by a semicolon.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Specifies the methods of the interface. Methods are defined with their names, followed by a parameter list in parentheses and the return type. Multiple methods can be defined, each separated by a semicolon.

Example interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Example of type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

In TypeScript, types are used to define the shape of data and enforce type checking. There are several common syntaxes for defining types in TypeScript, depending on the specific use case. Here are some examples:

### Basic Types

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objects and Interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Union and Intersection Types

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

