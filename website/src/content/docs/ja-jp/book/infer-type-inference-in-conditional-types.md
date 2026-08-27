---
title: 条件型における infer 型推論
sidebar:
  order: 42
  label: 42. 条件型における infer 型推論
---


`infer` キーワードは、条件型において、依存する型からジェネリックパラメーターの型を推論（抽出）するために使用されます。これにより、より柔軟で再利用可能な型定義を記述できます。

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

