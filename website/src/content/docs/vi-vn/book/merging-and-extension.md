---
title: Hợp nhất và mở rộng
sidebar:
  order: 53
  label: 53. Hợp nhất và mở rộng
---


Merging và extension nói đến hai khái niệm khác nhau liên quan đến làm việc với type và interface.

Merging cho phép bạn kết hợp nhiều khai báo có cùng tên thành một định nghĩa duy nhất, ví dụ khi bạn định nghĩa một interface có cùng tên nhiều lần:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Extension nói đến khả năng mở rộng hoặc kế thừa từ type hoặc interface hiện có để tạo type hoặc interface mới. Đây là cơ chế để thêm thuộc tính hoặc phương thức vào một kiểu hiện có mà không sửa đổi định nghĩa ban đầu của nó. Ví dụ:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

