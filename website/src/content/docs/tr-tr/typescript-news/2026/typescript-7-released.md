---
title: TypeScript 7.0 artık kullanılabilir
description: TypeScript 7.0, yerel Go tabanlı bir derleyici ve dil hizmeti sunarak derlemeler ve düzenleyiciler için önemli performans iyileştirmeleri sağlıyor.
lastUpdated: 2026-07-08
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Yayımlandı:** 8 Temmuz 2026

Microsoft, projenin yeni yerel Go kod tabanı üzerine kurulan ilk kararlı sürüm olan TypeScript 7.0'ı yayımladı.

## Neler değişti

TypeScript 7; yerel kod, paylaşımlı bellek çoklu iş parçacığı ve ek optimizasyonlar kullanır. TypeScript ekibine göre yayımlanan karşılaştırmalı değerlendirmelerde tam derlemeler TypeScript 6'dan 7.7 ile 11.9 kat daha hızlıydı.

Sürüm ayrıca dil hizmetini Language Server Protocol'e taşıyor. Desteklenen düzenleyiciler daha hızlı proje yükleme, tanılama, tamamlama ve gezinme için aynı yerel temeli kullanabilir.

Kararlı sürümü npm'den kurun:

```shell
npm install --save-dev typescript
```

## Uyumluluk

TypeScript 7.0 kararlı bir programatik API sunmuyor. Mevcut Astro, Vue, MDX, Svelte ve bazı Angular iş akışları dâhil olmak üzere TypeScript'i gömülü olarak kullanan araçlar, yeni API kullanıma sunulana kadar hâlâ TypeScript 6'yı gerektirebilir.

TypeScript ekibi yeni API'yi TypeScript 7.1'de kullanıma sunmayı bekliyor. Projeler yükseltme yapmadan önce framework ve araç desteğini kontrol etmelidir.

## Kaynak

Resmî duyuruyu okuyun: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
