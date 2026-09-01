---
title: never Türü
sidebar:
  order: 26
  label: 26. never Türü
---


Bir değişken, hiçbir değer içeremeyen bir türe daraltıldığında TypeScript derleyicisi değişkenin `never` türünde olması gerektiğini çıkarır. Bunun nedeni, never türünün hiçbir zaman üretilemeyecek bir değeri temsil etmesidir.

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

