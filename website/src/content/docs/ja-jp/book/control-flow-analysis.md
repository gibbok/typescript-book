---
title: 制御フロー解析
sidebar:
  order: 23
  label: 23. 制御フロー解析
---


TypeScript の制御フロー解析は、コードの流れを静的に解析して変数の型を推論する方法です。これにより、コンパイラは解析結果に基づいて必要に応じてそれらの変数の型を絞り込めます。

TypeScript 4.4 より前では、コードフロー解析は if 文内のコードにのみ適用されていましたが、TypeScript 4.4 以降では、const 変数を介して間接的に参照される条件式や判別プロパティへのアクセスにも適用できます。

例:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

型の絞り込みが行われない例をいくつか示します。

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

注: 条件式では、最大 5 段階の間接参照が解析されます。

