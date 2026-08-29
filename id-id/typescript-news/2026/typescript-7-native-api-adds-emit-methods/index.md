# API native TypeScript 7 menambahkan metode emit


**Diterbitkan:** 24 Juli 2026

Codebase TypeScript native telah menambahkan API emit programatik untuk tooling yang perlu menghasilkan output JavaScript atau deklarasi.

## Perubahan

API yang telah digabungkan menyediakan empat jalur emit dengan perilaku output dan pemilihan yang berbeda.

* `program.emit(emitOnly?: EmitOnly)` melakukan emit seluruh program ke filesystem, termasuk virtual filesystem yang dikonfigurasi, dan mematuhi opsi yang memblokir emit seperti `noEmit` dan `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` melakukan emit seluruh program ke hasil string dalam memori dan juga mematuhi opsi yang memblokir emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` mengembalikan output JavaScript dalam memori untuk berkas yang dipilih dan mengabaikan opsi yang memblokir emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` menyediakan output deklarasi untuk berkas yang dipilih.

Ini memberi konsumen API pilihan terpisah untuk emit normal seluruh program dan output dalam memori yang ditargetkan.

## Ketersediaan

Perubahan ini digabungkan ke codebase TypeScript native pada 24 Juli 2026. Sumbernya tidak menyebutkan versi npm stabil yang berisi API ini, jadi tooling harus memverifikasi dukungan pada versi TypeScript yang digunakannya.

## Sumber

Baca pull request resmi: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
