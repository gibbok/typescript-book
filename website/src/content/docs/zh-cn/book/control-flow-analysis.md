---
title: 控制流分析
sidebar:
  order: 22
  label: 22. 控制流分析
---


TypeScript 中的控制流分析是一种静态分析代码流以推断变量类型的方法，允许编译器根据分析结果根据需要缩小这些变量的类型。

在 TypeScript 4.4 之前，代码流分析仅适用于 if 语句中的代码，但从 TypeScript 4.4 开始，它还可以应用于条件表达式和通过 const 变量间接引用的判别式属性访问。

例如：

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

一些未发生缩小的示例：

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // 错误, 没有缩小，因为 isString 不是常量
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // 错误, 没有缩小，因为 obj 在函数体中被赋值
    }
};
```

注意： 在条件表达式中最多分析五个间接级别。

