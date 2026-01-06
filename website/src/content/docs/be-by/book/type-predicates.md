---
title: Type Predicates
sidebar:
  order: 23
  label: 23. Type Predicates
---


Type Predicates in TypeScript are functions that return a boolean value and are used to narrow the type of a variable to a more specific type.

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

