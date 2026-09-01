---
title: ความแตกต่างระหว่าง Type และ Interface
sidebar:
  order: 54
  label: 54. ความแตกต่างระหว่าง Type และ Interface
---


การผสานการประกาศ (augmentation):

อินเทอร์เฟซรองรับการผสานการประกาศ ซึ่งหมายความว่าคุณสามารถกำหนดอินเทอร์เฟซที่มีชื่อเดียวกันหลายรายการ และ TypeScript จะผสานรายการเหล่านั้นเป็นอินเทอร์เฟซเดียวที่รวมพร็อพเพอร์ตีและเมธอดเข้าด้วยกัน ในทางกลับกัน type ไม่รองรับการผสานการประกาศ สิ่งนี้มีประโยชน์เมื่อคุณต้องการเพิ่มความสามารถหรือปรับแต่งชนิดที่มีอยู่โดยไม่แก้ไขนิยามเดิม หรือเมื่อต้องแก้ไขชนิดที่ขาดหายหรือไม่ถูกต้อง

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

การขยาย type/อินเทอร์เฟซอื่น:

ทั้ง type และอินเทอร์เฟซสามารถขยาย type/อินเทอร์เฟซอื่นได้ แต่ใช้ไวยากรณ์ต่างกัน สำหรับอินเทอร์เฟซ คุณใช้คีย์เวิร์ด `extends` เพื่อสืบทอดพร็อพเพอร์ตีและเมธอดจากอินเทอร์เฟซอื่น อย่างไรก็ตาม อินเทอร์เฟซไม่สามารถขยายชนิดที่ซับซ้อนอย่างชนิดยูเนียนได้

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

สำหรับ type ให้ใช้ตัวดำเนินการ & เพื่อรวมหลายชนิดเป็นชนิดเดียว (intersection)

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

ชนิดยูเนียนและ Intersection:

Type มีความยืดหยุ่นมากกว่าในการกำหนดชนิดยูเนียนและ Intersection ด้วยคีย์เวิร์ด `type` คุณสามารถสร้างชนิดยูเนียนได้ง่าย ๆ โดยใช้ตัวดำเนินการ `|` และสร้างชนิด intersection โดยใช้ตัวดำเนินการ `&` แม้ว่าอินเทอร์เฟซจะสามารถแทนชนิดยูเนียนทางอ้อมได้เช่นกัน แต่ไม่มีการรองรับชนิด intersection ในตัว

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

ตัวอย่างที่ใช้อินเทอร์เฟซ:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

