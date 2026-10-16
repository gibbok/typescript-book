---
title: Kompiler native TypeScript mengurangi penggunaan memori melalui optimasi pemeriksa tipe
description: Perubahan yang digabungkan memperkecil record tipe terstruktur serta menyesuaikan alokasi memori dan cache.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Diterbitkan:** 14 Oktober 2026

Microsoft menggabungkan sejumlah optimasi memori ke kompiler native TypeScript. Perubahan ini mengurangi memori yang dipertahankan struktur internal pemeriksa tipe tanpa mengubah sintaks TypeScript.

## Apa yang berubah

* Chunk arena bertipe kini menargetkan sekitar 512 byte, bukan 256 objek tetap. Dalam benchmark VS Code untuk perubahan tersebut, heap yang dipertahankan turun 8.54% dan pemindaian garbage collector turun 10.44%, sedangkan peristiwa alokasi naik 13.91%.
* Signature opsional, informasi indeks, dan cache pembangun node dipindahkan dari record `StructuredType`, sehingga ukurannya turun dari 144 menjadi 88 byte.
* Node tipe yang telah di-resolve dan signature menggunakan penyimpanan tautan node berpaginasi saat tersedia ID node yang stabil, dengan fallback map untuk ID lainnya.

## Ketersediaan

Perubahan ini digabungkan pada 14 Oktober 2026. Pull request sumber tidak menyebutkan versi npm stabil yang memuatnya. Hasil benchmark hanya berlaku untuk perubahan dan beban kerja yang diukur.

## Sumber

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
