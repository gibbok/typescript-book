---
title: การอนุมานชนิดลิเทอรัล
sidebar:
  order: 18
  label: 18. การอนุมานชนิดลิเทอรัล
---


การอนุมานชนิดลิเทอรัลเป็นความสามารถของ TypeScript ที่ช่วยให้อนุมานชนิดของตัวแปรหรือพารามิเตอร์จากค่าของมันได้

ในตัวอย่างต่อไปนี้ เราจะเห็นว่า TypeScript ถือว่า `x` เป็นชนิดลิเทอรัล เนื่องจากไม่สามารถเปลี่ยนค่าได้ในภายหลัง ขณะที่ `y` ถูกอนุมานเป็น string เนื่องจากสามารถแก้ไขค่าได้ในภายหลัง

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

ในตัวอย่างต่อไปนี้ เราจะเห็นว่า `o.x` ถูกอนุมานเป็น `string` (ไม่ใช่ลิเทอรัลของ `a`) เนื่องจาก TypeScript พิจารณาว่าค่านี้สามารถเปลี่ยนได้ในภายหลัง

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

ดังที่เห็น โค้ดจะแสดงข้อผิดพลาดเมื่อส่ง `o.x` ไปยัง `fn` เนื่องจาก X เป็นชนิดที่แคบกว่า

เราสามารถแก้ปัญหานี้ได้ด้วยการใช้การยืนยันชนิดกับ `const` หรือชนิด `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

หรือ:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

