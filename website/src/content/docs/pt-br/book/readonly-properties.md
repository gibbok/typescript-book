---
title: Propriedades Readonly
sidebar:
  order: 13
  label: 13. Propriedades Readonly
---


É possível marcar uma propriedade como readonly para o TypeScript, isso não altera nenhum comportamento em tempo de execução, mas uma propriedade marcada como readonly não pode ser escrita durante a verificação de tipo.

<!-- skip -->
```typescript
type X = {
    readonly a: string;
};

const x: X = { a: 'a' };
x.a = 'b'; // Inválido
```

Também é possível usar um "Mapping Modifier" para remover atributos readonly.

