---
title: Tipos Literais
sidebar:
  order: 16
  label: 16. Tipos Literais
---


Um Tipo Literal é um conjunto de elemento único de um tipo coletivo, ele define um valor muito exato que é uma primitiva JavaScript.

Tipos Literais no TypeScript são números, strings e booleanos.

Exemplo de literais:

```typescript
const a = 'a'; // Tipo literal string
const b = 1; // Tipo literal numérico
const c = true; // Tipo literal booleano
```

Tipos Literais String, Numéricos e Booleanos são usados em union, type guard e type aliases.
No exemplo a seguir, você pode ver um type alias union, `O` pode ser apenas o valor especificado e não qualquer outra string:

```typescript
type O = 'a' | 'b' | 'c';
```

