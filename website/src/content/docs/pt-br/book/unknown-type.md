---
title: Tipo Unknown
sidebar:
  order: 45
  label: 45. Tipo Unknown
---


No TypeScript, o tipo `unknown` representa um valor que é de um tipo desconhecido. Diferentemente do tipo `any`, que permite qualquer tipo de valor, `unknown` requer uma verificação ou asserção de tipo antes que possa ser usado de uma maneira específica, então nenhuma operação é permitida em um `unknown` sem primeiro assertar ou estreitar para um tipo mais específico.

O tipo `unknown` só é atribuível a qualquer tipo e ao próprio tipo `unknown`, é uma alternativa type-safe ao `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Válido
let value2: any = value; // Válido
let value3: boolean = value; // Inválido
let value4: number = value; // Inválido
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

