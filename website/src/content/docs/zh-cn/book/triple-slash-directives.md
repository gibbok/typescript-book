---
title: 三斜杠指令
sidebar:
  order: 59
  label: 59. 三斜杠指令
---


三斜杠指令是特殊注释，为编译器提供有关如何处理文件的说明。这些指令以三个连续斜杠 (`///`) 开头，通常放置在 TypeScript 文件的顶部，对运行时行为没有影响。

三斜杠指令用于引用外部依赖项、指定模块加载行为、启用/禁用某些编译器功能等等。几个例子：

引用声明文件：

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

指明模块格式：

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

启用编译器选项，在以下示例中严格模式：

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

