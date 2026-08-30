---
title: Specjalny typ never
sidebar:
  order: 26
  label: 26. Specjalny typ never
---


Gdy zmienna zostanie zawężona do typu, który nie może zawierać żadnych wartości, kompilator TypeScript wywnioskuje, że zmienna musi być typu `never`. Dzieje się tak, ponieważ typ `never` reprezentuje wartość, której nigdy nie można utworzyć.

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

