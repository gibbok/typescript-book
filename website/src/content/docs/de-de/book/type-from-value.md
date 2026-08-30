---
title: Typ aus einem Wert
sidebar:
  order: 35
  label: 35. Typ aus einem Wert
---


Ein Typ aus einem Wert bezeichnet in TypeScript die automatische Ableitung eines Typs aus einem Wert oder Ausdruck durch Typinferenz.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

