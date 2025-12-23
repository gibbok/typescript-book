---
title: infer Inferenza di tipo nei tipi condizionali
sidebar:
  order: 41
  label: 41. infer Inferenza di tipo nei tipi condizionali
---


La parola chiave `infer` viene utilizzata nei tipi condizionali per inferire (estrarre) il tipo di un parametro generico da un tipo che dipende da esso. Questo consente di scrivere definizioni di tipo più flessibili e riutilizzabili.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

