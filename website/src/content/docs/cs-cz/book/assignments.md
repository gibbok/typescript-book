---
title: Přiřazení
sidebar:
  order: 22
  label: 22. Přiřazení
---


Zužování typů pomocí přiřazení v TypeScriptu je způsob, jak zúžit typ proměnné na základě hodnoty, která je jí přiřazena. Při přiřazení hodnoty proměnné TypeScript odvodí její typ a zúží jej tak, aby odpovídal přiřazené hodnotě.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

