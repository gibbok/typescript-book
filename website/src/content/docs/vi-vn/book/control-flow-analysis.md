---
title: Phân tích luồng điều khiển
sidebar:
  order: 23
  label: 23. Phân tích luồng điều khiển
---


Control Flow Analysis trong TypeScript là cách phân tích tĩnh luồng mã để suy luận kiểu của biến, cho phép trình biên dịch thu hẹp kiểu của các biến đó khi cần, dựa trên kết quả phân tích.

Trước TypeScript 4.4, phân tích luồng mã chỉ được áp dụng cho mã bên trong câu lệnh if, nhưng kể từ TypeScript 4.4, nó cũng có thể được áp dụng cho các biểu thức điều kiện và truy cập thuộc tính discriminant được tham chiếu gián tiếp thông qua biến const.

Ví dụ:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Một số ví dụ mà việc thu hẹp không xảy ra:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Ghi chú: Tối đa năm cấp độ gián tiếp được phân tích trong biểu thức điều kiện.

