# Kandidat rilis TypeScript 7.0 diumumkan


**Diterbitkan:** 18 Juni 2026

Microsoft merilis kandidat rilis TypeScript 7.0 sebagai pratinjau terakhir sebelum rilis stabil TypeScript 7.

## Perubahan

Kandidat rilis ini memindahkan TypeScript ke compiler dan language service berbasis Go yang baru. Logika pemeriksaan tipenya dipindahkan dari TypeScript 6 untuk mempertahankan semantik yang ada sekaligus meningkatkan performa melalui kode native dan paralelisme shared-memory.

TypeScript 7 menambahkan pemeriksaan tipe paralel dan build project reference. Opsi `--checkers` mengontrol jumlah worker pemeriksaan tipe, sedangkan `--builders` mengontrol jumlah builder project reference.

Pada saat pengumuman, kandidat rilis ini dapat dipasang dari npm:

```shell
npm install --save-dev typescript@rc
```

## Kompatibilitas

Kandidat rilis ini tidak menyertakan API programatik yang stabil. Tim TypeScript menyediakan paket kompatibilitas `@typescript/typescript6` agar tooling yang memerlukan API TypeScript 6 dapat berjalan bersama compiler baru.

Kandidat rilis ini juga mengadopsi default TypeScript 6 dan memperlakukan opsi yang tidak digunakan lagi di TypeScript 6 sebagai error. Tim disarankan bermigrasi ke TypeScript 6 terlebih dahulu sebelum mengevaluasi TypeScript 7.

## Sumber

Baca pengumuman resmi: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
