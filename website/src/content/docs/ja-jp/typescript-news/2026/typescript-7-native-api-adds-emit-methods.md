---
title: TypeScript 7 のネイティブ API に emit メソッドが追加
description: ネイティブ TypeScript API に、プログラム全体、および選択した JavaScript または宣言の出力を生成するための、ファイルシステム向けとインメモリ向けの emit メソッドが追加されました。
lastUpdated: 2026-07-24
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**公開日:** 2026年7月24日

ネイティブ TypeScript コードベースに、JavaScript または宣言の出力を生成する必要があるツール向けの、プログラムから利用できる emit API が追加されました。

## 変更点

マージされた API には、出力先と選択方法が異なる 4 つの emit 方法があります。

* `program.emit(emitOnly?: EmitOnly)` は、設定された仮想ファイルシステムを含むファイルシステムにプログラム全体を出力し、`noEmit` や `noEmitOnError` などの emit を抑止するオプションに従います。
* `program.emitToString(emitOnly?: EmitOnly)` は、プログラム全体をインメモリの文字列結果として出力し、emit を抑止するオプションにも従います。
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` は、選択したファイルの JavaScript 出力をメモリ内で返し、emit を抑止するオプションを適用しません。
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` は、選択したファイルに対応する宣言出力を提供します。

これにより、API の利用側は、通常のプログラム全体の emit と、対象を絞ったインメモリ出力を個別に選択できます。

## 利用可能性

この変更は 2026年7月24日にネイティブ TypeScript コードベースへマージされました。これらの API を含む安定版の npm バージョンは出典に記載されていないため、ツールは使用する TypeScript バージョンでの対応状況を確認する必要があります。

## 出典

公式プルリクエスト: [API emit](https://github.com/microsoft/typescript-go/pull/4699)
