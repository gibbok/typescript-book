# ตัวบ่งชี้ชนิด



ตัวบ่งชี้ชนิดใน TypeScript คือฟังก์ชันที่คืนค่าบูลีนและใช้เพื่อจำกัดชนิดของตัวแปรให้เป็นชนิดที่เฉพาะเจาะจงมากขึ้น

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 อนุมานตัวบ่งชี้ชนิด (เช่น `x is T`) โดยอัตโนมัติในฟังก์ชันอย่าง `.filter` จึงทราบว่าเมื่อใดค่าต่าง ๆ เช่น undefined ถูกนำออก ส่งผลให้ได้ชนิดที่แม่นยำขึ้นและมีข้อผิดพลาดน้อยลง ความสามารถนี้ใช้ได้กับการตรวจสอบที่ชัดเจน (เช่น `x !== undefined`) แต่ใช้ไม่ได้กับการตรวจสอบที่กำกวมอย่าง `!!x`

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

