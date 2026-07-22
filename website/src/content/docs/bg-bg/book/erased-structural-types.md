---
title: Изтрити структурни типове
sidebar:
  order: 57
  label: 57. Изтрити структурни типове
---


В TypeScript обектите не е необходимо да съвпадат с конкретен, точен тип. Например, ако създадем обект, който покрива изискванията на даден interface, можем да използваме този обект на места, където този interface се изисква, дори да няма изрична връзка между тях.
Пример:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Валидно
```

