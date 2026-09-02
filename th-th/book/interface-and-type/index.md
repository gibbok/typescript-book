# Interface และ Type



### ไวยากรณ์ทั่วไป

ใน TypeScript อินเทอร์เฟซกำหนดโครงสร้างของออบเจ็กต์ โดยระบุชื่อและชนิดของพร็อพเพอร์ตีหรือเมธอดที่ออบเจ็กต์ต้องมี ไวยากรณ์ทั่วไปสำหรับกำหนดอินเทอร์เฟซใน TypeScript มีดังนี้:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

เช่นเดียวกันสำหรับการกำหนด type:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` หรือ `type TypeName`: กำหนดชื่อของอินเทอร์เฟซ
`property1`: `Type1`: ระบุพร็อพเพอร์ตีของอินเทอร์เฟซพร้อมชนิดที่สอดคล้องกัน สามารถกำหนดพร็อพเพอร์ตีได้หลายรายการโดยคั่นแต่ละรายการด้วยเครื่องหมายอัฒภาค
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: ระบุเมธอดของอินเทอร์เฟซ โดยกำหนดเมธอดด้วยชื่อ ตามด้วยรายการพารามิเตอร์ในวงเล็บและชนิดค่าที่ส่งคืน สามารถกำหนดเมธอดได้หลายรายการโดยคั่นแต่ละรายการด้วยเครื่องหมายอัฒภาค

ตัวอย่างอินเทอร์เฟซ:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

ตัวอย่าง type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

ใน TypeScript type ใช้กำหนดโครงสร้างของข้อมูลและบังคับใช้การตรวจสอบชนิด มีไวยากรณ์ทั่วไปหลายรูปแบบสำหรับกำหนด type ใน TypeScript โดยขึ้นอยู่กับกรณีใช้งานเฉพาะ ต่อไปนี้คือตัวอย่างบางส่วน:

### ชนิดพื้นฐาน

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### ออบเจ็กต์และอินเทอร์เฟซ

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### ชนิดยูเนียนและ Intersection

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

