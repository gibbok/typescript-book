---
title: リテラル推論
sidebar:
  order: 18
  label: 18. リテラル推論
---


リテラル推論は、変数またはパラメーターの型を、その値に基づいて推論できる TypeScript の機能です。

次の例では、値を後から変更できないため、TypeScript が `x` をリテラル型と見なすことが分かります。一方、`y` は後からいつでも変更できるため、文字列として推論されます。

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

次の例では、TypeScript が値は後からいつでも変更できると見なすため、`o.x` が `string` として（`a` のリテラルとしてではなく）推論されたことが分かります。

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

ご覧のとおり、X はより狭い型であるため、`o.x` を `fn` に渡すとコードはエラーを発生させます。

この問題は、`const` または `X` 型による型アサーションを使用することで解決できます。

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

または、次のようにします。

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

