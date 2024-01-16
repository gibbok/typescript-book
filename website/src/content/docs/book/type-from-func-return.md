---
title: Type from Func Return
sidebar:
  order: 35
  label: 35. Type from Func Return
---


Type from Func Return refers to the ability to automatically infer the return type of a function based on its implementation. This allows TypeScript to determine the type of the value returned by the function without explicit type annotations.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

