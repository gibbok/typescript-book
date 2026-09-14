---
title: Datový typ never
sidebar:
  order: 26
  label: 26. Datový typ never
---


Když je proměnná zúžena na typ, který nemůže obsahovat žádné hodnoty, kompilátor TypeScriptu odvodí, že proměnná musí být typu `never`. Je to proto, že typ never představuje hodnotu, která nikdy nemůže vzniknout.

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

