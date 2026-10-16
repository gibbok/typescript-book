---
title: Unknown-typen
sidebar:
  order: 46
  label: 46. Unknown-typen
---


I TypeScript representerar `unknown`-typen ett värde av en okänd typ. Till skillnad från `any`-typen, som tillåter vilken typ av värde som helst, kräver `unknown` en typkontroll eller assertion innan den kan användas på ett specifikt sätt, så inga operationer är tillåtna på en `unknown` utan att först göra en assertion eller avsmalning till en mer specifik typ.

`unknown`-typen kan bara tilldelas till any-typen och `unknown`-typen själv, den är ett typsäkert alternativ till `any`.
<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Giltigt
let value2: any = value; // Giltigt
let value3: boolean = value; // Ogiltigt
let value4: number = value; // Ogiltigt
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

