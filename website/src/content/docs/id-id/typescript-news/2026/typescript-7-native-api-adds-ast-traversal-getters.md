---
title: API native TypeScript 7 menambahkan getter anak AST dan token
description: API native TypeScript menambahkan metode Node untuk menelusuri anak dan token, mengurangi kesenjangan dengan API JavaScript untuk tooling pohon sintaks.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**3 September 2026**

API native TypeScript kini menyediakan lima helper `Node` untuk menelusuri node anak dan token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()`, dan `getLastToken()`.

## Apa yang berubah

PR #63893 menambahkan getter anak dan token yang tersisa dan sudah tersedia di API TypeScript berbasis JavaScript. Perubahan ini melengkapi bagian anak/token pada API native `Node` setelah getter posisi dan teks sebelumnya ditambahkan.

## Mengapa ini penting

Metode-metode ini berguna bagi pengguna API yang menelusuri pohon sintaks, termasuk tooling yang perlu memeriksa token sekaligus node anak. API native kini dapat menggunakan helper penelusuran `Node` yang sama untuk kasus tersebut.

## Sumber

Baca [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) dan [issue pelacakan](https://github.com/microsoft/TypeScript/issues/63892).
