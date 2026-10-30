---
title: "TypeScripts inbyggda kompilator får experimentellt WebAssembly-stöd"
description: "En sammanslagen TypeScript-ändring ger experimentella WASI WebAssembly-byggen för CLI, språkserver och JavaScript-API i webbläsaren."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Publicerad:** 2026-10-29

Den 29 oktober 2026 slog Microsoft samman experimentellt stöd för `wasip1/wasm` i TypeScripts inbyggda kompilator. Ändringen gör det möjligt att köra kompilatorn i WASI-miljöer och ger ett JavaScript-API med transport som fungerar i webbläsaren.

## Vad har ändrats

* Samma `tsc.wasm` kan köras som ett WASI-kommando för CLI eller språkservern, eller som en reactor för synkrona och asynkrona anrop till JavaScript-API:et.
* Det nya artefaktpaketet `@typescript/typescript-wasip1-wasm` innehåller WebAssembly-kompilatorn och biblioteksfiler. Värden `typescript/wasm` tillhandahåller `instantiateWasm` och `instantiateWasmSync`; båda paketen måste ha exakt samma version.
* Tillägget VS Code for Web får en startpunkt som kör `tsc.wasm --lsp`. Ändringen omfattar API-tester i Node.js och röktester i Chromium.

## Tillgänglighet

Detta är en experimentell sammanslagen ändring, inte en annonserad stabil WebAssembly-version. Binären, paketstrukturen och värden `typescript/wasm` kan ändras utan förvarning.

## Källa

[Läs den sammanslagna TypeScript-pull requesten](https://github.com/microsoft/TypeScript/pull/64174).
