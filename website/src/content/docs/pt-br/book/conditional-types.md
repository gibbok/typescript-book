---
title: Tipos Condicionais
sidebar:
  order: 39
  label: 39. Tipos Condicionais
---


Tipos condicionais no TypeScript permitem expressar transformações de tipo não-uniformes. Eles fornecem uma maneira de fazer seleções de tipo baseadas em condições expressas como relações de teste de tipo.

```typescript
type Check<T> = T extends string ? 'string' : 'other';

type A = Check<string>; // 'string'
type B = Check<number>; // 'other'
```

