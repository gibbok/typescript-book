---
title: Dağıtımlı Koşullu Türler
sidebar:
  order: 41
  label: 41. Dağıtımlı Koşullu Türler
---


Dağıtımlı Koşullu Türler, birleşimin her üyesine ayrı ayrı bir dönüşüm uygulayarak bir türün, türler birleşimi üzerine dağıtılmasını sağlayan bir özelliktir.
Bu, özellikle eşlenmiş türlerle veya yüksek dereceli türlerle çalışırken faydalı olabilir.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

