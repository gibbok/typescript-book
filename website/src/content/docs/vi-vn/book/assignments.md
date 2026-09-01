---
title: Phép gán
sidebar:
  order: 22
  label: 22. Phép gán
---


Thu hẹp TypeScript bằng phép gán là cách thu hẹp kiểu của một biến dựa trên giá trị được gán cho nó. Khi một biến được gán giá trị, TypeScript suy luận kiểu của nó dựa trên giá trị đã gán và thu hẹp kiểu của biến để khớp với kiểu được suy luận.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

