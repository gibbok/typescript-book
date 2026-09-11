---
title: TypeScript yerel API'si katmanlı sanal dosya sistemleri ekliyor
description: TypeScript yerel API'si, ekleme, değiştirme, kaldırma ve ana sisteme geri dönüş dahil olmak üzere bellek içi veya katmanlı sanal dosya sistemleriyle snapshot'ları güncelleyebilir.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Yayımlandı:** 9 Eylül 2026

TypeScript yerel API'si artık açık sanal dosya sistemi verileriyle snapshot oluşturup güncelleyebilir. Araçlar, dosya sistemi girdisinin tamamını yeniden oluşturmadan dosya ekleme, düzenleme ve kaldırma işlemlerini modelleyebilir.

## Neler değişti

Yeni `createFileSystem`, `createFileSystemWithLib` ve `createFileSystemLayer` yardımcıları snapshot API’lerinin kabul ettiği VFS nesnelerini oluşturur. `Snapshot.update`, mevcut bir snapshot üzerine yeni bir önbellek katmanı uygulayabilir.

`full` VFS tamamen bellekte kalır ve ana sistem veya oturum dosya sistemi callback’lerine geri dönmez. `layer` VFS önbellek kaçırmalarında ana sisteme geri döner ve `removedPaths` ile ana sistemde bulunan dosya veya dizinleri gizleyebilir. Her iki biçim de sanal dosya sistemi içindeki ve ana sistem yollarına giden sembolik bağlantıları destekler.

## Mevcut sınırlama

VFS destekli snapshot’lar hâlâ gerçek snapshot olarak sayıldığından yerel API aynı anda yalnızca bir gerçek snapshot sınırlamasını korur. Bu nedenle snapshot işlemleri şimdilik seri kalır.

## Kaynak

Birleştirilmiş TypeScript pull requestini okuyun: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
