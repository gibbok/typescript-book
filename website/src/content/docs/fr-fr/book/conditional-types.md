---
title: Types conditionnels
sidebar:
  order: 40
  label: 40. Types conditionnels
---


Les types conditionnels permettent de créer un type qui dépend d'une condition, le type à créer étant déterminé par le résultat de cette condition. Ils sont définis à l'aide du mot-clé `extends` et d'un opérateur ternaire afin de choisir conditionnellement entre deux types.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

