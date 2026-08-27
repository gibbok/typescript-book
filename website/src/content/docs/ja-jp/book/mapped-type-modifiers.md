---
title: マップ型の修飾子
sidebar:
  order: 39
  label: 39. マップ型の修飾子
---


TypeScript のマップ型の修飾子を使用すると、既存の型内のプロパティを変換できます。

* `readonly` または `+readonly`: マップ型のプロパティを読み取り専用にします。
* `-readonly`: マップ型のプロパティを変更可能にします。
* `?`: マップ型のプロパティをオプショナルに指定します。

例:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

