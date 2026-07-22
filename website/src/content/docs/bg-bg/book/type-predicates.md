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

TypeScript 5.5 автоматично извежда type predicates (като `x is T`) във функции като `.filter`, така че знае кога стойности като undefined са премахнати—давайки по-точни типове и по-малко грешки; това работи за ясни проверки (например `x !== undefined`), но не и за двусмислени като `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

