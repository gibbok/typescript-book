# Tipo unknown



En TypeScript, `unknown` representa un valor de tipo desconocido. A diferencia de `any`, exige una comprobación o aserción antes de utilizarlo de una forma concreta; no se permite ninguna operación sobre un `unknown` sin afirmar o restringir primero ese `unknown` a un tipo más específico.

El tipo `unknown` solo puede asignarse a `any` y al propio `unknown`, y es una alternativa segura a `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Válido
let value2: any = value; // Válido
let value3: boolean = value; // No válido
let value4: number = value; // No válido
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

