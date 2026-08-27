# オブジェクト型



TypeScript のオブジェクト型は、オブジェクトの構造を記述します。オブジェクトのプロパティの名前と型に加えて、それらのプロパティが必須かオプショナルかを指定します。

TypeScript では、主に 2 つの方法でオブジェクト型を定義できます。

インターフェースは、プロパティの名前、型、オプショナルかどうかを指定して、オブジェクトの構造を定義します。

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

型エイリアスはインターフェースと同様に、オブジェクトの構造を定義します。ただし、既存の型または既存の型の組み合わせに基づく、新しいカスタム型を作成することもできます。これには、ユニオン型、交差型、その他の複雑な型の定義が含まれます。

```typescript
type Point = {
    x: number;
    y: number;
};
```

型を匿名で定義することもできます。

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

