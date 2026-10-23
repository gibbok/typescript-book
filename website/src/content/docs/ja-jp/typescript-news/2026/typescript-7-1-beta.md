---
title: "TypeScript 7.1 Beta、モジュール化された API と ES2026 対応を追加"
description: "TypeScript 7.1 Beta はモジュール化されたネイティブ API、ES2026、ソースインポート、コンテンツマッパー、性能改善を導入します。"
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**公開日:** 2026年10月20日

Microsoft は、新しいネイティブコンパイラー API と JavaScript 機能への対応を含む TypeScript 7.1 Beta を公開しました。ベータ版は次のコマンドで試せます。

```shell
npm install -D typescript@beta
```

## 主な変更点

* `--target es2026` と `--lib es2026` が安定したオプションとしてサポートされ、標準ライブラリの宣言も更新されました。
* 新しい API のエントリーポイントには `typescript/sync`、`typescript/async`、`typescript/fs`、`typescript/ast` があります。`API` と `Program` オブジェクトは、例えば `using` で破棄する必要があります。
* ソースフェーズインポート（`import source` と `import.source()`）では、WebAssembly などに使うモジュールソースオブジェクトを取得できます。適切な `--module` と `esnext` の設定が必要です。
* コンテンツマッパーにより、`.vue` や `.svelte` などのファイルに埋め込まれた TypeScript を扱えます。コマンドラインからの実行には `--runExternalCode` が必要です。
* Microsoft が公開したベンチマークでは、TypeScript 7.0 よりビルドが高速化し、メモリ使用量も減少しています。

## 提供状況

これはベータ版であり、安定版ではありません。更新前にフレームワークとツールの互換性を確認してください。ambient モジュールのインポート属性対応は別の記事で紹介しています。

## 出典

公式発表を参照： [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
