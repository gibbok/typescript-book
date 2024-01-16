---
title: 类型索引
sidebar:
  order: 33
  label: 33. 类型索引
---


类型索引是指能够通过预先未知的键来定义可以索引的类型，使用索引签名来指定未显式声明的属性的类型。

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // 返回 a
```

