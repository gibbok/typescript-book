---
title: Koşullu Türler
sidebar:
  order: 40
  label: 40. Koşullu Türler
---


Koşullu Türler, oluşturulacak türün koşulun sonucuna göre belirlendiği, bir koşula bağlı tür oluşturmanın bir yoludur. İki tür arasında koşullu seçim yapmak için `extends` anahtar sözcüğü ve üçlü operatör kullanılarak tanımlanırlar.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

