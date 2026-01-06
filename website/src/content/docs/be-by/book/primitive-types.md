---
title: Primitive Types
sidebar:
  order: 10
  label: 10. Primitive Types
---


TypeScript supports 7 primitive types. A primitive data type refers to a type that is not an object and does not have any methods associated with it. In TypeScript, all primitive types are immutable, meaning their values cannot be changed once they are assigned.

### string

The `string` primitive type stores textual data, and the value is always double or single-quoted.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Strings can span multiple lines if surrounded by the backtick (`) character:

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

The `boolean` data type in TypeScript stores a binary value, either `true` or `false`.

```typescript
const isReady: boolean = true;
```

### number

A `number` data type in TypeScript is represented with a 64-bit floating point value. A `number` type can represent integers and fractions.
TypeScript also supports hexadecimal, binary, and octal, for instance:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigInt

A `bigInt` represents numeric values that are very large (253 – 1) and cannot be represented with a `number`.

A `bigInt` can be created by calling the built-in function `BigInt()` or by adding `n` to the end of any integer numeric literal:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Notes:

* `bigInt` values cannot be mixed with `number` and cannot be used with built-in `Math`, they must be coerced to the same type.
* `bigInt` values are available only if target configuration is ES2020 or higher.

### Symbol

Symbols are unique identifiers that can be used as property keys in objects to prevent naming conflicts.

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

### null and undefined

`null` and `undefined` types both represent no value or the absence of any value.

The `undefined` type means the value is not assigned or initialized or indicates an unintentional absence of value.

The `null` type means that we know that the field does not have a value, so value is unavailable, it indicates an intentional absence of value.

### Array

An `array` is a data type that can store multiple values of the same type or not. It can be defined using the following syntax:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript supports readonly arrays using the following syntax:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript supports tuple and readonly tuple:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

The `any` data type represents literally "any" value, it is the default value when TypeScript cannot infer the type or is not specified.

When using `any` TypeScript compiler skips the type checking so there is no type safety when `any` is being used. Generally do not use `any` to silence the compiler when an error occurs, instead focus on fixing the error as with using `any`  it is possible to break contracts and we lose the benefits of TypeScript autocomplete.

The `any` type could be useful during a gradual migration from JavaScript to TypeScript, as it can silence the compiler.

For new projects use TypeScript configuration `noImplicitAny` which enables TypeScript to issue errors where `any` is used or inferred.

The `any`type  is usually a source of errors which can mask real problems with your types. Avoid using it as much as possible.

