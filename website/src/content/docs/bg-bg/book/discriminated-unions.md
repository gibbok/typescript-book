---
title: Type Predicates
sidebar:
  order: 24
  label: 24. Type Predicates
---


Type Predicates в TypeScript са функции, които връщат boolean стойност и се използват за стесняване на типа на променлива до по-специфичен тип.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('не е низ');
    }
};
```

