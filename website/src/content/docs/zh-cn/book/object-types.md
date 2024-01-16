---
title: 对象类型
sidebar:
  order: 27
  label: 27. 对象类型
---


在 TypeScript 中，对象类型描述对象的形状。它们指定对象属性的名称和类型，以及这些属性是必需的还是可选的。

在 TypeScript 中，您可以通过两种主要方式定义对象类型：

通过指定对象属性的名称、类型和可选性来定义对象的形状的接口。

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

类型别名与接口类似，定义了对象的形状。但是，它还可以基于现有类型或现有类型的组合创建新的自定义类型。这包括定义联合类型、交集类型和其他复杂类型。

```typescript
type Point = {
    x: number;
    y: number;
};
```

也可以匿名定义类型：

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

