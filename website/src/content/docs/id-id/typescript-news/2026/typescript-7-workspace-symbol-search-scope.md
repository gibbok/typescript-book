---
title: TypeScript 7 menambahkan cakupan pencarian simbol workspace
description: Language service native menambahkan pengaturan yang dapat membatasi pencarian simbol workspace ke proyek saat ini.
lastUpdated: 2026-08-07
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Diterbitkan:** 7 Agustus 2026

Microsoft menggabungkan cakupan pencarian simbol workspace untuk language service native TypeScript.

## Perubahan

Preferensi `workspaceSymbols.scope` yang baru memiliki dua nilai. `allOpenProjects` adalah default dan mencari simbol di semua proyek yang terbuka. `currentProject` membatasi pencarian ke proyek yang berisi dokumen yang diberikan.

Ekstensi VS Code native kini menambahkan dokumen TypeScript atau JavaScript yang didukung ke permintaan `workspace/symbol`. Ekstensi ini memprioritaskan dokumen aktif dan jika tidak ada, menggunakan dokumen didukung yang terbuka. Language service menggunakan dokumen tersebut hanya ketika `workspaceSymbols.scope` bernilai `currentProject`; jika tidak, language service mempertahankan pencarian di semua proyek terbuka.

## Mengapa ini penting

Dalam workspace yang berisi beberapa proyek dengan simbol bernama sama, `currentProject` dapat membatasi kumpulan hasil ke proyek yang relevan. Default mempertahankan perilaku yang ada, sehingga perubahan ini bersifat opt-in.

## Ketersediaan

Perubahan ini digabungkan ke codebase native TypeScript setelah TypeScript 7.0. Sumbernya tidak menyebutkan versi npm stabil yang menyertakan pengaturan ini, jadi periksa catatan rilis untuk versi yang terpasang sebelum mengandalkannya.
