---
title: TypeScript ニュース
description: TypeScript 開発者向けに、TypeScript の最新の公式リリース、発表、変更点を簡潔にまとめています。
sidebar:
    hidden: true
---

TypeScript の公式情報源に基づく簡潔な要約を通じて、重要なリリースやプロジェクトの最新情報を確認できます。

## 最新ニュース

### [TypeScript 7.1 が ambient module に import attributes を追加](./2026/typescript-7-1-import-attributes-ambient-modules/)

**公開日:** 2026年9月1日

パターン ambient module で import attributes の型を宣言できるようになり、TypeScript は import の属性に応じて型定義を選択できます。

### [TypeScript 7 が union と intersection の setter アクセス制御を修正](./2026/typescript-7-fixes-setter-accessibility/)

**公開日:** 2026年8月24日

ネイティブ型チェッカーが、union と intersection のプロパティで setter と getter のアクセス制御を個別に扱うようになりました。

### [TypeScript 7 にワークスペースシンボル検索のスコープが追加](./2026/typescript-7-workspace-symbol-search-scope/)

**公開日:** 2026年8月7日

ネイティブ言語サービスに、ワークスペースシンボルの検索範囲を、開いているすべてのプロジェクトではなく現在のプロジェクトに制限できる設定が追加されました。

### [TypeScript 7 で Go to Implementation のメモリ使用量が改善](./2026/typescript-7-go-to-implementation-memory-fix/)

**公開日:** 2026年7月30日

ネイティブ言語サービスは、大規模で型が深くネストしたプロジェクトにおいて、多数の実装を検索する際のメモリ使用量が二次関数的に増加する問題を回避するようになりました。

### [TypeScript 7 でファイル変更後に設定ファイルの診断情報を更新](./2026/typescript-7-refreshes-config-diagnostics/)

**公開日:** 2026年7月30日

ネイティブ言語サービスは、監視対象の設定ファイルが変更された後に、`tsconfig.json` と `jsconfig.json` のエラーを再公開するようになりました。

### [TypeScript 7 のネイティブツール群を統合へ](./2026/typescript-7-native-tooling-consolidates/)

**公開日:** 2026年7月27日

メンテナーは、`tsgo` という名称を廃止し、ネイティブコードベースを TypeScript のメインリポジトリに戻し、ネイティブ VS Code 拡張機能をバンドルする方針を明らかにしました。

### [TypeScript 7 のネイティブ API に emit メソッドが追加](./2026/typescript-7-native-api-adds-emit-methods/)

**公開日:** 2026年7月24日

ネイティブ TypeScript API に、プログラム全体、および選択した JavaScript または宣言の出力を生成するための、ファイルシステム向けとインメモリ向けの emit メソッドが追加されました。

### [TypeScript 7.0 が利用可能に](./2026/typescript-7-released/)

**公開日:** 2026年7月8日

TypeScript 7 では、Go で実装された新しいコンパイラと言語サービスが導入され、ビルドとエディタ操作が大幅に高速化されています。

### [TypeScript 7.0 リリース候補版を発表](./2026/typescript-7-release-candidate/)

**公開日:** 2026年6月18日

TypeScript チームは TypeScript 7 の最終プレビューを公開しました。並列型チェック、プロジェクトビルド、拡張されたエディタサポートが含まれています。
