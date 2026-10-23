# TypeScript ネイティブコンパイラ、型チェッカーの最適化でメモリ使用量を削減


**公開日:** 2026年10月14日

Microsoft は TypeScript のネイティブコンパイラに複数のメモリ最適化をマージしました。TypeScript の構文を変更せず、型チェッカー内部のデータ構造が保持するメモリを削減します。

## 変更点

* 型付きアリーナのチャンクは、固定の 256 オブジェクトではなく約 512 バイトを目標とするようになりました。この変更の VS Code ベンチマークでは、保持ヒープが 8.54%、ガベージコレクターのスキャン量が 10.44% 減少した一方、割り当てイベントは 13.91% 増加しました。
* オプションのシグネチャ、インデックス情報、ノードビルダーのキャッシュを `StructuredType` レコードから分離し、サイズを 144 バイトから 88 バイトに縮小しました。
* 安定したノード ID がある場合、解決済みの型ノードとシグネチャにはページ化されたノードリンクストアを使用し、その他の ID にはマップをフォールバックとして使用します。

## 利用可能性

これらの変更は 2026年10月14日にマージされました。元のプルリクエストには、変更を含む安定版 npm のバージョンは示されていません。ベンチマーク結果は、測定対象の変更とワークロードに限られます。

## ソース

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
