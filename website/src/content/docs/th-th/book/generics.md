---
title: Generic
sidebar:
  order: 56
  label: 56. Generic
---


Generic ช่วยให้คุณสร้างคอมโพเนนต์และฟังก์ชันที่นำกลับมาใช้ซ้ำและทำงานกับชนิดข้อมูลได้หลายชนิด เมื่อใช้ generic คุณสามารถกำหนดพารามิเตอร์ให้กับชนิด ฟังก์ชัน และอินเทอร์เฟซ ทำให้สิ่งเหล่านี้ทำงานกับชนิดข้อมูลที่แตกต่างกันได้โดยไม่ต้องระบุชนิดอย่างชัดเจนไว้ล่วงหน้า

Generic ช่วยให้โค้ดมีความยืดหยุ่นและนำกลับมาใช้ซ้ำได้มากขึ้น

### ชนิด Generic

หากต้องการกำหนดชนิด generic ให้ใช้วงเล็บมุม (`<>`) เพื่อระบุพารามิเตอร์ชนิด ตัวอย่างเช่น:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### คลาส Generic

Generic สามารถใช้กับคลาสได้เช่นกัน ทำให้คลาสทำงานกับชนิดข้อมูลหลายชนิดผ่านพารามิเตอร์ชนิดได้ วิธีนี้มีประโยชน์สำหรับการสร้างนิยามคลาสที่นำกลับมาใช้ซ้ำ ทำงานกับชนิดข้อมูลที่แตกต่างกัน และยังคงรักษาความปลอดภัยของชนิดข้อมูลไว้

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### ข้อจำกัดของ Generic

พารามิเตอร์ generic สามารถถูกจำกัดได้ด้วยคีย์เวิร์ด `extends` ตามด้วยชนิดหรืออินเทอร์เฟซที่พารามิเตอร์ชนิดต้องเป็นไปตาม

ในตัวอย่างต่อไปนี้ `T` ต้องมีพร็อพเพอร์ตี `length` ที่กำหนดชนิดไว้อย่างถูกต้องจึงจะใช้ได้:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

ฟีเจอร์ generic ที่สำคัญซึ่งเพิ่มเข้ามาในเวอร์ชัน 3.4 RC คือการอนุมานชนิดของฟังก์ชันลำดับสูง ซึ่งส่งต่ออาร์กิวเมนต์ชนิด generic:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

ความสามารถนี้ทำให้การเขียนโปรแกรมแบบ pointfree ที่ปลอดภัยด้านชนิดข้อมูลทำได้ง่ายขึ้น ซึ่งรูปแบบนี้พบได้ทั่วไปในการเขียนโปรแกรมเชิงฟังก์ชัน

### การจำกัดชนิด Generic ตามบริบท

การจำกัดชนิดตามบริบทสำหรับ generic คือกลไกใน TypeScript ที่ช่วยให้คอมไพเลอร์จำกัดชนิดของพารามิเตอร์ generic ตามบริบทที่ใช้งาน กลไกนี้มีประโยชน์เมื่อทำงานกับชนิด generic ในคำสั่งแบบมีเงื่อนไข:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

