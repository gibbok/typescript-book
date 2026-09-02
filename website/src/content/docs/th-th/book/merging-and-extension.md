---
title: การผสานและการขยาย
sidebar:
  order: 53
  label: 53. การผสานและการขยาย
---


การผสานและการขยายหมายถึงแนวคิดสองอย่างที่แตกต่างกันเกี่ยวกับการทำงานกับ type และอินเทอร์เฟซ

การผสานช่วยให้คุณรวมการประกาศชื่อเดียวกันหลายรายการเป็นนิยามเดียว ตัวอย่างเช่น เมื่อคุณกำหนดอินเทอร์เฟซที่มีชื่อเดียวกันหลายครั้ง:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

การขยายหมายถึงความสามารถในการขยายหรือสืบทอดจาก type หรืออินเทอร์เฟซที่มีอยู่เพื่อสร้างชนิดใหม่ เป็นกลไกสำหรับเพิ่มพร็อพเพอร์ตีหรือเมธอดให้กับชนิดที่มีอยู่โดยไม่แก้ไขนิยามเดิม ตัวอย่าง:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

