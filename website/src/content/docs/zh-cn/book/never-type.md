---
title: Never类型
sidebar:
  order: 47
  label: 47. Never类型
---


`never` 类型表示从未出现过的值。它用于表示从不返回或抛出错误的函数或表达式。

例如无限循环：

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // 做点什么
    }
};
```

抛出错误：

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

`never` 类型对于确保类型安全和捕获代码中的潜在错误很有用。当与其他类型和控制流语句结合使用时，它可以帮助 TypeScript 分析和推断更精确的类型，例如：

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // 向上移动
            break;
        case 'down':
            // 向下移动
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

