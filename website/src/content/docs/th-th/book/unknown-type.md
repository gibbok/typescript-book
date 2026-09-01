---
title: ชนิด Unknown
sidebar:
  order: 46
  label: 46. ชนิด Unknown
---


ใน TypeScript ชนิด `unknown` ใช้แทนค่าที่ไม่ทราบชนิด ต่างจากชนิด `any` ที่อนุญาตให้เป็นค่าชนิดใดก็ได้ `unknown` ต้องมีการตรวจสอบหรือยืนยันชนิดก่อนจึงจะใช้งานในลักษณะเฉพาะได้ ดังนั้นจึงไม่อนุญาตให้ดำเนินการใด ๆ กับ `unknown` โดยไม่ยืนยันหรือจำกัดให้เป็นชนิดที่เฉพาะเจาะจงขึ้นก่อน

ชนิด `unknown` สามารถกำหนดให้กับ `any` และ `unknown` เท่านั้น และเป็นทางเลือกที่ปลอดภัยด้านชนิดแทน `any`

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

