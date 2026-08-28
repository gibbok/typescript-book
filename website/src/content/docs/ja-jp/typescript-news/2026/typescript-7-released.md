---
title: TypeScript 7.0 が利用可能に
description: TypeScript 7.0 では、Go で実装されたネイティブコンパイラと言語サービスが導入され、ビルドとエディタのパフォーマンスが大幅に向上しています。
lastUpdated: 2026-07-08
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**公開日:** 2026年7月8日

Microsoft は、プロジェクトの新しい Go ベースのネイティブコードで構築された初の安定版である TypeScript 7.0 をリリースしました。

## 変更点

TypeScript 7 は、ネイティブコード、共有メモリによるマルチスレッド処理、その他の最適化を採用しています。TypeScript チームによると、公開されたベンチマークでは、フルビルドが TypeScript 6 と比較して 7.7 倍から 11.9 倍高速でした。

このリリースでは、言語サービスも Language Server Protocol へ移行しました。対応するエディタでは、同じネイティブ基盤を利用して、プロジェクトの読み込み、診断、補完、ナビゲーションを高速化できます。

安定版を npm からインストールします。

```shell
npm install --save-dev typescript
```

## 互換性

TypeScript 7.0 は、安定したプログラム API を提供していません。現在の Astro、Vue、MDX、Svelte、一部の Angular ワークフローなど、TypeScript を組み込むツールでは、新しい API が利用可能になるまで TypeScript 6 が必要となる場合があります。

TypeScript チームは、TypeScript 7.1 で新しい API を導入する見込みです。プロジェクトはアップグレードする前に、使用しているフレームワークとツールの対応状況を確認する必要があります。

## 出典

公式発表: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
