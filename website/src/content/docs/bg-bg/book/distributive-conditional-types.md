---
title: Дистрибутивни Conditional типове
sidebar:
  order: 41
  label: 41. Дистрибутивни Conditional типове
---


Дистрибутивните Conditional типове са функционалност, която позволява даден тип да бъде разпределен върху union от типове чрез прилагане на трансформация върху всеки член на union поотделно.
Това е особено полезно при работа с mapped типове или по-високоабстрактни (higher-order) типове.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

