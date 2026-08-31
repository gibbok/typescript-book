---
title: Silinen Yapısal Türler
sidebar:
  order: 57
  label: 57. Silinen Yapısal Türler
---


TypeScript'te nesnelerin belirli ve tam bir türle eşleşmesi gerekmez. Örneğin, bir arayüzün gereksinimlerini karşılayan bir nesne oluşturursak aralarında açık bir bağlantı kurulmamış olsa bile bu nesneyi söz konusu arayüzün gerekli olduğu yerlerde kullanabiliriz.
Örnek:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

