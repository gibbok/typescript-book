---
title: Atribuições
sidebar:
  order: 21
  label: 21. Atribuições
---


O TypeScript examina o lado direito de uma atribuição e estreita o lado esquerdo apropriadamente ao reconhecer possíveis valores:

```typescript
let x: string | number = 1;
x = 'a';
x = 1;
```

