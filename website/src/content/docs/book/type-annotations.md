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

TypeScript does a good job of inferring types, especially when simple one, so these declarations in most cases are not necessary.

On functions is possible to add type annotations to parameters:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

The following is an example using a anonymous functions (so called lambda function):

```typescript
const sum = (a: number, b: number) => a + b;
```

These annotation can be avoided when a default value for a parameter is present:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Return type annotations can be added to functions:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

This is useful especially for  more complex functions as writing expliciting the return type before an implementation can help better think about the function.

Generally consider annotating type signatures but not the body local variables and add types always to object literals.

