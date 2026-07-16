---
title: Asignaciones
sidebar:
  order: 21
  label: 21. Asignaciones
---


La restricción mediante asignaciones permite restringir el tipo de una variable según el valor que se le asigne. Cuando se asigna un valor, TypeScript infiere su tipo y restringe el tipo de la variable para que coincida con él.

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

