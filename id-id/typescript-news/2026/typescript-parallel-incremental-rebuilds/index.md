# TypeScript mempercepat build inkremental dengan pemeriksaan paralel


Perubahan compiler yang telah digabungkan memungkinkan pemeriksaan paralel atas tanda tangan berkas yang terdampak perubahan pada modul yang banyak diimpor. Sebelumnya tahap ini berjalan berurutan.

## Apa yang berubah

Dalam benchmark penulis, build setelah perubahan komentar saja turun dari **3,4 menjadi 1,5 detik** pada Linux 32 inti. Pada paket n8n, kasus serupa turun dari **5,4 menjadi 4,5 detik**. Hasil ini khusus untuk beban kerja tersebut.

## Kinerja dan batasan

Pekerjaan dibatasi oleh `GOMAXPROCS`; manfaatnya bergantung pada checker yang tersedia dan dependensi. Tidak ada manfaat untuk `isolatedModules` karena berkas yang merujuk tidak ditelusuri.

## Sumber

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
