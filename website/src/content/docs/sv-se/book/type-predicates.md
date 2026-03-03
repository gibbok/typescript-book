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

