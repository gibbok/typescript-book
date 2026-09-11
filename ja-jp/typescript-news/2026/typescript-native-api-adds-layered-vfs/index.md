# TypeScript ネイティブ API にレイヤー型仮想ファイルシステムが追加


**公開日:** 2026年9月9日

TypeScript ネイティブ API で、明示的な仮想ファイルシステムのデータを使ってスナップショットを作成・更新できるようになりました。ツールはファイルシステム入力全体を作り直さずに、ファイルの追加、編集、削除を表現できます。

## 変更点

新しい `createFileSystem`、`createFileSystemWithLib`、`createFileSystemLayer` ヘルパーは、スナップショット API が受け取る VFS オブジェクトを作成します。`Snapshot.update` は既存のスナップショットに新しいキャッシュレイヤーを適用できます。

`full` VFS は完全にメモリ内にあり、ホストまたはセッションのファイルシステムコールバックへフォールバックしません。`layer` VFS はキャッシュミス時にホストへフォールバックし、`removedPaths` でホスト上に存在するファイルやディレクトリを隠せます。どちらも仮想ファイルシステム内およびホストパスへのシンボリックリンクをサポートします。

## 現在の制限

VFS を使うスナップショットも引き続き「実際の」スナップショットとして数えられるため、ネイティブ API では同時に 1 つの実スナップショットしか保持できない現在の制限が残ります。そのため、スナップショット操作は当面直列です。

## 出典

マージ済みの TypeScript pull request を参照してください: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
