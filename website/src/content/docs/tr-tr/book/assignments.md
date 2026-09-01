---
title: Atamalar
sidebar:
  order: 22
  label: 22. Atamalar
---


Atamaları kullanan TypeScript daraltması, bir değişkenin türünü kendisine atanan değere göre daraltmanın bir yoludur. Bir değişkene bir değer atandığında TypeScript, atanan değere göre türünü çıkarır ve değişkenin türünü çıkarılan türle eşleşecek biçimde daraltır.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

