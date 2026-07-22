---
title: Intersection Types
sidebar:
  order: 35
  label: 35. Intersection Types
---


An Intersection Type is a type that represents a value that has all the properties of two or more types. Intersection Types are denoted using the `&` symbol between each type.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

