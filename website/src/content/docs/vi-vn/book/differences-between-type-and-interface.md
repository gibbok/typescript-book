---
title: Khác biệt giữa Type và Interface
sidebar:
  order: 54
  label: 54. Khác biệt giữa Type và Interface
---


Declaration merging (augmentation):

Interface hỗ trợ declaration merging, nghĩa là bạn có thể định nghĩa nhiều interface có cùng tên và TypeScript sẽ hợp nhất chúng thành một interface duy nhất với các thuộc tính và phương thức kết hợp. Ngược lại, type không hỗ trợ declaration merging. Điều này có thể hữu ích khi bạn muốn thêm chức năng hoặc tùy chỉnh các kiểu hiện có mà không sửa đổi định nghĩa ban đầu, hoặc vá các kiểu bị thiếu hay không chính xác.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Mở rộng type/interface khác:

Cả type và interface đều có thể mở rộng type/interface khác, nhưng cú pháp khác nhau. Với interface, bạn sử dụng từ khóa `extends` để kế thừa thuộc tính và phương thức từ interface khác. Tuy nhiên, interface không thể mở rộng một kiểu phức tạp như union type.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Với type, bạn sử dụng toán tử & để kết hợp nhiều kiểu thành một kiểu duy nhất (intersection).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Union Type và Intersection Type:

Type linh hoạt hơn khi định nghĩa Union Type và Intersection Type. Với từ khóa `type`, bạn có thể dễ dàng tạo union type bằng toán tử `|` và intersection type bằng toán tử `&`. Trong khi interface cũng có thể biểu diễn union type một cách gián tiếp, chúng không có hỗ trợ tích hợp cho intersection type.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Ví dụ với interface:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

