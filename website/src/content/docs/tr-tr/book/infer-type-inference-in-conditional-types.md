---
title: Koşullu Türlerde infer Tür Çıkarımı
sidebar:
  order: 42
  label: 42. Koşullu Türlerde infer Tür Çıkarımı
---


`infer` anahtar sözcüğü, koşullu türlerde bir jenerik parametrenin türünü kendisine bağlı olan bir türden çıkarmak (ayrıştırmak) için kullanılır. Bu, daha esnek ve yeniden kullanılabilir tür tanımları yazmanıza olanak tanır.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

