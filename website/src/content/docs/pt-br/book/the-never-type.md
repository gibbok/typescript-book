---
title: O Tipo never
sidebar:
  order: 25
  label: 25. O Tipo never
---


O tipo `never` no TypeScript representa valores que nunca ocorrem. É usado para denotar valores que nunca são observados pelo TypeScript, como quando o estreitamento de união remove todas as possibilidades.

O tipo `never` é frequentemente usado como um tipo de retorno para funções que nunca retornam ou sempre lançam uma exceção:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

