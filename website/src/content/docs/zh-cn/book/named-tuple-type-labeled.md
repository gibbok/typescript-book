---
title: 命名元组类型（已标记）
sidebar:
  order: 29
  label: 29. 命名元组类型（已标记）
---


元组类型可以包含每个元素的可选标签或名称。 这些标签用于提高可读性和工具帮助，不会影响您可以使用它们执行的操作。

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // 命名元组加匿名元组
```

