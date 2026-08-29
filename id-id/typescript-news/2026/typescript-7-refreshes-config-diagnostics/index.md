# TypeScript 7 menyegarkan diagnosis konfigurasi setelah perubahan berkas


**Diterbitkan:** 30 Juli 2026

Microsoft menggabungkan perbaikan yang menyegarkan diagnosis berkas konfigurasi di language service native TypeScript setelah berkas `tsconfig.json` atau `jsconfig.json` yang dilacak berubah.

## Perubahan

Diagnosis berkas konfigurasi diterbitkan selama pembaruan snapshot language service. Sebelumnya, perubahan berkas konfigurasi yang dipantau menjadwalkan penyegaran diagnosis tetapi tidak menjadwalkan pembaruan snapshot. Error konfigurasi baru karena itu dapat tetap usang sampai editor membuat permintaan lain yang memperbarui snapshot.

Language service kini mendeteksi perubahan pada berkas konfigurasi yang dilacak dan menjadwalkan pembaruan snapshot yang di-debounce. Ini menerbitkan ulang diagnosis yang didorong tanpa bergantung pada permintaan lanjutan dari editor.

## Mengapa ini penting

Ketika editor atau tooling eksternal mengubah `tsconfig.json` atau `jsconfig.json` yang dilacak, language service native dapat melaporkan error konfigurasi terbaru hanya dari event file watcher. Pengujian regresi memverifikasi perilaku ini dengan nilai `target` yang tidak valid.

## Ketersediaan

Perubahan ini digabungkan ke codebase native TypeScript setelah rilis TypeScript 7.0. Sumbernya tidak menyebutkan versi npm stabil yang menyertakannya, jadi periksa catatan rilis untuk versi yang terpasang sebelum mengandalkan perbaikan ini.

## Sumber

Baca perubahan resmi: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
