---
title: Narrowing
sidebar:
  order: 20
  label: 20. Narrowing
---


TypeScript narrowing is the process of refining the type of a variable within a conditional block. This is useful when working with union types, where a variable can have more than one type.

TypeScript recognizes several ways to narrow the type:

### typeof type guards

The typeof type guard is one specific type guard in TypeScript that checks the type of a variable based on its built-in JavaScript type.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Truthiness narrowing

Truthiness narrowing in TypeScript works by checking whether a variable is truthy or falsy to narrow its type accordingly.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Equality narrowing

Equality narrowing in TypeScript works by checking whether a variable is equal to a specific value or not, to narrow its type accordingly.

It is used in conjunction with `switch` statements and equality operators such as `===`, `!==`, `==`, and `!=` to narrow down types.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### In Operator narrowing

The `in` Operator narrowing in TypeScript is a way to narrow the type of a variable based on whether a property exists within the variable's type.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### instanceof narrowing

The `instanceof` operator narrowing in TypeScript is a way to narrow the type of a variable based on its constructor function, by checking if an object is an instance of a certain class or interface.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

