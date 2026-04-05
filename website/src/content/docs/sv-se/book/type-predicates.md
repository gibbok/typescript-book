---
title: Typpredikat
sidebar:
  order: 23
  label: 23. Typpredikat
---


Typpredikat i TypeScript är funktioner som returnerar ett booleskt värde och används för att avsmalma typen av en variabel till en mer specifik typ.

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

TypeScript 5.5 härleder automatiskt typpredikat (som `x is T`) i funktioner som `.filter`, så att den vet när värden som undefined tas bort – vilket ger mer exakta typer och färre fel; detta fungerar för tydliga kontroller (t.ex. `x !== undefined`) men inte tvetydiga som `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

