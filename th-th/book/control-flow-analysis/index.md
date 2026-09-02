# การวิเคราะห์โฟลว์การควบคุม



การวิเคราะห์โฟลว์การควบคุมใน TypeScript เป็นวิธีวิเคราะห์โฟลว์ของโค้ดแบบสแตติกเพื่ออนุมานชนิดของตัวแปร ทำให้คอมไพเลอร์สามารถจำกัดชนิดของตัวแปรเหล่านั้นให้แคบลงได้ตามต้องการโดยอาศัยผลการวิเคราะห์

ก่อน TypeScript 4.4 การวิเคราะห์โฟลว์ของโค้ดจะใช้เฉพาะกับโค้ดภายในคำสั่ง if แต่ตั้งแต่ TypeScript 4.4 เป็นต้นไป ยังสามารถใช้กับนิพจน์เงื่อนไขและการเข้าถึงพร็อพเพอร์ตีตัวแยกแยะที่อ้างอิงทางอ้อมผ่านตัวแปร const ได้ด้วย

ตัวอย่างเช่น:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

ตัวอย่างบางกรณีที่ไม่มีการจำกัดชนิดให้แคบลง:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

หมายเหตุ: นิพจน์เงื่อนไขจะได้รับการวิเคราะห์การอ้างอิงทางอ้อมสูงสุดห้าระดับ

