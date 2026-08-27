---
title: TypeScript 7 のネイティブツール群を統合へ
description: TypeScript のメンテナーは、tsgo という名称を廃止し、ネイティブコードベースを TypeScript のメインリポジトリに戻し、ネイティブ VS Code 拡張機能をバンドルする方針を明らかにしました。
lastUpdated: 2026-07-27
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-27'
---

**公開日:** 2026年7月27日

TypeScript のメンテナーは、安定版リリース後に TypeScript 7 のネイティブツール群をどのように統合するかを明らかにしました。

## 変更点

Ryan Cavanaugh は、`tsgo` という名称が事実上廃止されたことを確認しました。プロジェクトが課題のバックログを再び一元化できるよう、ネイティブコードベースは `microsoft/TypeScript` のメインリポジトリへ戻される見込みです。

Jake Bailey は、ネイティブ VS Code 拡張機能を非推奨にする予定はないことも明らかにしました。代わりに、JavaScript デバッガー拡張機能と同様に、近い将来バンドルされる見込みです。

開発者にとってこれは、個別のプレビュー版の名称とリポジトリが、TypeScript 7 への移行に伴う暫定的なものであり、長期的に想定されているプロジェクト構成ではないことを意味します。

## 出典

メンテナーによる議論: [Now that TypeScript 7.0 has been released, what will happen to typescript-go?](https://github.com/microsoft/typescript-go/discussions/4576)
