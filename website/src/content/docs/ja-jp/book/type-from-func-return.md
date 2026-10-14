---
title: 関数の戻り値から型を取得する
sidebar:
  order: 36
  label: 36. 関数の戻り値から型を取得する
---


関数の戻り値から型を取得するとは、実装に基づいて関数の戻り値の型を自動的に推論する機能を指します。これにより TypeScript は、明示的な型アノテーションがなくても、関数が返す値の型を判断できます。

```typescript
const add = (x: number, y: number) => x + y; // TypeScript は関数の戻り値の型を number と推論できる
```

