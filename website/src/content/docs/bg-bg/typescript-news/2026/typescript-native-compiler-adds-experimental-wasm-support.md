---
title: "Нативният компилатор на TypeScript получава експериментална поддръжка за WebAssembly"
description: "Обединена промяна в TypeScript добавя експериментален WASI WebAssembly за CLI, езиков сървър и JavaScript API в браузър."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Публикувано:** 2026-10-29

На 29 октомври 2026 г. Microsoft обедини експериментална поддръжка за `wasip1/wasm` в нативния компилатор на TypeScript. Промяната позволява работа в WASI среди и добавя транспорт за JavaScript API, който може да се използва в браузър.

## Какво се промени

* Един и същ `tsc.wasm` може да работи като WASI команда за CLI или езиков сървър, или като reactor за синхронни и асинхронни извиквания на JavaScript API.
* Новият пакет с артефакти `@typescript/typescript-wasip1-wasm` съдържа WebAssembly компилатора и библиотечните файлове. Хостът `typescript/wasm` предоставя `instantiateWasm` и `instantiateWasmSync`; двата пакета трябва да са с абсолютно еднаква версия.
* Разширението VS Code for Web получава входна точка, която стартира `tsc.wasm --lsp`. Промяната включва API тестове в Node.js и базови тестове в Chromium.

## Наличност

Това е обединена експериментална промяна, а не обявяване на стабилна WebAssembly версия. Двоичният файл, структурата на пакета и хостът `typescript/wasm` могат да се променят без предупреждение.

## Източник

[Прочетете обединената заявка за промяна в TypeScript](https://github.com/microsoft/TypeScript/pull/64174).
