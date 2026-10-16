---
title: Sabit Değer Türleri
sidebar:
  order: 17
  label: 17. Sabit Değer Türleri
---


Sabit Değer Türü, toplu bir tür içindeki tek öğeli bir kümedir; JavaScript ilkel türü olan son derece kesin bir değeri tanımlar.

TypeScript'teki Sabit Değer Türleri sayılar, dizeler ve boole değerleridir.

Sabit değer örnekleri:

```typescript
const a = 'a'; // Dize sabiti türü
const b = 1; // Sayısal sabit türü
const c = true; // Mantıksal sabit türü
```

Dize, Sayısal ve Boole Sabit Değer Türleri birleşimlerde, tür korumalarında ve tür takma adlarında kullanılır.
Aşağıdaki örnekte bir birleşim türü takma adı görebilirsiniz. `O` yalnızca belirtilen değerlerden oluşur; başka hiçbir dize geçerli değildir:

```typescript
type O = 'a' | 'b' | 'c';
```

