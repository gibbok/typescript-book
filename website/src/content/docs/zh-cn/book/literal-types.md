---
title: 字面量类型
sidebar:
  order: 16
  label: 16. 字面量类型
---


文字类型是来自集体类型的单个元素集，它定义了一个非常精确的值，即 JavaScript 原始数据。

TypeScript 中的文字类型是数字、字符串和布尔值。

示例如下:

```typescript
const a = 'a'; // 字符串字面量类型
const b = 1; // 数字字面量类型
const c = true; // 布尔字面量类型
```

在以下示例中，您可以看到联合类型别名。`O` 仅包含指定的值，其他字符串均无效：

```typescript
type O = 'a' | 'b' | 'c';
```

