---
title: Kiểu đối tượng
sidebar:
  order: 28
  label: 28. Kiểu đối tượng
---


Trong TypeScript, kiểu đối tượng mô tả hình dạng của một đối tượng. Chúng chỉ định tên và kiểu của các thuộc tính của đối tượng, cũng như các thuộc tính đó là bắt buộc hay tùy chọn.

Trong TypeScript, bạn có thể định nghĩa kiểu đối tượng theo hai cách chính:

Interface định nghĩa hình dạng của một đối tượng bằng cách chỉ định tên, kiểu và tính tùy chọn của các thuộc tính.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Type alias, tương tự interface, định nghĩa hình dạng của một đối tượng. Tuy nhiên, nó cũng có thể tạo một kiểu tùy chỉnh mới dựa trên kiểu hiện có hoặc kết hợp các kiểu hiện có. Điều này bao gồm việc định nghĩa union type, intersection type và các kiểu phức tạp khác.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Cũng có thể định nghĩa một kiểu ẩn danh:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

