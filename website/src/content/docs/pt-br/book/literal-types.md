---
title: Tipos Literais
sidebar:
  order: 16
  label: 16. Tipos Literais
---


Um tipo literal é um tipo que representa exatamente um único valor.

Por exemplo, uma variável pode aceitar apenas um único valor específico:

```typescript
const x: 'a' = 'a'; // x pode ser apenas a literal 'a'
```

Combinando literais em uniões permite expressar conceitos como, por exemplo, uma função que aceita apenas um conjunto conhecido de valores:

```typescript
const move = (direction: 'up' | 'down') => {
    // ...
};
```

Usar literais não-primitivos como number ou string não é permitido, pois o compilador os avaliaria para true ou false:

<!-- skip -->
```typescript
type X = 2 | 3;
type Y = 'a' | 'b';
```

