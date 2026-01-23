---
title: Assinaturas de Índice
sidebar:
  order: 14
  label: 14. Assinaturas de Índice
---


No TypeScript podemos usar como assinatura de índice `string`, `number` e `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Mesmo resultado que k[1]
```

Por favor, note que o JavaScript converte automaticamente um índice com `number` para um índice com `string`, então `k[1]` ou `k["1"]` retornam o mesmo valor.

