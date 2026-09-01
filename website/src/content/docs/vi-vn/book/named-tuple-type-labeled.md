---
title: Named Tuple Type (có nhãn)
sidebar:
  order: 30
  label: 30. Named Tuple Type (có nhãn)
---


Tuple type có thể bao gồm nhãn hoặc tên tùy chọn cho từng phần tử. Các nhãn này phục vụ khả năng đọc và hỗ trợ công cụ, không ảnh hưởng đến các thao tác bạn có thể thực hiện với chúng.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

