---
title: Typové predikáty
sidebar:
  order: 24
  label: 24. Typové predikáty
---


Typové predikáty v TypeScriptu jsou funkce, které vracejí booleovskou hodnotu a slouží k zúžení typu proměnné na konkrétnější typ.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 automaticky odvozuje typové predikáty (například `x is T`) ve funkcích, jako je `.filter`, takže rozpozná, kdy jsou odstraněny hodnoty jako undefined, což poskytuje přesnější typy a méně chyb; to funguje pro jednoznačné kontroly (např. `x !== undefined`), ale ne pro nejednoznačné, jako je `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

