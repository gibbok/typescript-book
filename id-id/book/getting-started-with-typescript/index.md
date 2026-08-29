# Memulai dengan TypeScript



### Instalasi

Visual Studio Code menyediakan dukungan yang sangat baik untuk bahasa TypeScript, tetapi tidak menyertakan compiler TypeScript. Untuk menginstal compiler TypeScript, Anda dapat menggunakan package manager seperti npm atau yarn:

```shell
npm install typescript --save-dev
```

atau

```shell
yarn add typescript --dev
```

Pastikan untuk melakukan commit pada lockfile yang dihasilkan guna memastikan bahwa setiap anggota tim menggunakan versi TypeScript yang sama.

Untuk menjalankan compiler TypeScript, Anda dapat menggunakan perintah berikut:

```shell
npx tsc
```

atau

```shell
yarn tsc
```

Disarankan untuk menginstal TypeScript per proyek, bukan secara global, karena hal ini memberikan proses build yang lebih mudah diprediksi. Namun, untuk penggunaan sesekali, Anda dapat menggunakan perintah berikut:

```shell
npx tsc
```

atau menginstalnya secara global:

```shell
npm install -g typescript
```

Jika Anda menggunakan Microsoft Visual Studio, Anda dapat memperoleh TypeScript sebagai paket di NuGet untuk proyek MSBuild Anda. Di NuGet Package Manager Console, jalankan perintah berikut:

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

Selama instalasi TypeScript, dua executable akan diinstal: "tsc" sebagai compiler TypeScript dan "tsserver" sebagai server mandiri TypeScript. Server mandiri tersebut berisi compiler dan layanan bahasa yang dapat dimanfaatkan oleh editor dan IDE untuk menyediakan pelengkapan kode cerdas.

Selain itu, tersedia beberapa transpiler yang kompatibel dengan TypeScript, seperti Babel (melalui plugin) atau swc. Transpiler ini dapat digunakan untuk mengonversi kode TypeScript ke bahasa atau versi target lainnya.

TypeScript 7.0 ditulis ulang dalam Go sebagai implementasi native dari compiler dan layanan bahasa. TypeScript menggunakan multithreading dengan memori bersama dan pengoptimalan lain untuk mempercepat build penuh serta fitur editor, sehingga mengurangi waktu tunggu umpan balik selama pengembangan.

Beberapa fitur performa TypeScript 7.0 dapat disesuaikan. Pemeriksaan tipe dapat berjalan dalam worker paralel dengan `--checkers`; lebih banyak worker dapat mempercepat proyek besar, tetapi menggunakan lebih banyak memori. Mode `--watch` yang dibangun ulang meningkatkan pemantauan berkas lintas platform. TypeScript 7.0 belum menyertakan compiler API (per Juli 2026), sehingga tool yang masih memerlukan API TypeScript 6.0 dapat berjalan berdampingan dengan TypeScript 7.0 menggunakan `@typescript/typescript6` atau alias npm.

### Konfigurasi

TypeScript dapat dikonfigurasi menggunakan opsi CLI `tsc` atau dengan memanfaatkan berkas konfigurasi khusus bernama `tsconfig.json` yang ditempatkan di root proyek.

Untuk menghasilkan berkas `tsconfig.json` yang telah diisi sebelumnya dengan pengaturan yang direkomendasikan, Anda dapat menggunakan perintah berikut:

```shell
tsc --init
```

Saat menjalankan perintah `tsc` secara lokal, TypeScript akan mengompilasi kode menggunakan konfigurasi yang ditentukan dalam berkas `tsconfig.json` terdekat.

Berikut adalah beberapa contoh perintah CLI yang dijalankan dengan pengaturan default:

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### Berkas Konfigurasi TypeScript

Berkas `tsconfig.json` digunakan untuk mengonfigurasi Compiler TypeScript (`tsc`). Biasanya, berkas ini ditambahkan ke root proyek bersama dengan berkas `package.json`.

Catatan:

* `tsconfig.json` menerima komentar meskipun menggunakan format JSON.
* Sebaiknya gunakan berkas konfigurasi ini sebagai pengganti opsi baris perintah.

Pada tautan berikut, Anda dapat menemukan dokumentasi lengkap beserta skemanya:

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

Berikut adalah daftar konfigurasi yang umum dan berguna:

#### target

Properti "target" digunakan untuk menentukan versi ECMAScript yang menjadi target keluaran hasil kompilasi kode TypeScript Anda. Untuk browser modern, ES6 merupakan pilihan yang baik. Catatan: Dukungan ES5 dihentikan secara bertahap pada TypeScript 6.0 dan tidak lagi didukung pada TypeScript 7.0.

#### lib

Properti "lib" digunakan untuk menentukan berkas pustaka yang akan disertakan pada waktu kompilasi. TypeScript secara otomatis menyertakan API untuk fitur yang ditentukan dalam properti "target", tetapi pustaka tertentu dapat dihilangkan atau dipilih untuk kebutuhan khusus. Misalnya, jika Anda mengerjakan proyek server, Anda dapat mengecualikan pustaka "DOM", yang hanya berguna dalam lingkungan browser.

#### strict

Opsi "strict" meningkatkan keamanan tipe dengan mengaktifkan pemeriksaan yang lebih ketat. Opsi ini diaktifkan secara default mulai TypeScript 6.0; jika tidak, Anda harus secara eksplisit mengaturnya menjadi `true` dalam `tsconfig.json`. Mengaktifkan "strict" memungkinkan TypeScript untuk:

* Menghasilkan kode menggunakan "use strict" untuk setiap berkas sumber.
* Mempertimbangkan "null" dan "undefined" dalam proses pemeriksaan tipe.
* Menonaktifkan penggunaan tipe "any" ketika tidak ada anotasi tipe.
* Menghasilkan error saat ekspresi "this" digunakan, yang jika tidak, akan menyiratkan tipe "any".

#### module

Properti "module" menetapkan sistem modul yang didukung untuk program hasil kompilasi. Pada saat runtime, module loader digunakan untuk menemukan dan menjalankan dependensi berdasarkan sistem modul yang ditentukan.

Module loader yang paling umum digunakan dalam JavaScript adalah CommonJS Node.js untuk aplikasi sisi server dan RequireJS untuk modul AMD dalam aplikasi web berbasis browser. TypeScript dapat menghasilkan kode untuk berbagai sistem modul, termasuk UMD, System, ESNext, ES2015/ES6, dan ES2020. Sistem modul harus dipilih berdasarkan lingkungan target dan mekanisme pemuatan modul yang tersedia dalam lingkungan tersebut.

Catatan: Dukungan untuk sistem modul lama (AMD, UMD, SystemJS) dihentikan secara bertahap pada TypeScript 6.0 dan tidak lagi didukung pada TypeScript 7.0.

#### moduleResolution

Properti "moduleResolution" menentukan strategi resolusi modul. Gunakan "nodenext" atau "bundler" untuk kode TypeScript modern. Strategi "classic" hanya digunakan untuk versi lama TypeScript (sebelum 1.6).

#### esModuleInterop

Properti "esModuleInterop" memungkinkan import default dari modul CommonJS yang tidak melakukan export menggunakan properti "default"; properti ini menyediakan shim untuk memastikan kompatibilitas dalam JavaScript yang dihasilkan. Setelah mengaktifkan opsi ini, kita dapat menggunakan `import MyLibrary from "my-library"` sebagai pengganti `import * as MyLibrary from "my-library"`.

"esModuleInterop" pada awalnya bersifat opsional untuk menghindari breaking change, tetapi sejak lama telah menjadi default yang direkomendasikan. Menonaktifkannya dapat menyebabkan masalah runtime yang tidak kentara saat menggunakan CommonJS dengan ESM. Catatan: Mulai TypeScript 6.0, perilaku interoperabilitas yang lebih aman ini selalu diaktifkan.

Pada TypeScript 6.0, beberapa opsi konfigurasi dan bentuk sintaks lama dihentikan secara bertahap atau tetap menggunakan perilaku lama selama masa transisi. Pada TypeScript 7.0, opsi dan bentuk tersebut menjadi hard error atau perilaku tanpa operasi.

Opsi dan bentuk yang dihentikan secara bertahap serta telah berubah menjadi hard error atau perilaku tanpa operasi adalah:

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`

* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* menonaktifkan `esModuleInterop` atau `allowSyntheticDefaultImports`
* menonaktifkan `alwaysStrict`
* kata kunci `module` dalam deklarasi namespace
* `asserts` pada impor
* `/// <reference no-default-lib />` di bawah `skipDefaultLibCheck`
* jalur berkas CLI dengan `tsconfig.json` lokal, kecuali jika `--ignoreConfig` digunakan

#### jsx

Properti "jsx" hanya berlaku untuk berkas `.tsx` yang digunakan dalam ReactJS dan mengendalikan cara konstruksi JSX dikompilasi menjadi JavaScript. Opsi yang umum adalah "preserve", yang akan mengompilasi menjadi berkas `.jsx` dengan mempertahankan JSX tanpa perubahan sehingga dapat diteruskan ke alat lain seperti Babel untuk transformasi lebih lanjut.

#### skipLibCheck

Properti "skipLibCheck" akan mencegah TypeScript melakukan pemeriksaan tipe terhadap keseluruhan paket pihak ketiga yang diimpor. Properti ini akan mengurangi waktu kompilasi suatu proyek. TypeScript tetap akan memeriksa kode Anda berdasarkan definisi tipe yang disediakan oleh paket-paket tersebut.

#### files

Properti "files" menunjukkan kepada compiler daftar berkas yang harus selalu disertakan dalam program.

#### include

<!-- markdownlint-disable MD049 -->
Properti "include" menunjukkan kepada compiler daftar berkas yang ingin kita sertakan. Properti ini memungkinkan pola seperti glob, misalnya "\*_" untuk subdirektori apa pun, "_" untuk nama berkas apa pun, dan "?" untuk karakter opsional.
<!-- markdownlint-enable MD049 -->

#### exclude

Properti "exclude" menunjukkan kepada compiler daftar berkas yang tidak boleh disertakan dalam kompilasi. Ini dapat mencakup berkas seperti "node_modules" atau berkas pengujian.
Catatan: `tsconfig.json` mengizinkan komentar.

### importHelpers

TypeScript menggunakan kode bantuan saat menghasilkan kode untuk fitur JavaScript tingkat lanjut tertentu atau fitur yang diturunkan ke versi yang lebih lama. Secara default, kode bantuan ini diduplikasi dalam berkas yang menggunakannya. Sebagai gantinya, opsi `importHelpers` mengimpor kode bantuan tersebut dari modul `tslib`, sehingga keluaran JavaScript menjadi lebih efisien.

### Saran Migrasi ke TypeScript

Untuk proyek besar, disarankan untuk menerapkan transisi bertahap, dengan kode TypeScript dan JavaScript pada awalnya digunakan secara berdampingan. Hanya proyek kecil yang dapat dimigrasikan ke TypeScript sekaligus.

Langkah pertama dalam transisi ini adalah memperkenalkan TypeScript ke dalam proses rantai build. Hal ini dapat dilakukan dengan menggunakan opsi compiler "allowJs", yang memungkinkan berkas `.ts` dan `.tsx` digunakan secara berdampingan dengan berkas JavaScript yang sudah ada. Karena TypeScript akan menggunakan tipe "any" sebagai pilihan terakhir untuk suatu variabel ketika tidak dapat menyimpulkan tipenya dari berkas JavaScript, disarankan untuk menonaktifkan "noImplicitAny" dalam opsi compiler Anda pada awal migrasi.

Langkah kedua adalah memastikan bahwa pengujian JavaScript Anda dapat berjalan bersama berkas TypeScript sehingga Anda dapat menjalankan pengujian saat mengonversi setiap modul. Jika Anda menggunakan Jest, pertimbangkan untuk menggunakan `ts-jest`, yang memungkinkan Anda menguji proyek TypeScript dengan Jest.

Langkah ketiga adalah menyertakan deklarasi tipe untuk pustaka pihak ketiga dalam proyek Anda. Deklarasi ini dapat ditemukan dalam paket pustaka atau di DefinitelyTyped. Anda dapat mencarinya melalui [https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) dan menginstalnya dengan:

```shell
npm install --save-dev @types/package-name
```

atau

```shell
yarn add --dev @types/package-name
```

Langkah keempat adalah melakukan migrasi modul demi modul dengan pendekatan dari bawah ke atas, mengikuti grafik dependensi Anda yang dimulai dari simpul daun. Tujuannya adalah memulai dengan mengonversi modul yang tidak bergantung pada modul lain. Untuk memvisualisasikan grafik dependensi, Anda dapat menggunakan alat "madge".

Modul yang cocok untuk konversi awal ini adalah fungsi utilitas dan kode yang terkait dengan API atau spesifikasi eksternal. Definisi tipe TypeScript dapat dibuat secara otomatis dari kontrak Swagger, skema GraphQL, atau skema JSON untuk disertakan dalam proyek Anda.

Jika tidak tersedia spesifikasi atau skema resmi, Anda dapat membuat tipe dari data mentah, seperti JSON yang dikembalikan oleh server. Namun, disarankan untuk membuat tipe dari spesifikasi, bukan dari data, agar kasus khusus tidak terlewat.

Selama migrasi, hindari refactoring kode dan berfokuslah hanya pada penambahan tipe ke modul Anda.

Langkah kelima adalah mengaktifkan "noImplicitAny", yang akan memastikan bahwa semua tipe diketahui dan didefinisikan, sehingga memberikan pengalaman penggunaan TypeScript yang lebih baik bagi proyek Anda.

Selama migrasi, Anda dapat menggunakan direktif `@ts-check`, yang mengaktifkan pemeriksaan tipe TypeScript dalam berkas JavaScript. Direktif ini menyediakan pemeriksaan tipe yang lebih longgar dan pada tahap awal dapat digunakan untuk mengidentifikasi masalah dalam berkas JavaScript. Ketika `@ts-check` disertakan dalam suatu berkas, TypeScript akan mencoba menyimpulkan definisi menggunakan komentar bergaya JSDoc. Namun, pertimbangkan untuk menggunakan anotasi JSDoc hanya pada tahap yang sangat awal dalam migrasi.

Pertimbangkan untuk mempertahankan nilai default `noEmitOnError` dalam `tsconfig.json` sebagai `false`. Ini akan memungkinkan Anda menghasilkan kode sumber JavaScript meskipun terdapat error yang dilaporkan.

