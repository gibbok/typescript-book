---
title: 型のインデックスアクセス
sidebar:
  order: 34
  label: 34. 型のインデックスアクセス
---


型のインデックスアクセスとは、明示的に宣言されていないプロパティの型を指定するインデックスシグネチャを使用して、事前には分からないキーでインデックスアクセスできる型を定義する機能を指します。

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

