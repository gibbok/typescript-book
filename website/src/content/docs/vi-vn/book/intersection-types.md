---
title: Intersection Type
sidebar:
  order: 33
  label: 33. Intersection Type
---


Intersection Type là kiểu biểu diễn một giá trị có tất cả thuộc tính của hai hoặc nhiều kiểu. Intersection Type được biểu diễn bằng ký hiệu `&` giữa mỗi kiểu.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

