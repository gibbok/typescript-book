# TypeScript yerel API'si typescript-eslint için gerekli API'leri ekliyor


**Yayımlandı:** 14 Eylül 2026

TypeScript yerel API'si artık `typescript-eslint` için gereken ek denetleyici ve tür API'lerini sunarak TypeScript'in programatik API'sine bağlı araçlardaki uyumluluk boşluklarını azaltıyor.

## Neler değişti

Değişiklik `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` ve `getExportSymbolOfSymbol` gibi API'leri ekliyor. Arayüz ve sınıf türleri ayrıca `getThisType()` kazanıyor ve indeks türü sorguları için `IndexKind` dışa aktarılıyor.

Hem eşzamanlı hem de eşzamansız yerel API yüzeyleri güncellendi.

## Neden önemli

TypeScript pull request'i, `typescript-eslint` tarafından eksik olarak belirlenen API'leri eklemek için özel olarak oluşturuldu. Böylece entegrasyonlar, yerleşik TypeScript API'sinden bekledikleri daha fazla denetleyici ve tür bilgisine erişebiliyor.

## Kaynak

Resmî TypeScript pull request'ini okuyun: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
