---
title: Unknown тип
sidebar:
  order: 46
  label: 46. Unknown тип
---


В TypeScript, типът `unknown` представлява стойност с неизвестен тип. За разлика от типа `any`, който позволява всякакъв тип стойност, `unknown` изисква проверка на типа (type check) или type assertion, преди да може да бъде използван по конкретен начин, като не са позволени операции върху `unknown`, без първо да бъде уточнен или стеснен до по-специфичен тип.

Типът `unknown` може да бъде присвоен само на тип `any` и на самия тип `unknown`, като представлява type-safe алтернатива на `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Валидно
let value2: any = value; // Валидно
let value3: boolean = value; // Невалидно
let value4: number = value; // Невалидно
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

