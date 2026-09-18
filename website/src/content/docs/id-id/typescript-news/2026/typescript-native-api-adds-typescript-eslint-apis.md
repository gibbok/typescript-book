---
title: API native TypeScript menambahkan API yang dibutuhkan typescript-eslint
description: API native TypeScript menambahkan API pemeriksa dan tipe yang dibutuhkan typescript-eslint, mengurangi kesenjangan kompatibilitas alat.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Dipublikasikan:** 14 September 2026

API native TypeScript kini mengekspos API pemeriksa dan tipe tambahan yang dibutuhkan `typescript-eslint`, sehingga mengurangi kesenjangan kompatibilitas untuk alat yang bergantung pada API terprogram TypeScript.

## Apa yang berubah

Perubahan ini menambahkan API seperti `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType`, dan `getExportSymbolOfSymbol`. Tipe antarmuka dan kelas juga mendapatkan `getThisType()`, dan `IndexKind` diekspor untuk kueri tipe indeks.

Permukaan API native sinkron dan asinkron sama-sama diperbarui.

## Mengapa ini penting

Pull request TypeScript ini dibuat khusus untuk menambahkan API yang diidentifikasi sebagai hilang oleh `typescript-eslint`. Integrasi kini dapat mengakses lebih banyak informasi pemeriksa dan tipe yang sebelumnya mereka harapkan dari API TypeScript yang sudah ada.

## Sumber

Baca pull request resmi TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
