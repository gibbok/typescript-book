---
title: TypeScript ネイティブ API に typescript-eslint が必要とする API を追加
description: TypeScript ネイティブ API に typescript-eslint が必要とするチェッカーおよび型 API が追加され、ツール連携の互換性が向上します。
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**公開日:** 2026年9月14日

TypeScript ネイティブ API に、`typescript-eslint` が必要とする追加のチェッカーおよび型 API が公開され、TypeScript のプログラム API に依存するツールの互換性の差が縮まりました。

## 変更内容

`getAwaitedType`、`getContextualTypeForArgumentAtIndex`、`getIndexInfoOfType`、`getIndexTypeOfType`、`getTypeOfPropertyOfType`、`getExportSymbolOfSymbol` などの API が追加されました。インターフェース型とクラス型には `getThisType()` も追加され、インデックス型の問い合わせ用に `IndexKind` がエクスポートされます。

同期版と非同期版のネイティブ API の両方が更新されました。

## 重要な理由

この TypeScript の pull request は、`typescript-eslint` が不足していると特定した API を追加するために作成されました。これにより、統合ツールは従来の TypeScript API で期待していたチェッカーと型の情報をより多く利用できます。

## ソース

TypeScript の公式 pull request を参照してください: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264)。
