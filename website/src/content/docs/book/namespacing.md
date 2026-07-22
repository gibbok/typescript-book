---
title: Namespacing
sidebar:
  order: 58
  label: 58. Namespacing
---


In TypeScript, namespaces are used to organize code into logical containers, preventing naming collisions and providing a way to group related code together.
The use of the `export` keyword allows access to the namespace from outside modules.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

