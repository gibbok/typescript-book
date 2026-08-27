# 読み取り専用プロパティ



修飾子 `readonly` を使用すると、プロパティへの書き込みを防止できます。これにより、そのプロパティが再度書き換えられないことは保証されますが、完全な不変性が保証されるわけではありません。

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

