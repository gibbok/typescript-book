# ชนิด Never



ชนิด `never` ใช้แทนค่าที่ไม่มีวันเกิดขึ้น ใช้ระบุฟังก์ชันหรือนิพจน์ที่ไม่มีวันคืนค่าหรือที่โยนข้อผิดพลาด

ตัวอย่างเช่น ลูปไม่รู้จบ:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

การโยนข้อผิดพลาด:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

ชนิด `never` มีประโยชน์ในการรับรองความปลอดภัยด้านชนิดและตรวจจับข้อผิดพลาดที่อาจเกิดขึ้นในโค้ด ชนิดนี้ช่วยให้ TypeScript วิเคราะห์และอนุมานชนิดได้แม่นยำยิ่งขึ้นเมื่อใช้ร่วมกับชนิดอื่นและคำสั่งโฟลว์การควบคุม ตัวอย่างเช่น:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

