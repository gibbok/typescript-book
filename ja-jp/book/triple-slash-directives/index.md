# トリプルスラッシュディレクティブ



トリプルスラッシュディレクティブは、ファイルの処理方法についてコンパイラに指示を与える特別なコメントです。これらのディレクティブは 3 つの連続するスラッシュ（`///`）で始まり、通常は TypeScript ファイルの先頭に配置され、実行時の動作には影響しません。

トリプルスラッシュディレクティブは、外部依存関係の参照、モジュール読み込み動作の指定、特定のコンパイラ機能の有効化または無効化などに使用されます。いくつか例を示します。

宣言ファイルの参照:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

モジュール形式の指定:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

コンパイラオプションの有効化。次の例では strict モード:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

