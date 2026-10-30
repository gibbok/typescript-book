---
title: "Natywny kompilator TypeScript otrzymuje eksperymentalną obsługę WebAssembly"
description: "Scalona zmiana TypeScript dodaje eksperymentalne kompilacje WASI WebAssembly dla CLI, serwera językowego i API JavaScript w przeglądarce."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Opublikowano:** 2026-10-29

29 października 2026 r. Microsoft scalił eksperymentalną obsługę `wasip1/wasm` w natywnym kompilatorze TypeScript. Zmiana umożliwia uruchamianie kompilatora w środowiskach WASI oraz korzystanie z transportu API JavaScript w przeglądarce.

## Co się zmieniło

* Ten sam `tsc.wasm` może działać jako polecenie WASI dla CLI lub serwera językowego albo jako reactor obsługujący synchroniczne i asynchroniczne wywołania API JavaScript.
* Nowy pakiet artefaktów `@typescript/typescript-wasip1-wasm` zawiera kompilator WebAssembly i pliki bibliotek. Host `typescript/wasm` udostępnia `instantiateWasm` i `instantiateWasmSync`; oba pakiety muszą mieć dokładnie tę samą wersję.
* Rozszerzenie VS Code for Web zyskuje punkt wejścia uruchamiający `tsc.wasm --lsp`. Zmiana obejmuje testy API w Node.js i testy dymne w przeglądarce Chromium.

## Dostępność

To scalona zmiana eksperymentalna, a nie ogłoszenie stabilnej wersji WebAssembly. Plik binarny, struktura pakietu i host `typescript/wasm` mogą zmienić się bez ostrzeżenia.

## Źródło

[Przeczytaj scalony pull request TypeScript](https://github.com/microsoft/TypeScript/pull/64174).
