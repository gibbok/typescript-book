---
title: ชนิดจากค่า
sidebar:
  order: 35
  label: 35. ชนิดจากค่า
---


ชนิดจากค่าใน TypeScript หมายถึงการอนุมานชนิดจากค่าหรือนิพจน์โดยอัตโนมัติผ่านการอนุมานชนิด

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

