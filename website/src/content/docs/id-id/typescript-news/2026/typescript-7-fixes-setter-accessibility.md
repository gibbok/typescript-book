---
title: TypeScript 7 memperbaiki aksesibilitas setter pada union dan intersection
description: Pemeriksa native kini memisahkan aksesibilitas setter dari aksesibilitas getter pada properti union dan intersection.
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Diterbitkan:** 24 Agustus 2026

Microsoft menggabungkan perbaikan pemeriksa TypeScript native yang memisahkan akses baca dan tulis untuk properti yang dihasilkan dari union dan intersection.

## Perubahan

Sebelumnya, aksesibilitas setter dapat diabaikan untuk properti sintetis ini karena pemeriksaan pada dasarnya menggunakan aksesibilitas getter. Getter publik yang dipasangkan dengan setter terlindungi karena itu dapat mengizinkan penulisan yang tidak valid melalui union atau intersection.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

Pemeriksa kini mencatat aksesibilitas tulis secara terpisah. Membaca `foo` tetap valid, sedangkan menetapkan nilai ke properti tersebut kini melaporkan error aksesibilitas dengan benar.

## Mengapa ini penting

Class dapat sengaja mengekspos pembacaan publik sekaligus membatasi penulisan. Perbaikan ini mempertahankan batas tersebut ketika TypeScript menggabungkan object type menjadi union atau intersection, alih-alih secara tidak sengaja memperluas akses tulis.

## Ketersediaan

Perubahan ini digabungkan ke codebase TypeScript native setelah TypeScript 7.0. Sumbernya tidak menyebutkan versi npm stabil yang menyertakannya, jadi periksa catatan rilis untuk versi yang terpasang sebelum mengandalkan perilaku ini.

## Sumber

Baca pull request TypeScript yang telah digabungkan: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
