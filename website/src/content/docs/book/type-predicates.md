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

TypeScript 5.5 automatically infers type predicates (like `x is T`) in functions such as `.filter`, so it knows when values like undefined are removed—giving more precise types and fewer errors; this works for clear checks (e.g., `x !== undefined`) but not ambiguous ones like `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

