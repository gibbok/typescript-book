# Compiler native TypeScript menambahkan dukungan WebAssembly eksperimental


**Diterbitkan:** 2026-10-29

Pada 29 Oktober 2026, Microsoft menggabungkan dukungan eksperimental `wasip1/wasm` ke compiler native TypeScript. Perubahan ini memungkinkan compiler berjalan di host WASI dan menyediakan transport API JavaScript yang dapat digunakan di browser.

## Apa yang berubah

* `tsc.wasm` yang sama dapat berjalan sebagai perintah WASI untuk CLI atau server bahasa, atau sebagai reactor untuk panggilan API JavaScript sinkron dan asinkron.
* Paket artefak baru `@typescript/typescript-wasip1-wasm` berisi compiler WebAssembly dan berkas pustaka. Host `typescript/wasm` menyediakan `instantiateWasm` dan `instantiateWasmSync`; kedua paket harus menggunakan versi yang sama persis.
* Ekstensi VS Code for Web mendapatkan titik masuk yang menjalankan `tsc.wasm --lsp`. Perubahan ini mencakup pengujian API di Node.js dan pengujian smoke di browser Chromium.

## Ketersediaan

Ini adalah perubahan eksperimental yang telah digabungkan, bukan pengumuman rilis WebAssembly stabil. Biner, struktur paket, dan host `typescript/wasm` dapat berubah tanpa pemberitahuan.

## Sumber

[Baca pull request TypeScript yang telah digabungkan](https://github.com/microsoft/TypeScript/pull/64174).
