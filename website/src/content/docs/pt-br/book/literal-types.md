---
title: Tipos Literais
sidebar:
  order: 17
  label: 17. Tipos Literais
---


Um tipo literal é um conjunto de um único elemento dentro de um tipo mais abrangente; ele define um valor exato que é um primitivo do JavaScript.

Os tipos literais no TypeScript são números, strings e booleanos.

Exemplo de literais:

```typescript
const a = 'a'; // Tipo literal de string
const b = 1; // Tipo literal numérico
const c = true; // Tipo literal booleano
```

Tipos literais de string, numéricos e booleanos são usados em uniões, guardas de tipo (type guards) e aliases de tipo (type aliases).
No exemplo a seguir, você pode ver um alias de tipo de união. `O` consiste apenas nos valores especificados; nenhuma outra string é válida:

```typescript
type O = 'a' | 'b' | 'c';
```

