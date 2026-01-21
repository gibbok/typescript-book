---
title: Any type
sidebar:
  order: 44
  label: 44. Any type
---


The `any` type is a special type (universal supertype) that can be used to represent any type of value (primitives, objects, arrays, functions, errors, symbols). It is often used in situations where the type of a value is not known at compile time, or when working with values from external APIs or libraries that do not have TypeScript typings.

By utilizing `any` type, you are indicating to the TypeScript compiler that values should be represented without any limitations. To maximize type safety in your code, consider the following:

* Limit the usage of `any` to specific cases where the type is truly unknown.
* Do not return `any` types from a function, as this weakens type safety in code that uses it.
* Instead of `any` use `@ts-ignore` if you need to silence the compiler.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

