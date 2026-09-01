---
title: Symbol
sidebar:
  order: 59
  label: 59. Symbol
---


Symbol là một kiểu dữ liệu nguyên thủy biểu diễn một giá trị bất biến được bảo đảm là duy nhất trên toàn cục trong suốt vòng đời của chương trình.

Symbol có thể được dùng làm key cho thuộc tính đối tượng và cung cấp cách tạo các thuộc tính không enumerable.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

Trong WeakMap và WeakSet, symbol hiện được phép dùng làm key.

