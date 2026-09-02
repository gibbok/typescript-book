# การจำกัดชนิดให้แคบลง



การจำกัดชนิดให้แคบลงใน TypeScript คือกระบวนการปรับชนิดของตัวแปรให้เฉพาะเจาะจงขึ้นภายในบล็อกเงื่อนไข ซึ่งมีประโยชน์เมื่อทำงานกับชนิดยูเนียนที่ตัวแปรสามารถเป็นได้มากกว่าหนึ่งชนิด

TypeScript รองรับหลายวิธีในการจำกัดชนิดให้แคบลง:

### ตัวป้องกันชนิด typeof

ตัวป้องกันชนิด typeof เป็นตัวป้องกันชนิดเฉพาะแบบหนึ่งใน TypeScript ที่ตรวจสอบชนิดของตัวแปรตามชนิด JavaScript ที่มีมาให้ในตัว

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### การจำกัดชนิดด้วยค่าความจริง

การจำกัดชนิดด้วยค่าความจริงใน TypeScript ทำงานโดยตรวจสอบว่าตัวแปรเป็นค่า truthy หรือ falsy เพื่อจำกัดชนิดให้สอดคล้องกัน

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### การจำกัดชนิดด้วยการเปรียบเทียบความเท่ากัน

การจำกัดชนิดด้วยการเปรียบเทียบความเท่ากันใน TypeScript ทำงานโดยตรวจสอบว่าตัวแปรเท่ากับค่าที่ระบุหรือไม่ เพื่อจำกัดชนิดให้สอดคล้องกัน

วิธีนี้ใช้ร่วมกับคำสั่ง `switch` และตัวดำเนินการเปรียบเทียบความเท่ากัน เช่น `===`, `!==`, `==` และ `!=` เพื่อจำกัดชนิดให้แคบลง

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### การจำกัดชนิดด้วยตัวดำเนินการ in

การจำกัดชนิดด้วยตัวดำเนินการ `in` ใน TypeScript เป็นวิธีจำกัดชนิดของตัวแปรตามการมีอยู่ของพร็อพเพอร์ตีภายในชนิดของตัวแปรนั้น

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### การจำกัดชนิดด้วย instanceof

การจำกัดชนิดด้วยตัวดำเนินการ `instanceof` ใน TypeScript เป็นวิธีจำกัดชนิดของตัวแปรตามฟังก์ชันคอนสตรักเตอร์ โดยตรวจสอบว่าออบเจ็กต์เป็นอินสแตนซ์ของคลาสหรืออินเทอร์เฟซที่กำหนดหรือไม่

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

