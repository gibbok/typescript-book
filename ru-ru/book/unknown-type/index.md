# Тип unknown



В TypeScript тип `unknown` представляет значение неизвестного типа. В отличие от типа `any`, допускающего значение любого типа, `unknown` требует проверки или утверждения типа, прежде чем значение можно будет использовать определённым образом. Поэтому никакие операции со значением `unknown` не разрешены без предварительного утверждения или сужения до более конкретного типа.

Тип `unknown` можно присвоить только типам `any` и `unknown`; это типобезопасная альтернатива `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Допустимо
let value2: any = value; // Допустимо
let value3: boolean = value; // Недопустимо
let value4: number = value; // Недопустимо
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

