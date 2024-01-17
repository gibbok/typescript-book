---
title: 映射类型
sidebar:
  order: 37
  label: 37. 映射类型
---


TypeScript 中的映射类型允许您通过使用映射函数转换每个属性来基于现有类型创建新类型。通过映射现有类型，您可以创建以不同格式表示相同信息的新类型。要创建映射类型，您可以使用运算符访问现有类型的属性 `keyof` ，然后更改它们以生成新类型。在以下示例中：

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

我们定义 MyMappedType 来映射 T 的属性，创建一个新类型，其中每个属性都是其原始类型的数组。使用它，我们创建 MyNewType 来表示与 MyType 相同的信息，但每个属性都是一个数组。

