---
title: Union Type
sidebar:
  order: 32
  label: 32. Union Type
---


Union Type là kiểu biểu diễn một giá trị có thể thuộc một trong nhiều kiểu. Union Type được biểu diễn bằng ký hiệu `|` giữa mỗi kiểu có thể có.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

