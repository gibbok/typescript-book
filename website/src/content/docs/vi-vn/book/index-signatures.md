---
title: Index Signature
sidebar:
  order: 15
  label: 15. Index Signature
---


Trong TypeScript, chúng ta có thể sử dụng `string`, `number` và `symbol` làm index signature:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Lưu ý rằng JavaScript tự động chuyển một index kiểu `number` thành index kiểu `string`, vì vậy `k[1]` hoặc `k["1"]` trả về cùng một giá trị.

