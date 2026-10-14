---
title: never 型
sidebar:
  order: 48
  label: 48. never 型
---


`never` 型は、決して発生しない値を表します。決して戻らない関数や式、またはエラーをスローする関数や式を表すために使用されます。

たとえば、無限ループは次のようになります。

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // 何らかの処理を行う
    }
};
```

エラーをスローする場合は、次のようになります。

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

`never` 型は、型安全性を確保し、コード内の潜在的なエラーを検出する際に便利です。ほかの型や制御フロー文と組み合わせて使用すると、TypeScript がより正確な型を解析および推論するのに役立ちます。例:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // 上に移動
            break;
        case 'down':
            // 下に移動
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

