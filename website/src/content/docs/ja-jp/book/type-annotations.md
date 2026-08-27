---
title: 型アノテーション
sidebar:
  order: 12
  label: 12. 型アノテーション
---


`var`、`let`、`const` を使用して宣言した変数には、必要に応じて型を追加できます。

```typescript
const x: number = 1;
```

TypeScript は、特に単純な型については型推論を適切に行うため、ほとんどの場合、これらの宣言は必要ありません。

関数では、パラメーターに型アノテーションを追加できます。

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

次は、無名関数（ラムダ関数とも呼ばれます）を使用した例です。

```typescript
const sum = (a: number, b: number) => a + b;
```

パラメーターにデフォルト値がある場合、これらのアノテーションは省略できます。

```typescript
const sum = (a = 10, b: number) => a + b;
```

関数には戻り値の型アノテーションを追加できます。

```typescript
const sum = (a = 10, b: number): number => a + b;
```

これは、より複雑な関数で特に有用です。実装の前に戻り値の型を記述することで、関数について考えを整理しやすくなります。

一般には、型シグネチャには注釈を付ける一方、関数本体内のローカル変数には付けず、オブジェクトリテラルには常に型を追加することを検討してください。

