---
title: Extending Types
sidebar:
  order: 15
  label: 15. Extending Types
---


It is possible to extend an `interface` (copy members from another type):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

It is also possible to extend from multiple types:

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

The `extends` keyword works only on interfaces and classes, for types use an intersection:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

It is possible to extend a type using an inference but not vice versa:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

