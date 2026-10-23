# TypeScript 原生编译器通过类型检查器优化降低内存占用


**发布日期：** 2026 年 10 月 14 日

微软向 TypeScript 原生编译器合并了多项内存优化。这些改动减少类型检查器内部数据结构保留的内存，不改变 TypeScript 语法。

## 主要变化

* 类型化内存区域的分块现在以约 512 字节为目标，而不是固定容纳 256 个对象。在该改动的 VS Code 基准测试中，保留堆内存减少 8.54%，垃圾回收扫描量减少 10.44%，但分配事件增加 13.91%。
* 可选的签名、索引信息和节点构建器缓存从 `StructuredType` 记录中移出，使记录大小从 144 字节降至 88 字节。
* 当节点具有稳定 ID 时，已解析的类型节点和签名使用分页节点链接存储；其他 ID 仍可回退到映射表。

## 可用性

这些改动于 2026 年 10 月 14 日合并。源拉取请求未指定包含这些改动的稳定 npm 版本。基准测试结果仅适用于所测改动及工作负载。

## 来源

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
