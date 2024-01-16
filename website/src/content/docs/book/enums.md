---
title: Enums
sidebar:
  order: 19
  label: 19. Enums
---


In TypeScript, an `enum` is a set of named constant values.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enums can be defined in different ways:

### Numeric enums

In TypeScript, a Numeric Enum is an Enum where each constant is assigned a numeric value, starting from 0 by default.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

It is possible to specify custom values by explicitly assigning them:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### String enums

In TypeScript, a String enum is an Enum where each constant is assigned a string value.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Note: TypeScript allows the usage of heterogeneous Enums where string and numeric members can coexist.

### Constant enums

A constant enum in TypeScript is a special type of Enum where all the values are known at compile time and are inlined wherever the enum is used, resulting in more efficient code.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Will be compiled into:

```typescript
console.log('EN' /* Language.English */);
```

Notes:
Const Enums have hardcoded values, erasing the Enum, which can be more efficient in self-contained libraries but is generally not desirable. Also, Const enums cannot have computed members.

### Reverse mapping

In TypeScript, reverse mappings in Enums refer to the ability to retrieve the Enum member name from its value. By default, Enum members have forward mappings from name to value, but reverse mappings can be created by explicitly setting values for each member. Reverse mappings are useful when you need to look up an Enum member by its value, or when you need to iterate over all the Enum members. Note that only numeric enums members will generate reverse mappings, while String Enum members do not get a reverse mapping generated at all.

The following enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Compiles to:

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

Therefore, mapping values to keys works for numeric enum members, but not for string enum members:

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

### Ambient enums

An ambient enum in TypeScript is a type of Enum that is defined in a declaration file (*.d.ts) without an associated implementation. It allows you to define a set of named constants that can be used in a type-safe way across different files without having to import the implementation details in each file.

### Computed and constant members

In TypeScript, a computed member is a member of an Enum that has a value calculated at runtime, while a constant member is a member whose value is set at compile-time and cannot be changed during runtime. Computed members are allowed in regular Enums, while constant members are allowed in both regular and const enums.

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

Enums are denoted by unions comprising their member types. The values of each member can be determined through constant or non-constant expressions, with members possessing constant values being assigned literal types. To illustrate, consider the declaration of type E and its subtypes E.A, E.B, and E.C. In this case, E represents the union E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

