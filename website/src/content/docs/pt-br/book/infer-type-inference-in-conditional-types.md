---
title: Inferência de Tipo infer em Tipos Condicionais
sidebar:
  order: 41
  label: 41. Inferência de Tipo infer em Tipos Condicionais
---


A palavra-chave `infer` em tipos condicionais fornece uma maneira de inferir e capturar tipos dentro da cláusula condicional.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type A = ElementType<number[]>; // number
```

