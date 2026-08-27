# 分配条件型



分配条件型は、ユニオンの各メンバーに個別に変換を適用することで、型のユニオン全体に型を分配できる機能です。
これは、マップ型や高階型を扱う際に特に便利です。

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

