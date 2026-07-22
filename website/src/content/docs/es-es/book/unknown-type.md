---
title: Tipo unknown
sidebar:
  order: 47
  label: 47. Tipo unknown
---


En TypeScript, `unknown` representa un valor de tipo desconocido. A diferencia de `any`, exige una comprobación o aserción antes de utilizarlo de una forma concreta; no se permite ninguna operación sobre un `unknown` sin afirmar o restringir primero ese `unknown` a un tipo más específico.

El tipo `unknown` solo puede asignarse a `any` y al propio `unknown`, y es una alternativa segura a `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

