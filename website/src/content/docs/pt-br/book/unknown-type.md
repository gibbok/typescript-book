---
title: Tipo unknown
sidebar:
  order: 45
  label: 45. Tipo unknown
---


No TypeScript, o tipo `unknown` representa um valor que é de um tipo desconhecido. Ao contrário do tipo `any`, que permite qualquer tipo de valor, o `unknown` exige uma verificação de tipo ou asserção antes de poder ser usado de uma maneira específica, portanto nenhuma operação é permitida em um `unknown` sem primeiro asseverar ou estreitar para um tipo mais específico.

O tipo `unknown` só é atribuível a si mesmo e ao tipo `any`; é uma alternativa segura em termos de tipos ao `any`.

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

