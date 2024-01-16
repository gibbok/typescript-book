---
title: Generics
sidebar:
  order: 55
  label: 55. Generics
---


Generics allow you to create reusable components and functions that can work with multiple types. With generics, you can parameterize types, functions, and interfaces, allowing them to operate on different types without explicitly specifying them beforehand.

Generics allow you to make code more flexible and reusable.

### Generic Type

To define a generic type, you use angle brackets (`<>`) to specify the type parameters, for instance:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generic Classes

Generics can be applied also to classes, in this way they can work with multiple types by using type parameters. This is useful to create reusable class definitions that can operate on different data types while maintaining type safety.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Generic Constraints

Generic parameters can be constrained using the `extends` keyword followed by a type or interface that the type parameter must satisfy.

In the following example T it is must containing a properly `length` in order to be valid:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

An interesting feature of generic introduced in version 3.4 RC is Higher order function type inference which introduced  propagated generic type arguments:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

This functionality allows more easily typed safe pointfree style programming which is common in functional programming.

### Generic contextual narrowing

Contextual narrowing for generics is the mechanism in TypeScript that allows the compiler to narrow down the type of a generic parameter based on the context in which it is used, it is useful when working with generic types in conditional statements:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

