---
title: Type unknown
sidebar:
  order: 46
  label: 46. Type unknown
---


En TypeScript, le type `unknown` représente une valeur dont le type est inconnu. Contrairement au type `any`, qui autorise tout type de valeur, `unknown` exige une vérification ou une assertion de type avant de pouvoir être utilisé d'une manière précise. Ainsi, aucune opération n'est autorisée sur un type `unknown` sans assertion ou restriction préalable vers un type plus précis.

Le type `unknown` est uniquement assignable à `any` et à `unknown` lui-même, et constitue une alternative à `any` qui préserve la sécurité du typage.

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

