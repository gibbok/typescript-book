---
title: "Compilador nativo do TypeScript ganha suporte experimental a WebAssembly"
description: "Uma alteração no TypeScript adiciona builds WASI WebAssembly experimentais para CLI, servidor de linguagem e API JavaScript no navegador."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Publicado:** 2026-10-29

Em 29 de outubro de 2026, a Microsoft incorporou suporte experimental a `wasip1/wasm` no compilador nativo do TypeScript. A mudança permite executar o compilador em ambientes WASI e introduz um transporte para a API JavaScript utilizável no navegador.

## O que mudou

* O mesmo `tsc.wasm` pode funcionar como comando WASI para a CLI ou o servidor de linguagem, ou como reactor para chamadas síncronas e assíncronas à API JavaScript.
* O novo pacote de artefatos `@typescript/typescript-wasip1-wasm` contém o compilador WebAssembly e arquivos de biblioteca. O host `typescript/wasm` oferece `instantiateWasm` e `instantiateWasmSync`; os dois pacotes devem ter exatamente a mesma versão.
* A extensão VS Code for Web ganha um ponto de entrada que executa `tsc.wasm --lsp`. A alteração inclui testes de API no Node.js e testes de fumaça no navegador Chromium.

## Disponibilidade

Esta é uma alteração experimental incorporada, não um anúncio de versão estável do WebAssembly. O binário, a estrutura do pacote e o host `typescript/wasm` podem mudar sem aviso.

## Fonte

[Leia o pull request incorporado ao TypeScript](https://github.com/microsoft/TypeScript/pull/64174).
