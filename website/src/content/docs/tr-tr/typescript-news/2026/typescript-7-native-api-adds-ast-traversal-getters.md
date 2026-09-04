---
title: TypeScript 7 yerel API'si AST alt düğüm ve token getter'ları ekliyor
description: TypeScript'in yerel API'si, alt düğümleri ve token'ları dolaşmak için Node metotları ekleyerek sözdizimi ağacı araçlarında JavaScript API'siyle arasındaki farkı azaltıyor.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Yayımlandı:** 3 Eylül 2026

TypeScript'in yerel API'si artık alt düğümleri ve token'ları dolaşmak için beş `Node` yardımcısı sunuyor: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` ve `getLastToken()`.

## Neler değişti

PR #63893, JavaScript tabanlı TypeScript API'sinde zaten bulunan kalan alt düğüm ve token getter'larını ekliyor. Konum ve metin getter'ları daha önce eklendiği için bu değişiklik, yerel `Node` API'sinin alt düğüm/token bölümünü tamamlıyor.

## Neden önemli

Bu metotlar, sözdizimi ağacını dolaşan API kullanıcıları için, özellikle hem token'ları hem de alt düğümleri incelemesi gereken araçlar için yararlıdır. Yerel API artık bu durumlarda aynı `Node` dolaşım yardımcılarını kullanabilir.

## Kaynak

[PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) ve [takip issue'sunu](https://github.com/microsoft/TypeScript/issues/63892) inceleyin.
