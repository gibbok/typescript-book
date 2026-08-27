---
title: TypeScript を始める
sidebar:
  order: 9
  label: 9. TypeScript を始める
---


### インストール

Visual Studio Code は TypeScript 言語を十分にサポートしていますが、TypeScript コンパイラは含まれていません。TypeScript コンパイラをインストールするには、npm や yarn などのパッケージマネージャーを使用できます。

```shell
npm install typescript --save-dev
```

または

```shell
yarn add typescript --dev
```

チームの全メンバーが同じバージョンの TypeScript を使用できるように、生成されたロックファイルを必ずコミットしてください。

TypeScript コンパイラを実行するには、次のコマンドを使用できます。

```shell
npx tsc
```

または

```shell
yarn tsc
```

より予測しやすいビルドプロセスになるため、TypeScript はグローバルではなくプロジェクト単位でインストールすることをお勧めします。ただし、一度限りの用途では次のコマンドを使用できます。

```shell
npx tsc
```

または、グローバルにインストールします。

```shell
npm install -g typescript
```

Microsoft Visual Studio を使用している場合、MSBuild プロジェクト向けの NuGet パッケージとして TypeScript を取得できます。NuGet パッケージマネージャーコンソールで、次のコマンドを実行します。

```shell
Install-Package Microsoft.TypeScript.MSBuild
```

TypeScript のインストール時には、TypeScript コンパイラである「tsc」と、TypeScript のスタンドアロンサーバーである「tsserver」の 2 つの実行ファイルがインストールされます。スタンドアロンサーバーにはコンパイラと言語サービスが含まれており、エディターや IDE がインテリジェントなコード補完を提供するために利用できます。

さらに、Babel（プラグイン経由）や swc など、TypeScript に対応したトランスパイラが複数あります。これらのトランスパイラを使用して、TypeScript コードを別のターゲット言語またはバージョンに変換できます。

TypeScript 7.0 では、コンパイラと言語サービスのネイティブ実装として Go で書き直されました。共有メモリによるマルチスレッド処理やその他の最適化を使用して、フルビルドとエディター機能を高速化し、開発中のフィードバック時間を短縮します。

TypeScript 7.0 の一部のパフォーマンス機能は調整できます。型チェックは `--checkers` を使用して複数のワーカーで並列実行できます。ワーカーを増やすと大規模プロジェクトを高速化できますが、使用するメモリも増えます。再構築された `--watch` モードにより、クロスプラットフォームのファイル監視が改善されています。TypeScript 7.0 には、現時点（2026 年 7 月）ではコンパイラ API が含まれていません。そのため、TypeScript 6.0 の API を引き続き必要とするツールは、`@typescript/typescript6` または npm エイリアスを使用することで TypeScript 7.0 と並行して実行できます。

### 構成

TypeScript は、tsc の CLI オプション、またはプロジェクトのルートに配置する tsconfig.json という専用の構成ファイルを使用して構成できます。

推奨設定があらかじめ入力された tsconfig.json ファイルを生成するには、次のコマンドを使用できます。

```shell
tsc --init
```

ローカルで `tsc` コマンドを実行すると、TypeScript は最も近い tsconfig.json ファイルで指定された構成を使用してコードをコンパイルします。

デフォルト設定で実行する CLI コマンドの例を以下に示します。

```shell
tsc main.ts // Compile a specific file (main.ts) to JavaScript
tsc src/*.ts // Compile any .ts files under the 'src' folder to JavaScript
tsc app.ts util.ts --outfile index.js // Compile two TypeScript files (app.ts and util.ts) into a single JavaScript file (index.js)
```

### TypeScript 構成ファイル

tsconfig.json ファイルは、TypeScript コンパイラ（tsc）の構成に使用します。通常は `package.json` ファイルとともに、プロジェクトのルートに追加します。

注意事項:

* tsconfig.json は json 形式ですが、コメントを使用できます。
* コマンドラインオプションの代わりに、この構成ファイルを使用することをお勧めします。

次のリンクでは、完全なドキュメントとそのスキーマを確認できます。

[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)

[https://www.typescriptlang.org/tsconfig/](https://www.typescriptlang.org/tsconfig/)

一般的で便利な構成の一覧を以下に示します。

#### target

「target」プロパティは、TypeScript コードの出力先またはコンパイル先となる ECMAScript のバージョンを指定するために使用します。モダンブラウザーでは ES6 が適切な選択肢です。注意: ES5 のサポートは TypeScript 6.0 で非推奨となり、TypeScript 7.0 ではサポートされなくなりました。

#### lib

「lib」プロパティは、コンパイル時に含めるライブラリファイルを指定するために使用します。TypeScript は「target」プロパティで指定された機能の API を自動的に含めますが、特定のニーズに応じて特定のライブラリを除外または選択できます。たとえば、サーバープロジェクトで作業している場合、ブラウザー環境でのみ有用な「DOM」ライブラリを除外できます。

#### strict

「strict」オプションは、より強力なチェックを有効にして型安全性を向上させます。TypeScript 6.0 以降ではデフォルトで有効です。それ以外の場合は、tsconfig.json で明示的に true に設定する必要があります。「strict」を有効にすると、TypeScript では次のようになります。

* 各ソースファイルで「use strict」を使用するコードを出力します。
* 型チェック処理で「null」と「undefined」を考慮します。
* 型注釈がない場合に「any」型の使用を無効にします。
* 「this」式の使用時にエラーを発生させます。そうしなければ「any」型であることが暗黙に示されます。

#### module

「module」プロパティは、コンパイルされたプログラムでサポートするモジュールシステムを設定します。実行時には、指定されたモジュールシステムに基づいて依存関係を特定し、実行するためにモジュールローダーが使用されます。

JavaScript で最も一般的に使用されるモジュールローダーは、サーバーサイドアプリケーション向けの Node.js CommonJS と、ブラウザーベースのウェブアプリケーションにおける AMD モジュール向けの RequireJS です。TypeScript は、UMD、System、ESNext、ES2015/ES6、ES2020 など、さまざまなモジュールシステム向けのコードを出力できます。モジュールシステムは、ターゲット環境と、その環境で利用できるモジュール読み込みの仕組みに基づいて選択する必要があります。

注意: 古いモジュールシステム（AMD、UMD、SystemJS）のサポートは TypeScript 6.0 で非推奨となり、TypeScript 7.0 ではサポートされなくなりました。

#### moduleResolution

「moduleResolution」プロパティは、モジュール解決戦略を指定します。モダンな TypeScript コードには「nodenext」または「bundler」を使用します。「classic」戦略は、古いバージョンの TypeScript（1.6 より前）でのみ使用されます。

#### esModuleInterop

「esModuleInterop」プロパティを使用すると、「default」プロパティを使用してエクスポートしていない CommonJS モジュールからデフォルトインポートができるようになります。このプロパティは、出力される JavaScript で互換性を確保するための shim を提供します。このオプションを有効にすると、`import MyLibrary from "my-library"` を使用でき、`import * as MyLibrary from "my-library"` を使用する必要がなくなります。

「esModuleInterop」は、破壊的変更を避けるために元々は任意で有効にするものでしたが、長い間推奨されるデフォルトとなっています。これを無効にすると、CommonJS と ESM を併用するときに分かりにくい実行時の問題が発生する可能性があります。注意: TypeScript 6.0 以降、このより安全な相互運用の振る舞いは常に有効です。

TypeScript 6.0 では、一部の古い構成オプションと構文形式が非推奨になったか、古い振る舞いを伴う移行の対象となりました。TypeScript 7.0 では、これらはハードエラーまたは何も行わない振る舞いになります。

ハードエラーまたは何も行わない振る舞いになった非推奨項目は、次のとおりです。

* `target: es5`
* `downlevelIteration`
* `moduleResolution: node/node10`
* `module: amd/umd/systemjs/none`
* `baseUrl`
* `moduleResolution: classic`
* `esModuleInterop` または `allowSyntheticDefaultImports` の無効化
* `alwaysStrict` の無効化
* 名前空間宣言内の `module` キーワード
* インポートでの `asserts`
* `/// <reference no-default-lib />`（`skipDefaultLibCheck` の下）
* ローカルの `tsconfig.json` を伴う CLI ファイルパス（`--ignoreConfig` を使用する場合を除く）

#### jsx

「jsx」プロパティは、ReactJS で使用される .tsx ファイルにのみ適用され、JSX 構造を JavaScript にコンパイルする方法を制御します。一般的なオプションは「preserve」です。これは JSX を変更せずに保持した .jsx ファイルへコンパイルするため、そのファイルを Babel などのさまざまなツールに渡して、さらに変換できます。

#### skipLibCheck

「skipLibCheck」プロパティを使用すると、インポートされたサードパーティパッケージ全体を TypeScript が型チェックしなくなります。このプロパティによって、プロジェクトのコンパイル時間が短縮されます。TypeScript は引き続き、これらのパッケージが提供する型定義に対してコードをチェックします。

#### files

「files」プロパティは、プログラムに常に含める必要があるファイルの一覧をコンパイラに示します。

#### include

<!-- markdownlint-disable MD049 -->
「include」プロパティは、含めたいファイルの一覧をコンパイラに示します。このプロパティでは、任意のサブディレクトリを表す「\*_」、任意のファイル名を表す「_」、オプショナルな文字を表す「?」など、glob に似たパターンを使用できます。
<!-- markdownlint-enable MD049 -->

#### exclude

「exclude」プロパティは、コンパイルに含めるべきでないファイルの一覧をコンパイラに示します。これには「node_modules」やテストファイルなどを含めることができます。
注意: tsconfig.json ではコメントを使用できます。

### importHelpers

TypeScript は、特定の高度な JavaScript 機能やダウンレベル化された JavaScript 機能のコードを生成するときに、ヘルパーコードを使用します。デフォルトでは、これらのヘルパーは使用するファイルごとに重複して含まれます。`importHelpers` オプションを使用すると、代わりに `tslib` モジュールからこれらのヘルパーをインポートし、JavaScript の出力をより効率的にできます。

### TypeScript への移行に関するアドバイス

大規模なプロジェクトでは、TypeScript コードと JavaScript コードが当初は共存する段階的な移行を採用することをお勧めします。TypeScript へ一度に移行できるのは小規模なプロジェクトだけです。

この移行の最初のステップは、ビルドチェーンの処理に TypeScript を導入することです。これは「allowJs」コンパイラオプションを使用して実現できます。このオプションにより、.ts および .tsx ファイルを既存の JavaScript ファイルと共存させることができます。TypeScript は JavaScript ファイルから型を推論できない変数に対して「any」型へフォールバックするため、移行の開始時にはコンパイラオプションの「noImplicitAny」を無効にすることをお勧めします。

2 番目のステップは、各モジュールを変換しながらテストを実行できるように、JavaScript のテストが TypeScript ファイルとともに動作することを確認することです。Jest を使用している場合は、Jest で TypeScript プロジェクトをテストできる `ts-jest` の使用を検討してください。

3 番目のステップは、サードパーティライブラリの型宣言をプロジェクトに含めることです。これらの宣言は、ライブラリに同梱されているか、DefinitelyTyped で見つけることができます。[https://www.typescriptlang.org/dt/search](https://www.typescriptlang.org/dt/search) を使用して検索し、次のコマンドでインストールできます。

```shell
npm install --save-dev @types/package-name
```

または

```shell
yarn add --dev @types/package-name
```

4 番目のステップは、依存関係グラフの末端から始め、ボトムアップのアプローチでモジュールごとに移行することです。ほかのモジュールに依存しないモジュールから変換を始めるという考え方です。依存関係グラフを可視化するには、「madge」ツールを使用できます。

このような初期変換に適したモジュールとしては、ユーティリティ関数や、外部 API または仕様に関連するコードが挙げられます。Swagger コントラクト、GraphQL、または JSON スキーマから TypeScript の型定義を自動生成し、プロジェクトに組み込むことが可能です。

仕様や公式スキーマが存在しない場合は、サーバーから返される JSON などの生データから型を生成できます。ただし、エッジケースの見落としを避けるため、データではなく仕様から型を生成することを推奨します。

移行中はコードのリファクタリングを控え、モジュールへの型の追加のみに集中してください。

5 番目のステップは「noImplicitAny」を有効にすることです。これにより、すべての型が既知で定義済みであることが強制され、プロジェクトでより良い TypeScript 開発体験を得られます。

移行中は、JavaScript ファイルで TypeScript の型チェックを有効にする `@ts-check` ディレクティブを使用できます。このディレクティブは緩やかな型チェックを提供し、最初の段階で JavaScript ファイル内の問題を特定するために使用できます。ファイルに `@ts-check` が含まれている場合、TypeScript は JSDoc 形式のコメントを使用して定義を推論しようとします。ただし、JSDoc アノテーションの使用は、移行のごく初期段階に限ることを検討してください。

tsconfig.json の `noEmitOnError` は、デフォルト値の false のままにすることを検討してください。これにより、エラーが報告された場合でも JavaScript ソースコードを出力できます。

