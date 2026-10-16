---
title: Kiểu từ giá trị
sidebar:
  order: 35
  label: 35. Kiểu từ giá trị
---


Type from Value trong TypeScript nói đến việc tự động suy luận kiểu từ một giá trị hoặc biểu thức thông qua type inference.

```typescript
const x = 'x'; // TypeScript suy luận 'x' là literal chuỗi khi dùng 'const' (bất biến), nhưng mở rộng thành 'string' khi dùng 'let' (có thể gán lại).
```

