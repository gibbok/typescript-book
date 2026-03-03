---
title: Tipo Unknown
sidebar:
  order: 45
  label: 45. Tipo Unknown
---


O tipo `unknown` é uma alternativa type-safe ao `any`. Enquanto `any` permite que você faça qualquer coisa com uma variável, `unknown` requer que você primeiro verifique ou afirme o tipo antes de usá-lo.

```typescript
let value: unknown;

value = 'hello';
value = 42;

// Precisa estreitar o tipo antes de usar
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
```

