---
title: Kiểu unknown
sidebar:
  order: 46
  label: 46. Kiểu unknown
---


Trong TypeScript, kiểu `unknown` biểu diễn một giá trị có kiểu chưa biết. Không giống kiểu `any` cho phép bất kỳ kiểu giá trị nào, `unknown` yêu cầu kiểm tra kiểu hoặc assertion trước khi có thể được sử dụng theo một cách cụ thể, vì vậy không có thao tác nào được phép trên `unknown` nếu trước tiên chưa assertion hoặc thu hẹp thành một kiểu cụ thể hơn.

Kiểu `unknown` chỉ có thể gán cho `any` và chính `unknown`, đồng thời là lựa chọn thay thế an toàn kiểu cho `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Hợp lệ
let value2: any = value; // Hợp lệ
let value3: boolean = value; // Không hợp lệ
let value4: number = value; // Không hợp lệ
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

