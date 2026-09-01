---
title: Mapped Type
sidebar:
  order: 38
  label: 38. Mapped Type
---


Mapped Type trong TypeScript cho phép bạn tạo kiểu mới dựa trên một kiểu hiện có bằng cách biến đổi từng thuộc tính thông qua một hàm ánh xạ. Bằng cách ánh xạ các kiểu hiện có, bạn có thể tạo các kiểu mới biểu diễn cùng thông tin ở định dạng khác. Để tạo mapped type, bạn truy cập các thuộc tính của một kiểu hiện có bằng toán tử `keyof` rồi thay đổi chúng để tạo ra kiểu mới.
Trong ví dụ sau:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

chúng ta định nghĩa MyMappedType để ánh xạ qua các thuộc tính của T, tạo một kiểu mới trong đó mỗi thuộc tính là một mảng của kiểu ban đầu. Sử dụng nó, chúng ta tạo MyNewType để biểu diễn cùng thông tin như MyType nhưng mỗi thuộc tính là một mảng.

