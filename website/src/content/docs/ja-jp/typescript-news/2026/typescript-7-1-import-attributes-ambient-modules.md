---
title: TypeScript 7.1 が ambient module に import attributes を追加
description: TypeScript 7.1 では、パターン ambient module 宣言を import attributes に基づいて照合できます。
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**公開日:** 2026年9月1日

TypeScript のネイティブコンパイラは、パターン ambient module 宣言で import attributes の型をサポートするようになりました。これにより、`type: 'css'` や `type: 'text'` などの属性で import を区別できます。

## 変更点

import に属性がある場合、TypeScript は一致するパターン ambient module に解決できます。照合には代入可能性が使われ、複数の宣言が一致する場合は、最も具体的な属性型を持つ宣言が選択されます。

現時点では、これらの宣言の属性型は、値が文字列リテラル型である通常のプロパティに限定されます。同じパターンと同一の属性型を持つ宣言はマージできますが、異なる属性型は別々に扱われます。

## 互換性

この変更は TypeScript 7.1.0 Beta マイルストーン向けにマージされました。標準ライブラリに CSS やテキスト import の宣言が組み込まれるわけではないため、プロジェクトやツールは必要な ambient module を引き続き定義する必要があります。

## ソース

マージされた TypeScript の pull request を参照してください： [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
