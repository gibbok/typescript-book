---
title: TypeScript 7.1 ambient modüllere import öznitelikleri ekliyor
description: TypeScript 7.1, desenli ambient modül bildirimlerini import özniteliklerine göre eşleştirebilir.
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**Yayımlandı:** 1 Eylül 2026

TypeScript'in yerel derleyicisi artık desenli ambient modül bildirimlerinde import öznitelik türlerini destekliyor. Böylece bildirimler `type: 'css'` veya `type: 'text'` gibi özniteliklerle importları ayırt edebiliyor.

## Neler değişti

Bir import öznitelik içerdiğinde TypeScript onu eşleşen desenli bir ambient modüle çözümleyebilir. Eşleştirme atanabilirliği kullanır; birden fazla bildirim eşleşirse TypeScript en özel öznitelik türüne sahip olanı seçer.

Şimdilik bu bildirimlerdeki öznitelik türleri, değerleri string literal türü olan normal özelliklerle sınırlıdır. Aynı desen ve aynı öznitelik türlerine sahip bildirimler birleştirilebilir; farklı türler ayrı kalır.

## Uyumluluk

Değişiklik TypeScript 7.1.0 Beta kilometre taşı için birleştirildi. Standart kütüphaneye yerleşik CSS veya metin import bildirimleri eklemez; projeler ve araçlar ihtiyaç duydukları ambient modülleri tanımlamaya devam etmelidir.

## Kaynak

Birleştirilen TypeScript pull request'ini okuyun: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
