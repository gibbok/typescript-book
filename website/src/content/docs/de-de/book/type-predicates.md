---
title: Typprädikate
sidebar:
  order: 24
  label: 24. Typprädikate
---


Typprädikate sind in TypeScript Funktionen, die einen booleschen Wert zurückgeben und verwendet werden, um den Typ einer Variablen auf einen spezifischeren Typ einzugrenzen.

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

TypeScript 5.5 leitet Typprädikate (wie `x is T`) in Funktionen wie `.filter` automatisch ab. Dadurch erkennt es, wann Werte wie undefined entfernt werden, was zu präziseren Typen und weniger Fehlern führt. Dies funktioniert bei eindeutigen Prüfungen (z. B. `x !== undefined`), nicht jedoch bei mehrdeutigen wie `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

