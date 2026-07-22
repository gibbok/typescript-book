---
title: Conditional типове
sidebar:
  order: 40
  label: 40. Conditional типове
---


Conditional типовете са начин за създаване на тип, който зависи от условие, като създаваният тип се определя въз основа на резултата от условието. Те се дефинират чрез ключовата дума `extends` и тернарен оператор за условен избор между два типа.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Тип true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Тип false
```

