---
title: 字面量推断
sidebar:
  order: 17
  label: 17. 字面量推断
---


字面量推断是 TypeScript 中的一项功能，允许根据变量或参数的值推断其类型。

在下面的示例中，我们可以看到 TypeScript 认为x文字类型是因为该值以后不能随时更改，而y被推断为字符串，因为它以后可以随时修改。

```typescript
const x = 'x'; // x 为字面量类型, 因为值不能改变
let y = 'y'; // string, 我们能改变这个值
```

在下面的示例中，我们可以看到 `o.x` 被推断为 `string`（而不是字面量的a），因为 TypeScript 认为该值可以在以后随时更改。

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // 这是一个更宽的 string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // 'string' 类型的参数不能赋值给 'X' 类型的参数
```

正如你所看到的代码在传递 `o.x` 给 `fn` 作为一个狭窄类型时，抛出了一个错误。

我们能通过使用 `const` 或者 `X` 来借助类型推断解决这个问题：

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

or:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

