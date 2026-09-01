---
title: Kiểu từ giá trị
sidebar:
  order: 35
  label: 35. Kiểu từ giá trị
---


Type from Value trong TypeScript nói đến việc tự động suy luận kiểu từ một giá trị hoặc biểu thức thông qua type inference.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

