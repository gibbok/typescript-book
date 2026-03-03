---
title: Typ från värde
sidebar:
  order: 34
  label: 34. Typ från värde
---


Typ från värde i TypeScript avser den automatiska härledningen av en typ från ett värde eller uttryck genom typinferens.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

