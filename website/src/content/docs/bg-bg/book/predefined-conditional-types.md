---
title: infer извеждане на тип в Conditional типове
sidebar:
  order: 42
  label: 42. infer извеждане на тип в Conditional типове
---


Ключовата дума `infer` се използва в conditional типове, за да се извлече типът на generic параметър от тип, който зависи от него. Това позволява създаването на по-гъвкави и преизползваеми дефиниции на типове.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

