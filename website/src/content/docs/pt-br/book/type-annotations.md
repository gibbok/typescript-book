---
title: Anotações de Tipo
sidebar:
  order: 11
  label: 11. Anotações de Tipo
---


Em variáveis declaradas usando `var`, `let` e `const`, é possível adicionar opcionalmente um tipo:

```typescript
const x: number = 1;
```

O TypeScript executa uma análise estática automática das expressões e é geralmente capaz de inferir o tipo sem que este seja anotado. No exemplo anterior, o tipo poderia ser omitido:

```typescript
const x = 1; // TypeScript infere o tipo number
```

