---
title: Tipos de Intersecção
sidebar:
  order: 32
  label: 32. Tipos de Intersecção
---


Tipos de intersecção permitem combinar múltiplos tipos em um único tipo. Um tipo de intersecção representa um valor que tem todas as propriedades de todos os tipos envolvidos.

```typescript
type A = { a: string };
type B = { b: number };
type C = A & B;

const obj: C = { a: 'hello', b: 42 };
```

