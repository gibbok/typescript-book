# オプショナルプロパティ



オブジェクトでは、プロパティ名の末尾に疑問符 `?` を追加することで、オプショナルプロパティを指定できます。

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

プロパティがオプショナルの場合、デフォルト値を指定することもできます。

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

