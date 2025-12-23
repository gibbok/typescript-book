---
title: Il tipo `never`
sidebar:
  order: 25
  label: 25. Il tipo `never`
---


Quando una variabile viene ristretta a un tipo che non può contenere alcun valore, il compilatore TypeScript dedurrà che la variabile deve essere del tipo `never`. Questo perché il tipo `never` rappresenta un valore che non può mai essere prodotto.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val ha il tipo never qui perché non può essere altro che una stringa o un numero
        const neverVal: never = val;
        console.log(`Valore imprevisto: ${neverVal}`);
    }
};
```

