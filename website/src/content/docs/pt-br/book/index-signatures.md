---
title: Assinaturas de Índice
sidebar:
  order: 14
  label: 14. Assinaturas de Índice
---


Às vezes você não conhece antecipadamente os nomes das propriedades de um tipo, mas conhece a forma dos valores. Nesses casos, você pode usar uma assinatura de índice para descrever o tipo de valores possíveis. Uma assinatura de índice deve ser `string`, `number`, `symbol`, ou um template string pattern:

```typescript
type X = {
    [key: string]: number;
};

const x: X = { a: 1, b: 2 };
```

É possível tornar uma assinatura de índice readonly adicionando a palavra-chave readonly:

<!-- skip -->
```typescript
type X = {
    readonly [key: string]: number;
};

const x: X = { a: 1, b: 2 };
x.a = 3; // Inválido
```

