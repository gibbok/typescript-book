---
title: The never Type
sidebar:
  order: 25
  label: 25. The never Type
---


When a variable is narrowed to a type that cannot contain any values, the TypeScript compiler will infer that the variable must be of the `never` type. This is because The never Type represents a value that can never be produced.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

