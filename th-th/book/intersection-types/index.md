# ชนิด Intersection



ชนิด Intersection คือชนิดที่ใช้แทนค่าซึ่งมีพร็อพเพอร์ตีทั้งหมดของชนิดตั้งแต่สองชนิดขึ้นไป ชนิด Intersection แสดงด้วยสัญลักษณ์ `&` คั่นระหว่างแต่ละชนิด

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

