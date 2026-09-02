---
title: ลายเซ็นดัชนี
sidebar:
  order: 15
  label: 15. ลายเซ็นดัชนี
---


ใน TypeScript เราสามารถใช้ `string`, `number` และ `symbol` เป็นลายเซ็นดัชนีได้:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

โปรดทราบว่า JavaScript จะแปลงดัชนีชนิด `number` เป็นดัชนีชนิด `string` โดยอัตโนมัติ ดังนั้น `k[1]` หรือ `k["1"]` จึงคืนค่าเดียวกัน

