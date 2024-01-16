---
title: Merging and Extension
sidebar:
  order: 52
  label: 52. Merging and Extension
---


Merging and extension refer to two different concepts related to working with types and interfaces.

Merging allows you to combine multiple declarations of the same name into a single definition, for example, when you define an interface with the same name multiple times:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Extension refers to the ability to extend or inherit from existing types or interfaces to create new ones. It is a mechanism to add additional properties or methods to an existing type without modifying its original definition. Example:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

