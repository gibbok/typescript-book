---
title: Tipo Never
sidebar:
  order: 47
  label: 47. Tipo Never
---


O tipo `never` representa valores que nunca ocorrem. É comumente usado para funções que nunca retornam ou sempre lançam um erro.

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};

const infiniteLoop = (): never => {
    while (true) {}
};
```

