---
title: "TypeScript 7.1 Beta wprowadza modułowe API i obsługę ES2026"
description: "TypeScript 7.1 Beta dodaje modułowe natywne API, ES2026, importy źródłowe, mapery zawartości i optymalizacje."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Opublikowano:** 20 października 2026

Microsoft wydał TypeScript 7.1 Beta z nowymi natywnymi API kompilatora i obsługą funkcji JavaScript. Wersję beta można wypróbować poleceniem:

```shell
npm install -D typescript@beta
```

## Co się zmieniło

* `--target es2026` i `--lib es2026` są teraz stabilnymi opcjami z uaktualnionymi deklaracjami biblioteki standardowej.
* Nowe punkty wejścia API to `typescript/sync`, `typescript/async`, `typescript/fs` i `typescript/ast`. Obiekty `API` i `Program` trzeba zwalniać, na przykład przez `using`.
* Importy fazy źródłowej (`import source` i `import.source()`) obsługują obiekty źródeł modułów, także dla WebAssembly, przy odpowiednich ustawieniach `--module` i `esnext`.
* Mapery zawartości udostępniają TypeScript osadzony w plikach takich jak `.vue` i `.svelte`. Uruchamianie z wiersza poleceń wymaga `--runExternalCode`.
* Według benchmarków opublikowanych przez Microsoft kompilacje są szybsze i zużywają mniej pamięci niż w TypeScript 7.0.

## Dostępność

To wersja beta, a nie stabilne wydanie. Przed aktualizacją sprawdź zgodność frameworków i narzędzi. Atrybuty importu w modułach ambient opisano w osobnym artykule.

## Źródło

Przeczytaj oficjalne ogłoszenie: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
