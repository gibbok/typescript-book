---
title: Tipo de Retorno de Função
sidebar:
  order: 35
  label: 35. Tipo de Retorno de Função
---


Tipo de Retorno de Função refere-se à capacidade de inferir automaticamente o tipo de retorno de uma função com base em sua implementação. Isso permite que o TypeScript determine o tipo do valor retornado pela função sem anotações de tipo explícitas.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript pode inferir que o tipo de retorno da função é um number
```

