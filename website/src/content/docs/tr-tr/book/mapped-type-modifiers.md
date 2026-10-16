---
title: Eşlenmiş Tür Değiştiricileri
sidebar:
  order: 39
  label: 39. Eşlenmiş Tür Değiştiricileri
---


TypeScript'teki Eşlenmiş Tür Değiştiricileri, mevcut bir tür içindeki özelliklerin dönüştürülmesini sağlar:

* `readonly` veya `+readonly`: Bu, eşlenmiş türdeki bir özelliği salt okunur hâle getirir.
* `-readonly`: Bu, eşlenmiş türdeki bir özelliğin değiştirilebilir olmasını sağlar.
* `?`: Bu, eşlenmiş türdeki bir özelliği isteğe bağlı olarak belirler.

Örnekler:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Tüm özellikler salt okunur olarak işaretlendi

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Tüm özellikler değiştirilebilir olarak işaretlendi

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Tüm özellikler isteğe bağlı olarak işaretlendi
```

