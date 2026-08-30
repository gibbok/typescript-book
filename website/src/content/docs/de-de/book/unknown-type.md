---
title: Typ unknown
sidebar:
  order: 46
  label: 46. Typ unknown
---


In TypeScript stellt der Typ `unknown` einen Wert unbekannten Typs dar. Im Gegensatz zum Typ `any`, der jeden Werttyp zulässt, erfordert `unknown` eine Typprüfung oder Typassertion, bevor er auf bestimmte Weise verwendet werden kann. Daher sind für einen Wert vom Typ `unknown` keine Operationen zulässig, ohne dass er zuvor zugesichert oder auf einen spezifischeren Typ eingegrenzt wurde.

Der Typ `unknown` kann nur `any` und `unknown` selbst zugewiesen werden und ist eine typsichere Alternative zu `any`.

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

