---
title: 类型注释
sidebar:
  order: 11
  label: 11. 类型注释
---


在使用 `var` 、 `let` 和 `const` 声明变量时，可以选择添加类型：

```typescript
const x: number = 1;
```

TypeScript 在推断类型方面做得很好，尤其是简单类型时，因此在大多数情况下这些声明是不必要的。

在函数上可以向参数添加类型注释：

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

以下是使用匿名函数（所谓的 lambda 函数）的示例：

```typescript
const sum = (a: number, b: number) => a + b;
```

当参数存在默认值时可以避免这些注释：

```typescript
const sum = (a = 10, b: number) => a + b;
```

可以将返回类型注释添加到函数中：

```typescript
const sum = (a = 10, b: number): number => a + b;
```

这对于更复杂的函数尤其有用，因为在实现之前编写显式返回类型可以帮助更好地思考该函数。

通常考虑注释类型签名，但不注释主体局部变量，并始终将类型添加到对象字面量中。

