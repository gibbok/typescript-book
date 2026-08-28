---
title: TypeScript 7.0 リリース候補版を発表
description: TypeScript 7.0 リリース候補版では、ネイティブコンパイラ、並列ビルド、互換性の変更、拡張されたエディタサポートがプレビューされました。
lastUpdated: 2026-06-18
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**公開日:** 2026年6月18日

Microsoft は、TypeScript 7 安定版の前に提供する最後のプレビューとして、TypeScript 7.0 リリース候補版を公開しました。

## 変更点

このリリース候補版では、TypeScript が Go で実装された新しいコンパイラと言語サービスへ移行しました。既存のセマンティクスを維持しながら、ネイティブコードと共有メモリによる並列処理でパフォーマンスを向上させるため、型チェックのロジックは TypeScript 6 から移植されました。

TypeScript 7 では、並列型チェックとプロジェクト参照のビルドが追加されました。`--checkers` オプションは型チェックワーカーの数を制御し、`--builders` はプロジェクト参照ビルダーの数を制御します。

発表時点では、リリース候補版を npm からインストールできました。

```shell
npm install --save-dev typescript@rc
```

## 互換性

このリリース候補版には、安定したプログラム API は含まれていませんでした。TypeScript チームは、TypeScript 6 API を必要とするツールを新しいコンパイラと併用できるよう、`@typescript/typescript6` 互換パッケージを提供しました。

このリリース候補版では TypeScript 6 のデフォルト設定も採用され、TypeScript 6 で非推奨となったオプションはエラーとして扱われました。チームには、TypeScript 7 を評価する前に、まず TypeScript 6 へ移行することが推奨されました。

## 出典

公式発表: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/)
