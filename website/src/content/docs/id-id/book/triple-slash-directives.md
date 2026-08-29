---
title: Direktif Triple-Slash
sidebar:
  order: 60
  label: 60. Direktif Triple-Slash
---


Direktif triple-slash adalah komentar khusus yang memberikan instruksi kepada kompiler tentang cara memproses sebuah berkas. Direktif ini diawali dengan tiga garis miring berturut-turut (`///`), biasanya ditempatkan di bagian atas berkas TypeScript, dan tidak berpengaruh terhadap perilaku saat runtime.

Direktif triple-slash digunakan untuk mereferensikan dependensi eksternal, menentukan perilaku pemuatan modul, mengaktifkan atau menonaktifkan fitur kompiler tertentu, dan lainnya. Beberapa contohnya:

Mereferensikan berkas deklarasi:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Menunjukkan format modul:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Mengaktifkan opsi kompiler, dalam contoh berikut mode ketat:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

