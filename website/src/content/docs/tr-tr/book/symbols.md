---
title: Semboller
sidebar:
  order: 59
  label: 59. Semboller
---


Semboller, programın yaşam süresi boyunca program genelinde benzersiz olması garanti edilen, değiştirilemez bir değeri temsil eden ilkel bir veri türüdür.

Semboller, nesne özellikleri için anahtar olarak kullanılabilir ve numaralandırılamayan özellikler oluşturmanın bir yolunu sağlar.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

Artık WeakMap ve WeakSet'lerde sembollerin anahtar olarak kullanılmasına izin verilir.

