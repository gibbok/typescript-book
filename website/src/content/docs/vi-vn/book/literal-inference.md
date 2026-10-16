---
title: Suy luận literal
sidebar:
  order: 18
  label: 18. Suy luận literal
---


Literal Inference là một tính năng trong TypeScript cho phép suy luận kiểu của biến hoặc tham số dựa trên giá trị của nó.

Trong ví dụ sau, chúng ta có thể thấy TypeScript coi `x` là literal type vì giá trị không thể thay đổi về sau, trong khi `y` được suy luận là string vì nó có thể được sửa đổi bất kỳ lúc nào sau đó.

```typescript
const x = 'x'; // Kiểu literal 'x', vì giá trị này không thể thay đổi
let y = 'y'; // Kiểu string, vì ta có thể thay đổi giá trị này
```

Trong ví dụ sau, chúng ta có thể thấy `o.x` được suy luận là `string` (không phải literal của `a`) vì TypeScript cho rằng giá trị có thể thay đổi bất kỳ lúc nào sau đó.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Đây là chuỗi có kiểu rộng hơn
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Đối số có kiểu 'string' không thể gán cho tham số có kiểu 'X'
```

Như bạn có thể thấy, mã gây lỗi khi truyền `o.x` vào `fn` vì X là kiểu hẹp hơn.

Chúng ta có thể giải quyết vấn đề này bằng type assertion với `const` hoặc kiểu `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

hoặc:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

