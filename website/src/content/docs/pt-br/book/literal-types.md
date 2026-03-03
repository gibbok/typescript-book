---
title: Tipos Literais
sidebar:
  order: 16
  label: 16. Tipos Literais
---


Um Tipo Literal é um conjunto de elemento único a partir de um tipo coletivo; ele define um valor exato que é um primitivo do JavaScript.

Os Tipos Literais no TypeScript são números, strings e booleanos.

Exemplo de literais:

```typescript
const a = 'a'; // Tipo literal de string
const b = 1; // Tipo literal numérico
const c = true; // Tipo literal booleano
```

Tipos Literais de String, Numéricos e Booleanos são usados em uniões, protetores de tipo (type guards) e apelidos de tipo (type aliases).
No exemplo a seguir, você pode ver um apelido de tipo de união. `O` consiste apenas nos valores especificados; nenhuma outra string é válida:

```typescript
type O = 'a' | 'b' | 'c';
```

