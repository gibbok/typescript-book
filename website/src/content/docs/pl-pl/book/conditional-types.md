---
title: Typy warunkowe
sidebar:
  order: 40
  label: 40. Typy warunkowe
---


Typy warunkowe umożliwiają tworzenie typu zależnego od warunku, gdzie typ do utworzenia jest określany na podstawie wyniku warunku. Definiuje się je za pomocą słowa kluczowego `extends` i operatora trójargumentowego, aby warunkowo wybrać jeden z dwóch typów.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

