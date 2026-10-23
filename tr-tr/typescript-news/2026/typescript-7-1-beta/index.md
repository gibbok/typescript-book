# TypeScript 7.1 Beta modüler API'ler ve ES2026 desteği sunuyor


**Yayımlanma tarihi:** 20 Ekim 2026

Microsoft, yeni yerel derleyici API'leri ve JavaScript özellikleri desteğiyle TypeScript 7.1 Beta'yı yayımladı. Beta sürümünü denemek için:

```shell
npm install -D typescript@beta
```

## Neler değişti?

* `--target es2026` ve `--lib es2026` artık güncellenmiş standart kitaplık bildirimleriyle kararlı seçenekler olarak destekleniyor.
* Yeni API giriş noktaları arasında `typescript/sync`, `typescript/async`, `typescript/fs` ve `typescript/ast` bulunuyor. `API` ve `Program` nesneleri, örneğin `using` ile serbest bırakılmalıdır.
* Kaynak aşaması içe aktarımları (`import source` ve `import.source()`), WebAssembly dahil modül kaynak nesnelerini uygun `--module` ve `esnext` ayarlarıyla destekler.
* İçerik eşleyicileri, `.vue` ve `.svelte` gibi dosyalara gömülü TypeScript kodunu erişilebilir kılar. Komut satırında çalıştırmak için `--runExternalCode` gerekir.
* Microsoft'un yayımladığı karşılaştırmalı testlerde derlemeler TypeScript 7.0'a göre daha hızlı ve daha az bellek kullanıyor.

## Kullanılabilirlik

Bu kararlı sürüm değil, beta sürümüdür. Yükseltmeden önce çerçeve ve araç uyumluluğunu kontrol edin. Ambient modüllerde içe aktarma öznitelikleri ayrı bir haberde ele alındı.

## Kaynak

Resmî duyuruyu okuyun: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
