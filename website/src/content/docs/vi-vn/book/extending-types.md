---
title: Mở rộng kiểu
sidebar:
  order: 16
  label: 16. Mở rộng kiểu
---


Có thể mở rộng một `interface` (sao chép các thành viên từ một kiểu khác):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Cũng có thể mở rộng từ nhiều kiểu:

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

Từ khóa `extends` chỉ hoạt động trên interface và class; với type, hãy dùng intersection:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Có thể mở rộng một type bằng interface nhưng không thể làm ngược lại:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

