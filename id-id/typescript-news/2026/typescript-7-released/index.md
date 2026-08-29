# TypeScript 7.0 kini tersedia


**Diterbitkan:** 8 Juli 2026

Microsoft telah merilis TypeScript 7.0, versi stabil pertama yang dibangun di atas codebase Go native baru milik proyek ini.

## Perubahan

TypeScript 7 menggunakan kode native, multithreading shared-memory, dan optimasi tambahan. Menurut tim TypeScript, build penuh dalam benchmark yang dipublikasikan 7,7 hingga 11,9 kali lebih cepat daripada TypeScript 6.

Rilis ini juga memindahkan language service ke Language Server Protocol. Editor yang didukung dapat menggunakan fondasi native yang sama untuk pemuatan proyek, diagnosis, completions, dan navigasi yang lebih cepat.

Pasang rilis stabil dari npm:

```shell
npm install --save-dev typescript
```

## Kompatibilitas

TypeScript 7.0 tidak menyediakan API programatik yang stabil. Tooling yang menyematkan TypeScript, termasuk workflow Astro, Vue, MDX, Svelte, dan beberapa workflow Angular saat ini, mungkin masih memerlukan TypeScript 6 sampai API baru tersedia.

Tim TypeScript memperkirakan akan memperkenalkan API baru di TypeScript 7.1. Proyek harus memeriksa dukungan framework dan tooling mereka sebelum melakukan upgrade.

## Sumber

Baca pengumuman resmi: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
