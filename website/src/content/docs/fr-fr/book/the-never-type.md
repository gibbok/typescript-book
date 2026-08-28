---
title: Le type never
sidebar:
  order: 26
  label: 26. Le type never
---


Lorsqu'une variable est restreinte à un type qui ne peut contenir aucune valeur, le compilateur TypeScript en déduit que la variable doit être de type `never`. En effet, le type never représente une valeur qui ne peut jamais être produite.

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

