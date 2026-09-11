# TypeScript 原生 API 新增分层虚拟文件系统


**发布日期：** 2026 年 9 月 9 日

TypeScript 原生 API 现在可以使用显式的虚拟文件系统数据创建和更新快照。这使工具能够在不重新构建整个文件系统输入的情况下表示文件新增、修改和删除。

## 变化内容

新增的 `createFileSystem`、`createFileSystemWithLib` 和 `createFileSystemLayer` 辅助函数用于创建快照 API 接受的 VFS 对象。`Snapshot.update` 可以在现有快照之上应用新的缓存层。

`full` VFS 完全驻留在内存中，不会回退到宿主或会话文件系统回调。`layer` VFS 会在缓存未命中时回退，并可使用 `removedPaths` 隐藏宿主上存在的文件或目录。两种形式都支持虚拟文件系统内部以及指向宿主路径的符号链接。

## 当前限制

由 VFS 支持的快照仍被视为真实快照，因此原生 API 目前仍限制同一时间只能存在一个真实快照。快照操作暂时仍需串行执行。

## 来源

阅读已合并的 TypeScript 拉取请求： [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
