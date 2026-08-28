---
title: TypeScript 7 が union と intersection の setter アクセス制御を修正
description: ネイティブ型チェッカーが、union と intersection のプロパティで setter と getter のアクセス制御を個別に扱うようになりました。
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**公開日:** 2026年8月24日

Microsoft は、union と intersection から合成されるプロパティについて、読み取りと書き込みのアクセス制御を別々に保持する TypeScript ネイティブ型チェッカーの修正をマージしました。

## 変更点

以前は、これらの合成プロパティで setter のアクセス制御が無視され、実質的に getter のアクセス制御で判定される場合がありました。そのため、public な getter と protected な setter の組み合わせでも、union または intersection を通じた無効な書き込みが許可されることがありました。

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

型チェッカーは書き込み側のアクセス制御を個別に記録するようになりました。`foo` の読み取りは引き続き有効ですが、代入には正しくアクセスエラーが報告されます。

## 重要な理由

クラスは読み取りを public にしつつ、書き込みを意図的に制限できます。この修正により、TypeScript がオブジェクト型を union や intersection にまとめても、その境界が維持され、書き込み権限が誤って広がることがなくなります。

## 利用可能性

この変更は TypeScript 7.0 の後にネイティブ TypeScript コードベースへマージされました。情報源では、この変更を含む安定版 npm バージョンは特定されていないため、この動作に依存する前にインストール済みバージョンのリリースノートを確認してください。

## 出典

マージ済みの TypeScript pull request を参照してください: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932)。
