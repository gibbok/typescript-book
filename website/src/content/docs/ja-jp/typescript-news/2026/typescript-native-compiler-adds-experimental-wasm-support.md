---
title: "TypeScript ネイティブコンパイラーに実験的な WebAssembly 対応が追加"
description: "TypeScript に、CLI・言語サーバー・ブラウザー内 JavaScript API 向けの実験的な WASI WebAssembly 対応がマージされました。"
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**公開日:** 2026-10-29

Microsoft は 2026 年 10 月 29 日、TypeScript ネイティブコンパイラーに実験的な `wasip1/wasm` 対応をマージしました。これにより WASI ホストでコンパイラーを実行でき、ブラウザーでも利用可能な JavaScript API トランスポートが追加されます。

## 変更点

* 同じ `tsc.wasm` を、CLI や言語サーバー用の WASI コマンドとして、または同期・非同期 JavaScript API 呼び出し用の reactor として実行できます。
* 新しい成果物パッケージ `@typescript/typescript-wasip1-wasm` には WebAssembly コンパイラーとライブラリーファイルが含まれます。`typescript/wasm` ホストは `instantiateWasm` と `instantiateWasmSync` を提供し、両パッケージは完全に同じバージョンを使う必要があります。
* VS Code for Web 拡張機能には `tsc.wasm --lsp` を実行するエントリーポイントが追加されました。Node.js の API テストと Chromium のブラウザースモークテストも含まれます。

## 提供状況

これはマージ済みの実験的変更であり、安定版 WebAssembly のリリース発表ではありません。バイナリー、パッケージ構成、`typescript/wasm` ホストは予告なく変更される可能性があります。

## 出典

[マージされた TypeScript のプルリクエストを読む](https://github.com/microsoft/TypeScript/pull/64174).
