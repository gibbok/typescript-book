---
title: Type Indexing
sidebar:
  order: 34
  label: 34. Type Indexing
---


Type indexing nói đến khả năng định nghĩa các kiểu có thể được index bằng một key chưa biết trước, sử dụng index signature để chỉ định kiểu cho các thuộc tính không được khai báo tường minh.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

