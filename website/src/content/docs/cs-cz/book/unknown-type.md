---
title: Typ unknown
sidebar:
  order: 46
  label: 46. Typ unknown
---


V TypeScriptu představuje typ `unknown` hodnotu neznámého typu. Na rozdíl od typu `any`, který umožňuje jakýkoli typ hodnoty, vyžaduje `unknown` před konkrétním použitím kontrolu typu nebo přetypování. S hodnotou typu `unknown` tedy nelze provádět žádné operace, aniž byste ji nejprve přetypovali nebo zúžili na konkrétnější typ.

Typ `unknown` lze přiřadit pouze typu `any` a samotnému typu `unknown` a představuje typově bezpečnou alternativu k `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Platné
let value2: any = value; // Platné
let value3: boolean = value; // Neplatné
let value4: number = value; // Neplatné
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

