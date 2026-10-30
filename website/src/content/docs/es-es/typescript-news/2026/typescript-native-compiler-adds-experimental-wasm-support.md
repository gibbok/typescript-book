---
title: "El compilador nativo de TypeScript incorpora soporte experimental para WebAssembly"
description: "Un cambio integrado en TypeScript añade compilaciones WASI WebAssembly experimentales para CLI, servidor de lenguaje y API JavaScript en el navegador."
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

El 29 de octubre de 2026, Microsoft integró soporte experimental para `wasip1/wasm` en el compilador nativo de TypeScript. El cambio permite ejecutar el compilador en entornos WASI e introduce un transporte para la API JavaScript utilizable en el navegador.

## Qué ha cambiado

* El mismo `tsc.wasm` puede ejecutarse como comando WASI para la CLI o el servidor de lenguaje, o como reactor para llamadas síncronas y asíncronas a la API JavaScript.
* El nuevo paquete de artefactos `@typescript/typescript-wasip1-wasm` contiene el compilador WebAssembly y los archivos de biblioteca. El host `typescript/wasm` proporciona `instantiateWasm` e `instantiateWasmSync`; ambos paquetes deben usar exactamente la misma versión.
* La extensión VS Code for Web incorpora un punto de entrada que ejecuta `tsc.wasm --lsp`. El cambio incluye pruebas de API en Node.js y pruebas de humo en Chromium.

## Disponibilidad

Se trata de un cambio experimental integrado, no del anuncio de una versión estable de WebAssembly. El binario, la estructura del paquete y el host `typescript/wasm` pueden cambiar sin previo aviso.

## Fuente

[Leer la solicitud de cambios integrada en TypeScript](https://github.com/microsoft/TypeScript/pull/64174).
