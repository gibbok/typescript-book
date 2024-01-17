---
title: 只读属性
sidebar:
  order: 13
  label: 13. 只读属性
---


是否可以通过使用修饰符来防止对属性进行写入，`readonly` 以确保该属性不能被重写，但不提供任何完全不变性的保证：

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

