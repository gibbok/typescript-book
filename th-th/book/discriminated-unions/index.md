# ยูเนียนที่มีตัวแยกแยะ



ยูเนียนที่มีตัวแยกแยะใน TypeScript เป็นชนิดยูเนียนที่ใช้พร็อพเพอร์ตีร่วมซึ่งเรียกว่าตัวแยกแยะ เพื่อจำกัดชุดชนิดที่เป็นไปได้ของยูเนียนให้แคบลง

```typescript
type Square = {
    kind: 'square'; // Discriminant
    size: number;
};

type Circle = {
    kind: 'circle'; // Discriminant
    radius: number;
};

type Shape = Square | Circle;

const area = (shape: Shape) => {
    switch (shape.kind) {
        case 'square':
            return Math.pow(shape.size, 2);
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
    }
};

const square: Square = { kind: 'square', size: 5 };
const circle: Circle = { kind: 'circle', radius: 2 };

console.log(area(square)); // 25
console.log(area(circle)); // 12.566370614359172
```

