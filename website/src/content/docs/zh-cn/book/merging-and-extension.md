---
title: 合并与扩展
sidebar:
  order: 52
  label: 52. 合并与扩展
---


合并和扩展是指与使用类型和接口相关的两个不同概念。

合并允许您将多个同名声明合并到一个定义中，例如，当您多次定义同名接口时：

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

扩展是指扩展或继承现有类型或接口以创建新类型或接口的能力。它是一种向现有类型添加附加属性或方法而不修改其原始定义的机制。例子：

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

