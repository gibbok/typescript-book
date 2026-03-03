---
title: Tipo a partir de Valor
sidebar:
  order: 34
  label: 34. Tipo a partir de Valor
---


Tipo a partir de Valor (Type from Value) no TypeScript refere-se à inferência automática de um tipo a partir de um valor ou expressão através da inferência de tipos.

```typescript
const x = 'x'; // O TypeScript infere 'x' como um literal de string com 'const' (imutável), mas alarga para 'string' com 'let' (atribuível novamente).
```

