# TypeScript 7.1 Beta menghadirkan API modular dan dukungan ES2026


**Diterbitkan:** 20 Oktober 2026

Microsoft merilis TypeScript 7.1 Beta dengan API compiler native baru dan dukungan fitur JavaScript. Coba versi beta dengan:

```shell
npm install -D typescript@beta
```

## Apa yang berubah

* `--target es2026` dan `--lib es2026` kini didukung sebagai opsi stabil, dengan deklarasi pustaka standar yang diperbarui.
* Entry point API baru meliputi `typescript/sync`, `typescript/async`, `typescript/fs`, dan `typescript/ast`. Objek `API` dan `Program` harus dibebaskan, misalnya menggunakan `using`.
* Source-phase import (`import source` dan `import.source()`) mendukung objek sumber modul, termasuk penggunaan WebAssembly, dengan pengaturan `--module` dan `esnext` yang sesuai.
* Content mapper dapat mengekspos TypeScript yang tertanam dalam berkas seperti `.vue` dan `.svelte`. Eksekusi melalui command line memerlukan `--runExternalCode`.
* Menurut benchmark yang diterbitkan Microsoft, proses build lebih cepat dan penggunaan memori lebih rendah dibanding TypeScript 7.0.

## Ketersediaan

Ini adalah versi beta, bukan rilis stabil. Periksa kompatibilitas framework dan tooling sebelum memperbarui. Dukungan atribut import pada ambient module telah dibahas dalam berita terpisah.

## Sumber

Baca pengumuman resmi: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
