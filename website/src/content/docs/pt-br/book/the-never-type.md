---
title: O Tipo Never
sidebar:
  order: 25
  label: 25. O Tipo Never
---


Quando uma variável é estreitada para um tipo que não pode conter nenhum valor, o compilador TypeScript inferirá que a variável deve ser do tipo `never`. Isso ocorre porque o Tipo Never representa um valor que nunca pode ser produzido.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val tem tipo never aqui porque nunca pode ser nada além de uma string ou um number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

