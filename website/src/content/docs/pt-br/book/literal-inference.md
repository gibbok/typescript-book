---
title: Inferência Literal
sidebar:
  order: 17
  label: 17. Inferência Literal
---


Tipos literais são inferidos de variáveis declaradas com `var` ou `let`, que podem ser alteradas, em oposição a `const` que não pode:

```typescript
const x = 'x'; // tem tipo 'x' (o valor não pode mudar)
let y = 'y'; // tem tipo string
```

