---
title: Type from Value
sidebar:
  order: 34
  label: 34. Type from Value
---


Type from Value in TypeScript refers to the automatic inference of a type from a value or expression through type inference.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

