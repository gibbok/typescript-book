# 名前空間



TypeScript では、名前空間はコードを論理的なコンテナーに整理するために使用され、名前の衝突を防ぎ、関連するコードをまとめる方法を提供します。
`export` キーワードを使用すると、モジュールの外部から名前空間にアクセスできます。

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

