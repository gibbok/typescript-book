---
title: Enum
sidebar:
  order: 20
  label: 20. Enum
---


ใน TypeScript `enum` คือชุดของค่าคงที่ที่มีชื่อ

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

สามารถกำหนด Enum ได้หลายวิธี:

### Enum แบบตัวเลข

ใน TypeScript Enum แบบตัวเลขคือ Enum ที่ค่าคงที่แต่ละค่าถูกกำหนดเป็นค่าตัวเลข โดยค่าเริ่มต้นจะเริ่มจาก 0

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

สามารถระบุค่าที่กำหนดเองได้โดยกำหนดค่าอย่างชัดเจน:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enum แบบสตริง

ใน TypeScript Enum แบบสตริงคือ Enum ที่ค่าคงที่แต่ละค่าถูกกำหนดเป็นค่าสตริง

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

หมายเหตุ: TypeScript อนุญาตให้ใช้ Enum แบบผสม ซึ่งสมาชิกที่เป็นสตริงและตัวเลขสามารถอยู่ร่วมกันได้

### Enum ค่าคงที่

Enum ค่าคงที่ใน TypeScript เป็น Enum ชนิดพิเศษที่ทราบค่าทั้งหมดในเวลาคอมไพล์และแทนค่าลงในตำแหน่งที่มีการใช้ enum โดยตรง ทำให้ได้โค้ดที่มีประสิทธิภาพมากขึ้น

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

จะถูกคอมไพล์เป็น:

```typescript
console.log('EN' /* Language.English */);
```

หมายเหตุ:
Const Enum มีค่าที่กำหนดตายตัวและทำให้ Enum ถูกลบออก ซึ่งอาจมีประสิทธิภาพมากกว่าในไลบรารีที่ทำงานได้ด้วยตัวเอง แต่โดยทั่วไปไม่เป็นที่ต้องการ นอกจากนี้ Const enum ไม่สามารถมีสมาชิกที่คำนวณค่าได้

### การแมปย้อนกลับ

ใน TypeScript การแมปย้อนกลับใน Enum หมายถึงความสามารถในการดึงชื่อสมาชิกของ Enum จากค่าของสมาชิกนั้น โดยค่าเริ่มต้น สมาชิก Enum จะมีการแมปไปข้างหน้าจากชื่อไปยังค่า แต่สามารถสร้างการแมปย้อนกลับได้ด้วยการกำหนดค่าให้สมาชิกแต่ละตัวอย่างชัดเจน การแมปย้อนกลับมีประโยชน์เมื่อคุณต้องการค้นหาสมาชิก Enum จากค่า หรือต้องการวนซ้ำสมาชิก Enum ทั้งหมด โปรดทราบว่าเฉพาะสมาชิก enum แบบตัวเลขเท่านั้นที่จะสร้างการแมปย้อนกลับ ส่วนสมาชิก enum แบบสตริงจะไม่มีการสร้างการแมปย้อนกลับเลย

Enum ต่อไปนี้:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

คอมไพล์เป็น:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

ดังนั้น การแมปค่ากลับไปยังคีย์จึงใช้ได้กับสมาชิก enum แบบตัวเลข แต่ใช้ไม่ได้กับสมาชิก enum แบบสตริง:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Ambient enum

Ambient enum ใน TypeScript คือ Enum ชนิดหนึ่งที่กำหนดไว้ในไฟล์ประกาศ (*.d.ts) โดยไม่มีอิมพลีเมนเทชันที่เกี่ยวข้อง ช่วยให้คุณกำหนดชุดค่าคงที่ที่มีชื่อและใช้งานข้ามไฟล์ต่าง ๆ ได้อย่างปลอดภัยด้านชนิด โดยไม่ต้องนำเข้ารายละเอียดของอิมพลีเมนเทชันในแต่ละไฟล์

### สมาชิกที่คำนวณค่าและสมาชิกค่าคงที่

ใน TypeScript สมาชิกที่คำนวณค่าคือสมาชิกของ Enum ที่มีการคำนวณค่าในเวลารันไทม์ ส่วนสมาชิกค่าคงที่คือสมาชิกที่กำหนดค่าในเวลาคอมไพล์และไม่สามารถเปลี่ยนแปลงได้ระหว่างรันไทม์ สมาชิกที่คำนวณค่าใช้ได้ใน Enum ปกติ ส่วนสมาชิกค่าคงที่ใช้ได้ทั้งใน Enum ปกติและ const enum

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Enum แสดงด้วยยูเนียนที่ประกอบด้วยชนิดของสมาชิก ค่าของสมาชิกแต่ละตัวสามารถกำหนดผ่านนิพจน์ค่าคงที่หรือไม่ใช่ค่าคงที่ โดยสมาชิกที่มีค่าคงที่จะได้รับการกำหนดเป็นชนิดลิเทอรัล เพื่อให้เห็นภาพ ให้พิจารณาการประกาศชนิด E และชนิดย่อย E.A, E.B และ E.C ในกรณีนี้ E แทนยูเนียน E.A | E.B | E.C

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

