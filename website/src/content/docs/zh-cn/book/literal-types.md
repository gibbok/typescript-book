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

字符串、数字和布尔字面量类型用于联合、类型保护和类型别名。在下面的示例中，您可以看到类型别名联合，O可以是指定的唯一值，而不是任何其他字符串：

```typescript
type O = 'a' | 'b' | 'c';
```

