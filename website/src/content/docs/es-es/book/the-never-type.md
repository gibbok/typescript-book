---
title: El tipo never
sidebar:
  order: 28
  label: 28. El tipo never
---


Cuando una variable se restringe a un tipo que no puede contener ningún valor, el compilador de TypeScript infiere que debe ser de tipo `never`, ya que este representa un valor que nunca puede producirse.

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

