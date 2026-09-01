---
title: Tuple có độ dài cố định
sidebar:
  order: 31
  label: 31. Tuple có độ dài cố định
---


Fixed Length Tuple là một kiểu tuple cụ thể bắt buộc số lượng phần tử cố định với các kiểu cụ thể và không cho phép thay đổi độ dài của tuple sau khi được định nghĩa.

Fixed Length Tuple hữu ích khi bạn cần biểu diễn một tập hợp giá trị với số lượng phần tử và kiểu cụ thể, đồng thời muốn bảo đảm độ dài và kiểu của tuple không bị thay đổi ngoài ý muốn.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

