# 名前付きタプル型（ラベル付き）



タプル型には、各要素にオプショナルなラベルまたは名前を含めることができます。これらのラベルは可読性とツールによる支援のためのものであり、タプルに対して実行できる操作には影響しません。

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

