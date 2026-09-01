---
title: การกำหนดค่า
sidebar:
  order: 22
  label: 22. การกำหนดค่า
---


การจำกัดชนิดด้วยการกำหนดค่าใน TypeScript เป็นวิธีจำกัดชนิดของตัวแปรตามค่าที่กำหนดให้ เมื่อตัวแปรได้รับการกำหนดค่า TypeScript จะอนุมานชนิดจากค่าที่กำหนดและจำกัดชนิดของตัวแปรให้ตรงกับชนิดที่อนุมานได้

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

