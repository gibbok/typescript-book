---
title: Conditional Type
sidebar:
  order: 40
  label: 40. Conditional Type
---


Conditional Type là cách tạo một kiểu phụ thuộc vào một điều kiện, trong đó kiểu được tạo ra được xác định dựa trên kết quả của điều kiện. Chúng được định nghĩa bằng từ khóa `extends` và toán tử ba ngôi để chọn có điều kiện giữa hai kiểu.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

