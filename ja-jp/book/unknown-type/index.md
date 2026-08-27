# unknown 型



TypeScript の `unknown` 型は、型が不明な値を表します。あらゆる型の値を許可する `any` 型とは異なり、`unknown` を特定の方法で使用する前には型チェックまたはアサーションが必要です。そのため、より具体的な型を最初にアサーションするか絞り込まない限り、`unknown` に対する操作は許可されません。

`unknown` 型は、`any` と `unknown` 自体にのみ代入可能であり、`any` に代わる型安全な選択肢です。

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

