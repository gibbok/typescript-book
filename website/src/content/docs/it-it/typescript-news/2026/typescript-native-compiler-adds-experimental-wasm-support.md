---
title: "Il compilatore nativo TypeScript aggiunge il supporto sperimentale a WebAssembly"
description: "Una modifica a TypeScript introduce build WASI WebAssembly sperimentali per CLI, language server e API JavaScript nel browser."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Pubblicato:** 2026-10-29

Il 29 ottobre 2026 Microsoft ha integrato il supporto sperimentale a `wasip1/wasm` nel compilatore nativo TypeScript. La modifica permette di eseguire il compilatore in ambienti WASI e introduce un trasporto per le API JavaScript utilizzabile nel browser.

## Cosa cambia

* Lo stesso `tsc.wasm` può funzionare come comando WASI per la CLI o il language server, oppure come reactor per chiamate sincrone e asincrone alle API JavaScript.
* Il nuovo pacchetto di artefatti `@typescript/typescript-wasip1-wasm` contiene il compilatore WebAssembly e i file delle librerie. L'host `typescript/wasm` espone `instantiateWasm` e `instantiateWasmSync`; i due pacchetti devono avere esattamente la stessa versione.
* L'estensione VS Code for Web ottiene un punto di ingresso che esegue `tsc.wasm --lsp`. La modifica include test delle API su Node.js e test smoke nel browser Chromium.

## Disponibilità

Si tratta di una modifica sperimentale già integrata, non dell'annuncio di una versione WebAssembly stabile. Il binario, la struttura del pacchetto e l'host `typescript/wasm` possono cambiare senza preavviso.

## Fonte

[Leggi la pull request TypeScript integrata](https://github.com/microsoft/TypeScript/pull/64174).
