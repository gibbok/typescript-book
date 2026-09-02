---
title: Условные типы
sidebar:
  order: 40
  label: 40. Условные типы
---


Условные типы позволяют создавать тип, зависящий от условия: создаваемый тип определяется результатом этого условия. Они задаются с помощью ключевого слова `extends` и тернарного оператора, который условно выбирает один из двух типов.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

