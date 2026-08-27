---
title: 型述語
sidebar:
  order: 24
  label: 24. 型述語
---


TypeScript の型述語は、真偽値を返す関数で、変数の型をより具体的な型へ絞り込むために使用されます。

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 は、型述語（`x is T` など）を `.filter` などの関数内で自動的に推論します。そのため、undefined などの値が除外されたことを認識でき、型がより正確になってエラーが減ります。これは明確なチェック（例: `x !== undefined`）では機能しますが、`!!x` のような曖昧なチェックでは機能しません。

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

