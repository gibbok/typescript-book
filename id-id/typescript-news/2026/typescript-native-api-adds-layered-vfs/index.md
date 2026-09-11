# API native TypeScript menambahkan sistem berkas virtual berlapis


**Diterbitkan:** 9 September 2026

API native TypeScript kini dapat membuat dan memperbarui snapshot dengan data sistem berkas virtual yang eksplisit. Tool dapat memodelkan penambahan, perubahan, dan penghapusan berkas tanpa membangun ulang seluruh input sistem berkas.

## Apa yang berubah

Helper baru `createFileSystem`, `createFileSystemWithLib`, dan `createFileSystemLayer` membuat objek VFS yang diterima API snapshot. `Snapshot.update` dapat menerapkan lapisan cache baru di atas snapshot yang sudah ada.

VFS `full` sepenuhnya berada di memori dan tidak fallback ke callback sistem berkas host atau sesi. VFS `layer` fallback ke host saat cache miss dan dapat memakai `removedPaths` untuk menyembunyikan berkas atau direktori yang ada di host. Keduanya mendukung symbolic link di dalam sistem berkas virtual maupun ke path host.

## Batasan saat ini

Snapshot berbasis VFS tetap dihitung sebagai snapshot nyata, sehingga API native mempertahankan batasan satu snapshot nyata pada satu waktu. Untuk saat ini operasi snapshot tetap berjalan secara serial.

## Sumber

Baca pull request TypeScript yang telah di-merge: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
