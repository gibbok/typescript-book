---
title: Object Types
sidebar:
  order: 27
  label: 27. Object Types
---


In TypeScript, object types describe the shape of an object. They specify the names and types of the object's properties, as well as whether those properties are required or optional.

In TypeScript, you can define object types in two primary ways:

Interface which defines the shape of an object by specifying the names, types, and optionality of its properties.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Type alias, similar to an interface, defines the shape of an object. However, it can also create a new custom type that is based on an existing type or a combination of existing types. This includes defining union types, intersection types, and other complex types.

```typescript
type Point = {
    x: number;
    y: number;
};
```

It also possible to define a type anonymously:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

