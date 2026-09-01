---
title: การตรวจสอบความครอบคลุมทุกกรณี
sidebar:
  order: 27
  label: 27. การตรวจสอบความครอบคลุมทุกกรณี
---


การตรวจสอบความครอบคลุมทุกกรณีเป็นความสามารถของ TypeScript ที่ทำให้แน่ใจว่ากรณีที่เป็นไปได้ทั้งหมดของยูเนียนที่มีตัวแยกแยะได้รับการจัดการในคำสั่ง `switch` หรือคำสั่ง `if`

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // This line will never be executed
    }
};
```

ชนิด `never` ใช้เพื่อให้แน่ใจว่ากรณี default ครอบคลุมทุกกรณี และ TypeScript จะแสดงข้อผิดพลาดหากมีการเพิ่มค่าใหม่ให้ชนิด Direction โดยไม่ได้จัดการในคำสั่ง switch

