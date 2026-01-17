---
title: Atribuições
sidebar:
  order: 21
  label: 21. Atribuições
---


O narrowing do TypeScript usando atribuições é uma maneira de estreitar o tipo de uma variável com base no valor atribuído a ela. Quando uma variável recebe um valor, o TypeScript infere seu tipo com base no valor atribuído e estreita o tipo da variável para corresponder ao tipo inferido.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

