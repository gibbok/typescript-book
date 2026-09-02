# Symbol



Symbol เป็นชนิดข้อมูลพื้นฐานที่แทนค่าซึ่งเปลี่ยนแปลงไม่ได้ และรับประกันว่าจะไม่ซ้ำกันในขอบเขตทั้งโปรแกรมตลอดช่วงเวลาที่โปรแกรมทำงาน

Symbol สามารถใช้เป็นคีย์ของพร็อพเพอร์ตีในออบเจ็กต์ และเป็นวิธีสร้างพร็อพเพอร์ตีที่ไม่สามารถไล่แจกแจงได้

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

ขณะนี้ WeakMap และ WeakSet อนุญาตให้ใช้ symbol เป็นคีย์ได้

