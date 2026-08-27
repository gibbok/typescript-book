---
title: 条件型
sidebar:
  order: 40
  label: 40. 条件型
---


条件型は条件に依存する型を作成する方法で、作成する型は条件の結果に基づいて決まります。`extends` キーワードと三項演算子を使用して定義し、2 つの型から条件に応じて 1 つを選択します。

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

