---
title: ชนิดแบบมีเงื่อนไข
sidebar:
  order: 40
  label: 40. ชนิดแบบมีเงื่อนไข
---


ชนิดแบบมีเงื่อนไขเป็นวิธีสร้างชนิดที่ขึ้นอยู่กับเงื่อนไข โดยชนิดที่จะสร้างถูกกำหนดจากผลลัพธ์ของเงื่อนไข ชนิดนี้กำหนดด้วยคีย์เวิร์ด `extends` และตัวดำเนินการ ternary เพื่อเลือกแบบมีเงื่อนไขระหว่างสองชนิด

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

