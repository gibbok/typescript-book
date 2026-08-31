---
title: Any türü
sidebar:
  order: 45
  label: 45. Any türü
---


`any` türü, her türlü değeri (ilkel değerler, nesneler, diziler, fonksiyonlar, hatalar, semboller) temsil etmek için kullanılabilen özel bir türdür (evrensel üst tür). Genellikle bir değerin türünün derleme zamanında bilinmediği durumlarda ya da TypeScript tür tanımları bulunmayan harici API'ler veya kütüphanelerden gelen değerlerle çalışırken kullanılır.

`any` türünü kullanarak TypeScript derleyicisine değerlerin herhangi bir sınırlama olmadan temsil edilmesi gerektiğini belirtirsiniz. Kodunuzdaki tür güvenliğini en üst düzeye çıkarmak için şunları göz önünde bulundurun:

* `any` kullanımını, türün gerçekten bilinmediği belirli durumlarla sınırlayın.
* Bir fonksiyondan `any` türü döndürmeyin; çünkü bu, onu kullanan kodun tür güvenliğini zayıflatır.
* Derleyiciyi susturmanız gerekiyorsa `any` yerine `@ts-ignore` kullanın.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

