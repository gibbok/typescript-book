---
title: Type Annotations
sidebar:
  order: 11
  label: 11. Type Annotations
---


On variables declared using `var`, `let` and `const`, it is possible to optionally add a type:

```typescript
const x: number = 1;
```

TypeScript does a good job of inferring types, especially for simple ones, so these declarations are not necessary in most cases.

On functions, it is possible to add type annotations to parameters:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

The following is an example using an anonymous function (also called a lambda function):

```typescript
const sum = (a: number, b: number) => a + b;
```

These annotations can be avoided when a default value for a parameter is present:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Return type annotations can be added to functions:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

This is especially useful for more complex functions, as writing the return type before an implementation can help you think through the function.

Generally, consider annotating type signatures, but not body-local variables, and always add types to object literals.

