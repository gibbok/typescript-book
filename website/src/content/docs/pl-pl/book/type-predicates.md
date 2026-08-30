---
title: Predykaty typów
sidebar:
  order: 24
  label: 24. Predykaty typów
---


Predykaty typów w TypeScript to funkcje zwracające wartość logiczną, które służą do zawężania typu zmiennej do bardziej szczegółowego typu.

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

TypeScript 5.5 automatycznie wnioskuje predykaty typów (takie jak `x is T`) w funkcjach takich jak `.filter`, dzięki czemu wie, kiedy wartości takie jak `undefined` są usuwane — zapewnia to precyzyjniejsze typy i mniej błędów. Działa to w przypadku jednoznacznych sprawdzeń (np. `x !== undefined`), ale nie w przypadku niejednoznacznych sprawdzeń, takich jak `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

