---
title: Tipi condizionali
sidebar:
  order: 39
  label: 39. Tipi condizionali
---


I tipi condizionali sono un modo per creare un tipo che dipende da una condizione, in cui il tipo da creare viene determinato in base al risultato della condizione. Sono definiti utilizzando la parola chiave `extends` e un operatore ternario per scegliere condizionatamente tra due tipi.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

