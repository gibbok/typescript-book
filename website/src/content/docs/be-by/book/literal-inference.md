---
title: Literal Inference
sidebar:
  order: 17
  label: 17. Literal Inference
---


Literal Inference is a feature in TypeScript that allows the type of a variable or parameter to be inferred based on its value.

In the following example we can see that TypeScript considers `x` a literal type as the value cannot be changed any time later, when instead `y` is inferred as string as it can be modified any time later.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

In the following example we can see that `o.x` was inferred as a `string` (and not a literal of `a`) as TypeScript considers that the value can be changed any time later.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

As you can see the code throws an error when passing `o.x` to `fn` as X is a narrower type.

We can solve this issue by using type assertion using `const` or the `X` type:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

or:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

