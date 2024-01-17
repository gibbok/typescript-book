---
title: 擦除的结构类型
sidebar:
  order: 56
  label: 56. 擦除的结构类型
---


在 TypeScript 中，对象不必匹配特定的、精确的类型。例如，如果我们创建一个满足接口要求的对象，我们就可以在需要该接口的地方使用该对象，即使它们之间没有显式连接。例子：

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // 有效
```

