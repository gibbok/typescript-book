---
title: strictNullChecks
sidebar:
  order: 19
  label: 19. strictNullChecks
---


`strictNullChecks` adalah opsi compiler TypeScript yang memberlakukan pemeriksaan null secara ketat. Ketika opsi ini diaktifkan, variabel dan parameter hanya dapat diberi nilai `null` atau `undefined` jika telah dideklarasikan secara eksplisit sebagai tipe tersebut menggunakan tipe union `null` | `undefined`. Jika variabel atau parameter tidak dideklarasikan secara eksplisit sebagai nullable, TypeScript akan menghasilkan error untuk mencegah potensi error saat runtime.

