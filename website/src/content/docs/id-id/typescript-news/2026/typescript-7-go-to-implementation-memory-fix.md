---
title: TypeScript 7 meningkatkan penggunaan memori Go to Implementation
description: Perbaikan language service native mencegah pertumbuhan memori kuadratik saat menemukan implementasi pada proyek besar dengan tipe yang mendalam.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Diterbitkan:** 30 Juli 2026

Microsoft menggabungkan perbaikan penskalaan memori untuk Go to Implementation di language service native TypeScript.

## Perubahan

Language service menggunakan worklist breadth-first untuk menemukan implementasi. Untuk anggota interface dengan banyak implementasi, pencarian berulang di seluruh program dapat mengembalikan referensi yang sama lagi. Referensi yang dipertahankan, pekerjaan yang diantrikan, dan grup hasil karena itu dapat bertumbuh secara kuadratik serta menghabiskan memori pada proyek besar dengan tipe yang mendalam.

Perbaikan ini mendeduplikasi node referensi sebelum menambahkannya ke antrean kerja dan menghindari penyimpanan definisi simbol duplikat. Pengujian regresi memeriksa bahwa menggandakan jumlah implementasi menghasilkan pertumbuhan yang kira-kira linear, bukan kuadratik.

## Mengapa ini penting

Go to Implementation kini dapat memproses pola ini tanpa berulang kali menyimpan referensi internal yang sama. Respons akhir editor memang sudah dideduplikasi, sehingga perubahan ini menargetkan memori tersembunyi dan pekerjaan yang diperlukan untuk menghasilkan respons tersebut.

## Ketersediaan

Perubahan ini digabungkan ke codebase native TypeScript setelah rilis TypeScript 7.0. Sumbernya tidak menyebutkan versi npm stabil yang berisi perbaikan ini, jadi pengguna sebaiknya memeriksa catatan rilis untuk versi yang terpasang sebelum mengandalkannya.

## Sumber

Baca perubahan resmi: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
