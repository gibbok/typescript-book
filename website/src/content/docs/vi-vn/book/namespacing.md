---
title: Namespace
sidebar:
  order: 58
  label: 58. Namespace
---


Trong TypeScript, namespace được dùng để tổ chức mã thành các container logic, ngăn xung đột tên và cung cấp cách nhóm các đoạn mã liên quan với nhau.
Việc sử dụng từ khóa `export` cho phép truy cập namespace từ bên ngoài module.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

