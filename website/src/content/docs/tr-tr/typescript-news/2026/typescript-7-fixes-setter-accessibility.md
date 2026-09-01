---
title: TypeScript 7, birleşimlerde ve kesişimlerde setter erişilebilirliğini düzeltiyor
description: Yerel denetleyici artık birleşim ve kesişim özelliklerinde setter erişilebilirliğini getter erişilebilirliğinden ayrı olarak dikkate alıyor.
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Yayımlandı:** 24 Ağustos 2026

Microsoft, birleşimlerden ve kesişimlerden sentezlenen özelliklerde okuma ve yazma erişilebilirliğini ayrı tutan bir yerel TypeScript denetleyicisi düzeltmesini birleştirdi.

## Neler değişti

Önceden denetim fiilen getter erişilebilirliğini kullandığı için bu sentetik özelliklerde setter erişilebilirliği göz ardı edilebiliyordu. Bu nedenle, korumalı bir setter ile eşleştirilen genel bir getter, birleşim veya kesişim üzerinden geçersiz bir yazma işlemine izin verebiliyordu.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

Denetleyici artık yazma erişilebilirliğini ayrı olarak kaydediyor. `foo` özelliğini okumak geçerli olmaya devam ederken bu özelliğe atama yapmak doğru biçimde bir erişilebilirlik hatası bildiriyor.

## Neden önemli

Sınıflar, yazma erişimini kısıtlarken okuma erişimini kasıtlı olarak genel kullanıma açabilir. Bu düzeltme, TypeScript nesne türlerini birleşimlerde veya kesişimlerde birleştirdiğinde yazma erişimini yanlışlıkla genişletmek yerine bu sınırı koruyor.

## Kullanılabilirlik

Değişiklik, TypeScript 7.0'dan sonra yerel TypeScript kod tabanına birleştirildi. Kaynak, değişikliği içeren kararlı bir npm sürümü belirtmediğinden bu davranışa güvenmeden önce yüklü sürümün sürüm notlarını kontrol edin.

## Kaynak

Birleştirilen TypeScript pull request'ini okuyun: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
