---
title: Дистрибутивные условные типы
sidebar:
  order: 41
  label: 41. Дистрибутивные условные типы
---


Дистрибутивные условные типы — это возможность распределить тип по объединению типов, применяя преобразование отдельно к каждому члену объединения.
Это может быть особенно полезно при работе с сопоставляемыми типами или типами высшего порядка.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

