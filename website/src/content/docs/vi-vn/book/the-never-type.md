---
title: Kiểu never
sidebar:
  order: 26
  label: 26. Kiểu never
---


Khi một biến được thu hẹp thành một kiểu không thể chứa bất kỳ giá trị nào, trình biên dịch TypeScript sẽ suy luận rằng biến phải có kiểu `never`. Lý do là kiểu never biểu diễn một giá trị không bao giờ có thể được tạo ra.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

