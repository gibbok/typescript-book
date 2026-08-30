---
title: Typ na podstawie wartości
sidebar:
  order: 35
  label: 35. Typ na podstawie wartości
---


Typ na podstawie wartości w TypeScript oznacza automatyczne wnioskowanie typu z wartości lub wyrażenia za pomocą mechanizmu wnioskowania typów.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

