---
title: TypeScript 7 のネイティブ API に AST の子ノードとトークン取得メソッドが追加
description: TypeScript のネイティブ API に Node の子ノードとトークンを走査するメソッドが追加され、構文木ツール向けの JavaScript API との差が縮まりました。
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**公開日:** 2026年9月3日

TypeScript のネイティブ API で、子ノードとトークンを走査するための 5 つの `Node` ヘルパー、`getChildren()`、`getChildCount()`、`getChildAt()`、`getFirstToken()`、`getLastToken()` が利用できるようになりました。

## 変更内容

PR #63893 では、JavaScript ベースの TypeScript API にすでに存在する残りの子ノード／トークン getter が追加されました。位置とテキストの getter が先に追加されていたため、今回の変更でネイティブ `Node` API の子ノード／トークン関連機能が補完されます。

## 重要な理由

これらのメソッドは、構文木を走査する API 利用者、特にトークンと子ノードの両方を調べる必要があるツールに役立ちます。ネイティブ API でも、こうした用途で同じ `Node` 走査ヘルパーを使えるようになりました。

## ソース

[PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) と[追跡 issue](https://github.com/microsoft/TypeScript/issues/63892)を参照してください。
