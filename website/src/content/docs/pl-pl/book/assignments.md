---
title: Przypisania
sidebar:
  order: 22
  label: 22. Przypisania
---


Zawężanie typów za pomocą przypisań w TypeScript to sposób zawężania typu zmiennej na podstawie przypisanej do niej wartości. Gdy do zmiennej zostanie przypisana wartość, TypeScript wnioskuje jej typ na podstawie przypisanej wartości i zawęża typ zmiennej tak, aby odpowiadał wywnioskowanemu typowi.

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

