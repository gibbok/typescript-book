---
title: Differences between Type and Interface
sidebar:
  order: 53
  label: 53. Differences between Type and Interface
---


Declaration merging (augmentation):

Interfaces support declaration merging, which means that you can define multiple interfaces with the same name, and TypeScript will merge them into a single interface with the combined properties and methods. On the other hand, types do not support declaration merging. This can be helpful when you want to add extra functionality or customize existing types without modifying the original definitions or patching missing or incorrect types.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Extending other types/interfaces:

Both types and interfaces can extend other types/interfaces, but the syntax is different. With interfaces, you use the `extends` keyword to inherit properties and methods from other interfaces. However, an interface cannot extend a complex type like a union type.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

For types, you use the & operator to combine multiple types into a single type (intersection).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Union and Intersection Types:

Types are more flexible when it comes to defining Union and Intersection Types. With the `type` keyword, you can easily create union types using the `|` operator and intersection types using the `&` operator. While interfaces can also represent union types indirectly, they don't have built-in support for intersection types.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Example with interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

