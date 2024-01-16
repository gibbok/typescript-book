---
title: 类型和接口之间的差异
sidebar:
  order: 53
  label: 53. 类型和接口之间的差异
---


声明合并（增强）：

接口支持声明合并，这意味着您可以定义多个具有相同名称的接口，TypeScript 会将它们合并为具有组合属性和方法的单个接口。 另一方面，类型不支持声明合并。 当您想要添加额外的功能或自定义现有类型而不修改原始定义或修补丢失或不正确的类型时，这可能会很有帮助。

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

扩展其他类型/接口：

类型和接口都可以扩展其他类型/接口，但语法不同。 对于接口，您可以使用“extends”关键字从其他接口继承属性和方法。 但是，接口无法扩展像联合类型这样的复杂类型。

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

对于类型，您可以使用 & 运算符将多个类型合并为单个类型（交集）。

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

并集和交集类型：

在定义并集和交集类型时，类型更加灵活。 通过“type”关键字，您可以使用“|”运算符轻松创建联合类型，并使用“&”运算符创建交集类型。 虽然接口也可以间接表示联合类型，但它们没有对交集类型的内置支持。

```typescript
type Department = 'dep-x' | 'dep-y'; // 并集

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // 交集
```

接口示例：

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // 接口的并集
```

