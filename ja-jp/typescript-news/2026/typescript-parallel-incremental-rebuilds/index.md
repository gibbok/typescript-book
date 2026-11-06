# TypeScript、並列チェックでインクリメンタルビルドを高速化


コンパイラーにマージされた変更により、多数のファイルからインポートされるモジュールを編集した際、影響を受けるファイルのシグネチャを並列に確認できます。以前は逐次処理でした。

## 変更点

開発者のベンチマークでは、32 コアの Linux 環境でコメントのみを変更した後の再ビルドが **3.4 秒から 1.5 秒** に短縮されました。n8n のパッケージでは同様の処理が **5.4 秒から 4.5 秒** になりました。特定の負荷での結果であり、一般的な保証ではありません。

## 性能と制限

処理は `GOMAXPROCS` によって制限され、効果はチェッカー数と依存関係によって異なります。参照元ファイルをたどらない `isolatedModules` には効果がありません。

## 出典

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
