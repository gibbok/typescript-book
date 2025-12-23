---
title: Tipi condizionali distributivi
sidebar:
  order: 40
  label: 40. Tipi condizionali distributivi
---


I tipi condizionali distributivi sono una funzionalità che consente di distribuire un tipo su un'unione di tipi, applicando una trasformazione a ciascun membro dell'unione individualmente.
Questo può essere particolarmente utile quando si lavora con tipi mappati o tipi di ordine superiore.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

