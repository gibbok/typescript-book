---
title: Predicados de tipo
sidebar:
  order: 25
  label: 25. Predicados de tipo
---


Los predicados de tipo de TypeScript son funciones que devuelven un valor booleano y se utilizan para restringir el tipo de una variable a otro más específico.

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

TypeScript 5.5 infiere automáticamente predicados de tipo (como `x is T`) en funciones como `.filter`, por lo que sabe cuándo se eliminan valores como undefined y ofrece tipos más precisos y menos errores; funciona con comprobaciones claras (por ejemplo, `x !== undefined`), pero no con otras ambiguas como `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

