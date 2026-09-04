# TypeScript 7.1 menambahkan atribut impor ke modul ambient


**Diterbitkan:** 1 September 2026

Kompiler native TypeScript kini mendukung tipe atribut impor pada deklarasi modul ambient berpola. Dengan demikian, deklarasi dapat membedakan import melalui atribut seperti `type: 'css'` atau `type: 'text'`.

## Apa yang berubah

Ketika sebuah import memiliki atribut, TypeScript dapat me-resolve-nya ke modul ambient berpola yang cocok. Pencocokan menggunakan assignability dan, jika lebih dari satu deklarasi cocok, TypeScript memilih deklarasi dengan tipe atribut yang paling spesifik.

Untuk saat ini, tipe atribut pada deklarasi tersebut dibatasi pada properti biasa yang nilainya berupa tipe literal string. Deklarasi dengan pola dan tipe atribut yang identik dapat digabungkan; tipe atribut yang berbeda tetap terpisah.

## Kompatibilitas

Perubahan ini digabungkan untuk milestone TypeScript 7.1.0 Beta. Perubahan tersebut tidak menambahkan deklarasi import CSS atau teks bawaan ke pustaka standar, sehingga proyek dan tooling tetap perlu mendefinisikan modul ambient yang diperlukan.

## Sumber

Baca pull request TypeScript yang telah digabungkan: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
