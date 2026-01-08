---
title: infer Type Inference in Conditional Types
sidebar:
  order: 41
  label: 41. infer Type Inference in Conditional Types
---


The `infer`keyword is used in conditional types to infer (extract) the type of a generic parameter from a type that depends on it. This allows you to write more flexible and reusable type definitions.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

