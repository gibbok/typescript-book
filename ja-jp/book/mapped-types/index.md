# マップ型



TypeScript のマップ型を使用すると、マッピング関数で各プロパティを変換することにより、既存の型に基づいて新しい型を作成できます。既存の型をマッピングすることで、同じ情報を異なる形式で表す新しい型を作成できます。マップ型を作成するには、`keyof` 演算子を使用して既存の型のプロパティにアクセスし、それらを変更して新しい型を生成します。
次の例では、

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

MyMappedType が T のプロパティを順にマッピングし、各プロパティを元の型の配列とする新しい型を作成するよう定義しています。これを使用して MyNewType を作成し、MyType と同じ情報を表しつつ、各プロパティを配列にしています。

