---
title: "TypeScript yerel derleyicisine deneysel WebAssembly desteği eklendi"
description: "Birleştirilen TypeScript değişikliği, CLI, dil sunucusu ve tarayıcı JavaScript API'si için deneysel WASI WebAssembly derlemeleri ekliyor."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Yayımlanma:** 2026-10-29

Microsoft, 29 Ekim 2026'da yerel TypeScript derleyicisine deneysel `wasip1/wasm` desteğini birleştirdi. Bu değişiklik, derleyicinin WASI ortamlarında çalışmasını ve tarayıcıda kullanılabilen bir JavaScript API aktarımını sağlıyor.

## Neler değişti

* Aynı `tsc.wasm`, CLI veya dil sunucusu için WASI komutu olarak ya da eşzamanlı ve eşzamansız JavaScript API çağrıları için reactor olarak çalışabilir.
* Yeni `@typescript/typescript-wasip1-wasm` yapıt paketi, WebAssembly derleyicisini ve kütüphane dosyalarını içerir. `typescript/wasm` ana bilgisayarı `instantiateWasm` ve `instantiateWasmSync` sağlar; iki paket tam olarak aynı sürümü kullanmalıdır.
* VS Code for Web uzantısına `tsc.wasm --lsp` çalıştıran bir giriş noktası eklendi. Değişiklik, Node.js API testlerini ve Chromium tarayıcı duman testlerini içeriyor.

## Kullanılabilirlik

Bu, birleştirilmiş deneysel bir değişikliktir; kararlı bir WebAssembly sürümünün duyurusu değildir. İkili dosya, paket yapısı ve `typescript/wasm` ana bilgisayarı önceden haber verilmeden değişebilir.

## Kaynak

[Birleştirilen TypeScript pull request'ini okuyun](https://github.com/microsoft/TypeScript/pull/64174).
