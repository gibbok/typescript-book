---
title: Typ unknown
sidebar:
  order: 46
  label: 46. Typ unknown
---


W TypeScript typ `unknown` reprezentuje wartość nieznanego typu. W przeciwieństwie do typu `any`, który dopuszcza wartość dowolnego typu, `unknown` wymaga sprawdzenia lub asercji typu przed użyciem wartości w określony sposób, dlatego na wartości `unknown` nie są dozwolone żadne operacje bez wcześniejszego zastosowania asercji lub zawężenia do bardziej szczegółowego typu.

Typ `unknown` można przypisać tylko do typów `any` i `unknown`; jest on bezpieczną pod względem typów alternatywą dla `any`.

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

