---
title: อื่น ๆ
sidebar:
  order: 62
  label: 62. อื่น ๆ
---


### การจัดการข้อผิดพลาดและข้อยกเว้น

TypeScript ช่วยให้คุณดักจับและจัดการข้อผิดพลาดได้โดยใช้กลไกการจัดการข้อผิดพลาดมาตรฐานของ JavaScript:

บล็อก Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

คุณยังสามารถจัดการข้อผิดพลาดชนิดต่าง ๆ ได้ด้วย:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

ชนิดข้อผิดพลาดแบบกำหนดเอง:

คุณสามารถระบุข้อผิดพลาดที่เจาะจงยิ่งขึ้นได้โดยสืบทอดจาก `class` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### คลาส Mixin

คลาส Mixin ช่วยให้คุณรวมและประกอบพฤติกรรมจากหลายคลาสไว้ในคลาสเดียว โดยเป็นวิธีนำฟังก์ชันการทำงานกลับมาใช้ซ้ำและขยายต่อได้โดยไม่จำเป็นต้องมีสายการสืบทอดที่ลึก

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### คุณลักษณะด้านการทำงานแบบอะซิงโครนัสของภาษา

เนื่องจาก TypeScript เป็นซูเปอร์เซตของ JavaScript จึงมีคุณลักษณะด้านการทำงานแบบอะซิงโครนัสของ JavaScript ในตัว ดังนี้:

Promise:

Promise เป็นวิธีจัดการการดำเนินการแบบอะซิงโครนัสและผลลัพธ์ โดยใช้เมธอดอย่าง `.then()` และ `.catch()` เพื่อจัดการกรณีสำเร็จและกรณีเกิดข้อผิดพลาด

ดูข้อมูลเพิ่มเติม: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

คีย์เวิร์ด Async/await เป็นวิธีทำให้ไวยากรณ์สำหรับทำงานกับ Promise ดูคล้ายการทำงานแบบซิงโครนัสมากขึ้น คีย์เวิร์ด `async` ใช้กำหนดฟังก์ชันแบบอะซิงโครนัส ส่วนคีย์เวิร์ด `await` ใช้ภายในฟังก์ชัน async เพื่อหยุดการทำงานชั่วคราวจนกว่า Promise จะได้รับการ resolve หรือ reject

ดูข้อมูลเพิ่มเติม:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

API ต่อไปนี้ได้รับการรองรับเป็นอย่างดีใน TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iterator และ Generator

ทั้ง Iterator และ Generator ได้รับการรองรับเป็นอย่างดีใน TypeScript

Iterator คือออบเจ็กต์ที่ทำตามโปรโตคอล iterator ซึ่งช่วยให้เข้าถึงสมาชิกของคอลเลกชันหรือลำดับได้ทีละรายการ โดยเป็นโครงสร้างที่มีตัวชี้ไปยังสมาชิกลำดับถัดไปในการวนซ้ำ และมีเมธอด `next()` ที่คืนค่าถัดไปในลำดับพร้อมค่าบูลีนซึ่งระบุว่าลำดับนั้น `done` แล้วหรือไม่

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Generator คือฟังก์ชันพิเศษที่กำหนดด้วยไวยากรณ์ `function*` ซึ่งช่วยให้การสร้าง iterator ง่ายขึ้น โดยใช้คีย์เวิร์ด `yield` เพื่อกำหนดลำดับของค่า และหยุดหรือทำงานต่อโดยอัตโนมัติเมื่อมีการร้องขอค่า

Generator ช่วยให้สร้าง iterator ได้ง่ายขึ้น และมีประโยชน์อย่างยิ่งเมื่อต้องทำงานกับลำดับขนาดใหญ่หรือลำดับอนันต์

ตัวอย่าง:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript ยังรองรับ async iterator และ async Generator อีกด้วย

ดูข้อมูลเพิ่มเติม:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### ข้อมูลอ้างอิง TsDocs JSDoc

เมื่อทำงานกับโค้ดเบส JavaScript คุณสามารถช่วยให้ TypeScript อนุมานชนิดที่ถูกต้องได้โดยใช้คอมเมนต์ JSDoc พร้อม annotation เพิ่มเติมเพื่อให้ข้อมูลชนิด

ตัวอย่าง:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

เอกสารฉบับเต็มมีอยู่ที่ลิงก์นี้:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

ตั้งแต่เวอร์ชัน 3.7 เป็นต้นมา คุณสามารถสร้างนิยามชนิด .d.ts จากไวยากรณ์ JSDoc ของ JavaScript ได้
ดูข้อมูลเพิ่มเติมได้ที่นี่:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

แพ็กเกจภายใต้องค์กร @types ใช้รูปแบบการตั้งชื่อแพ็กเกจแบบพิเศษเพื่อจัดเตรียมนิยามชนิดสำหรับไลบรารีหรือโมดูล JavaScript ที่มีอยู่แล้ว ตัวอย่างเช่น การใช้:

```shell
npm install --save-dev @types/lodash
```

จะติดตั้งนิยามชนิดของ `lodash` ในโปรเจกต์ปัจจุบันของคุณ

หากต้องการมีส่วนร่วมกับนิยามชนิดของแพ็กเกจ `@types` โปรดส่ง pull request ไปที่ [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

### JSX

JSX (JavaScript XML) เป็นส่วนขยายของไวยากรณ์ภาษา JavaScript ที่ช่วยให้คุณเขียนโค้ดคล้าย HTML ภายในไฟล์ JavaScript หรือ TypeScript ได้ โดยมักใช้ใน React เพื่อกำหนดโครงสร้าง HTML

TypeScript ขยายความสามารถของ JSX ด้วยการตรวจสอบชนิดและการวิเคราะห์แบบสแตติก

หากต้องการใช้ JSX คุณต้องตั้งค่าตัวเลือกคอมไพเลอร์ `jsx` ในไฟล์ `tsconfig.json` โดยมีตัวเลือกการกำหนดค่าที่ใช้กันทั่วไปสองแบบ:

* "preserve": สร้างไฟล์ .jsx โดยคง JSX ไว้ไม่เปลี่ยนแปลง ตัวเลือกนี้สั่งให้ TypeScript รักษาไวยากรณ์ JSX ตามเดิมและไม่แปลงระหว่างกระบวนการคอมไพล์ คุณสามารถใช้ตัวเลือกนี้ได้หากมีเครื่องมือแยกต่างหาก เช่น Babel ทำหน้าที่แปลงโค้ด
* "react": เปิดใช้การแปลง JSX ในตัวของ TypeScript โดยจะใช้ React.createElement

ดูตัวเลือกทั้งหมดได้ที่นี่:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### โมดูล ES6

TypeScript รองรับ ES6 (ECMAScript 2015) และอีกหลายเวอร์ชันที่ตามมา ซึ่งหมายความว่าคุณสามารถใช้ไวยากรณ์ ES6 เช่น arrow function, template literal, คลาส, โมดูล, destructuring และอื่น ๆ ได้

หากต้องการเปิดใช้คุณลักษณะของ ES6 ในโปรเจกต์ คุณสามารถระบุพร็อพเพอร์ตี `target` ใน tsconfig.json

ตัวอย่างการกำหนดค่า:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### ตัวดำเนินการยกกำลังของ ES7

ตัวดำเนินการยกกำลัง (`**`) คำนวณค่าที่ได้จากการยกตัวถูกดำเนินการตัวแรกด้วยเลขชี้กำลังจากตัวถูกดำเนินการตัวที่สอง โดยทำงานคล้าย `Math.pow()` แต่สามารถรับ BigInt เป็นตัวถูกดำเนินการได้ด้วย
TypeScript รองรับตัวดำเนินการนี้อย่างสมบูรณ์เมื่อกำหนด `target` ในไฟล์ tsconfig.json เป็น `es2016` หรือสูงกว่า

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### คำสั่ง for-await-of

นี่คือคุณลักษณะของ JavaScript ที่ TypeScript รองรับอย่างสมบูรณ์ ซึ่งช่วยให้คุณวนซ้ำออบเจ็กต์ iterable แบบอะซิงโครนัสเมื่อใช้ target เวอร์ชัน `es2018`

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Meta-property new.target

คุณสามารถใช้ meta-property `new.target` ใน TypeScript เพื่อระบุว่าฟังก์ชันหรือ constructor ถูกเรียกด้วยตัวดำเนินการ new หรือไม่ ซึ่งช่วยให้ตรวจสอบได้ว่าออบเจ็กต์ถูกสร้างขึ้นจากการเรียก constructor หรือไม่

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### นิพจน์ Dynamic Import

คุณสามารถโหลดโมดูลตามเงื่อนไขหรือโหลดแบบ lazy เมื่อต้องการได้โดยใช้ข้อเสนอ dynamic import ของ ECMAScript ซึ่ง TypeScript รองรับ

ไวยากรณ์ของนิพจน์ dynamic import ใน TypeScript มีดังนี้:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

คำสั่งนี้เริ่มคอมไพเลอร์ TypeScript ด้วยพารามิเตอร์ `--watch` และสามารถคอมไพล์ไฟล์ TypeScript ใหม่โดยอัตโนมัติทุกครั้งที่ไฟล์ถูกแก้ไข

```shell
tsc --watch
```

ตั้งแต่ TypeScript เวอร์ชัน 4.9 การเฝ้าดูไฟล์จะอาศัยอีเวนต์ของระบบไฟล์เป็นหลัก และเปลี่ยนไปใช้การ polling โดยอัตโนมัติหากไม่สามารถสร้าง watcher ที่อิงอีเวนต์ได้

### ตัวดำเนินการยืนยันว่าไม่ใช่ null

ตัวดำเนินการยืนยันว่าไม่ใช่ null (เครื่องหมาย ! แบบ postfix) ซึ่งเรียกอีกอย่างว่า definite assignment assertion เป็นคุณลักษณะของ TypeScript ที่ช่วยให้คุณยืนยันว่าตัวแปรหรือพร็อพเพอร์ตีไม่ใช่ null หรือ undefined แม้ว่าการวิเคราะห์ชนิดแบบสแตติกของ TypeScript จะระบุว่าอาจเป็นค่าเหล่านั้นได้ ด้วยคุณลักษณะนี้จึงสามารถตัดการตรวจสอบแบบชัดแจ้งออกได้

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### การประกาศที่มีค่าเริ่มต้น

การประกาศที่มีค่าเริ่มต้นใช้เมื่อตัวแปรหรือพารามิเตอร์ได้รับการกำหนดค่าเริ่มต้น ซึ่งหมายความว่าหากไม่มีการส่งค่าให้ตัวแปรหรือพารามิเตอร์นั้น ระบบจะใช้ค่าเริ่มต้นแทน

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Optional Chaining

ตัวดำเนินการ optional chaining `?.` ทำงานเหมือนตัวดำเนินการจุด (`.`) ทั่วไปในการเข้าถึงพร็อพเพอร์ตีหรือเมธอด แต่สามารถจัดการค่า null หรือ undefined ได้อย่างเหมาะสม โดยยุตินิพจน์และคืนค่า `undefined` แทนที่จะเกิดข้อผิดพลาด

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### ตัวดำเนินการ Nullish Coalescing

ตัวดำเนินการ nullish coalescing `??` จะคืนค่าทางขวามือหากค่าทางซ้ายมือเป็น `null` หรือ `undefined` มิฉะนั้นจะคืนค่าทางซ้ายมือ

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### ชนิด Template Literal

ชนิด Template Literal ช่วยให้คุณจัดการค่าสตริงในระดับชนิดและสร้างชนิดสตริงใหม่โดยอิงจากชนิดที่มีอยู่ ซึ่งมีประโยชน์สำหรับการสร้างชนิดที่สื่อความหมายและแม่นยำยิ่งขึ้นจากการดำเนินการกับสตริง

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### การโอเวอร์โหลดฟังก์ชัน

การโอเวอร์โหลดฟังก์ชันช่วยให้คุณกำหนด signature ของฟังก์ชันได้หลายแบบสำหรับชื่อฟังก์ชันเดียวกัน โดยแต่ละแบบมีชนิดพารามิเตอร์และชนิดค่าที่คืนแตกต่างกัน
เมื่อคุณเรียกฟังก์ชันที่โอเวอร์โหลด TypeScript จะใช้อาร์กิวเมนต์ที่ส่งมาเพื่อระบุ signature ของฟังก์ชันที่ถูกต้อง:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### ชนิดแบบเวียนเกิด

ชนิดแบบเวียนเกิดคือชนิดที่สามารถอ้างอิงถึงตัวเองได้ ซึ่งมีประโยชน์ในการกำหนดโครงสร้างข้อมูลที่มีโครงสร้างแบบลำดับชั้นหรือแบบเวียนเกิด (อาจซ้อนกันได้ไม่สิ้นสุด) เช่น linked list, tree และ graph

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### ชนิดแบบมีเงื่อนไขที่เวียนเกิด

TypeScript สามารถกำหนดความสัมพันธ์ของชนิดที่ซับซ้อนได้โดยใช้ตรรกะและการเวียนเกิด
มาทำความเข้าใจด้วยคำง่าย ๆ กัน:

ชนิดแบบมีเงื่อนไขช่วยให้คุณกำหนดชนิดตามเงื่อนไขบูลีนได้:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

การเวียนเกิดหมายถึงนิยามชนิดที่อ้างอิงถึงตัวเองภายในนิยามนั้น:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

ชนิดแบบมีเงื่อนไขที่เวียนเกิดรวมทั้งตรรกะแบบมีเงื่อนไขและการเวียนเกิดเข้าด้วยกัน หมายความว่านิยามชนิดสามารถขึ้นอยู่กับตัวเองผ่านตรรกะแบบมีเงื่อนไข ทำให้เกิดความสัมพันธ์ของชนิดที่ซับซ้อนและยืดหยุ่น

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### การรองรับโมดูล ECMAScript ใน Node

Node.js เพิ่มการรองรับโมดูล ECMAScript ตั้งแต่เวอร์ชัน 15.3.0 และ TypeScript รองรับโมดูล ECMAScript สำหรับ Node.js ตั้งแต่เวอร์ชัน 4.7 คุณสามารถเปิดใช้การรองรับนี้ได้โดยกำหนดพร็อพเพอร์ตี `module` เป็นค่า `nodenext` ในไฟล์ tsconfig.json ตัวอย่างมีดังนี้:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js รองรับนามสกุลไฟล์สำหรับโมดูลสองแบบ ได้แก่ `.mjs` สำหรับโมดูล ES และ `.cjs` สำหรับโมดูล CommonJS ส่วนนามสกุลไฟล์ที่เทียบเท่าใน TypeScript คือ `.mts` สำหรับโมดูล ES และ `.cts` สำหรับโมดูล CommonJS เมื่อคอมไพเลอร์ TypeScript transpile ไฟล์เหล่านี้เป็น JavaScript จะสร้างไฟล์ `.mjs` และ `.cjs`

หากต้องการใช้โมดูล ES ในโปรเจกต์ คุณสามารถกำหนดพร็อพเพอร์ตี `type` เป็น "module" ในไฟล์ package.json ซึ่งจะสั่งให้ Node.js ปฏิบัติต่อโปรเจกต์นี้ในฐานะโปรเจกต์โมดูล ES

นอกจากนี้ TypeScript ยังรองรับการประกาศชนิดในไฟล์ .d.ts ไฟล์ประกาศเหล่านี้ให้ข้อมูลชนิดสำหรับไลบรารีหรือโมดูลที่เขียนด้วย TypeScript ทำให้นักพัฒนารายอื่นสามารถใช้งานร่วมกับคุณลักษณะการตรวจสอบชนิดและการเติมข้อความอัตโนมัติของ TypeScript ได้

### ฟังก์ชัน Assertion

ใน TypeScript ฟังก์ชัน assertion คือฟังก์ชันที่ระบุการตรวจสอบเงื่อนไขเฉพาะจากค่าที่คืน ในรูปแบบที่ง่ายที่สุด ฟังก์ชัน assert จะตรวจสอบ predicate ที่ส่งเข้ามา และทำให้เกิดข้อผิดพลาดเมื่อ predicate ประเมินค่าเป็น false

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

หรือสามารถประกาศเป็นนิพจน์ฟังก์ชันได้:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

ฟังก์ชัน assertion มีความคล้ายคลึงกับ type guard โดย type guard ถูกนำมาใช้ครั้งแรกเพื่อตรวจสอบขณะรันไทม์และรับรองชนิดของค่าภายใน scope ที่กำหนด
กล่าวโดยเฉพาะ type guard คือฟังก์ชันที่ประเมิน type predicate และคืนค่าบูลีนเพื่อระบุว่า predicate เป็น true หรือ false ซึ่งแตกต่างจากฟังก์ชัน assertion เล็กน้อย เพราะฟังก์ชัน assertion มีจุดประสงค์เพื่อทำให้เกิดข้อผิดพลาดแทนการคืนค่า false เมื่อไม่เป็นไปตาม predicate

ตัวอย่าง type guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### ชนิด Variadic Tuple

ชนิด Variadic Tuple เป็นคุณลักษณะที่เปิดตัวใน TypeScript เวอร์ชัน 4.0 ดังนั้นเรามาเริ่มจากการทบทวนว่า tuple คืออะไร:

ชนิด tuple คืออาร์เรย์ที่กำหนดความยาวไว้และทราบชนิดของสมาชิกแต่ละตัว:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

คำว่า "variadic" หมายถึง arity ที่ไม่ตายตัว (รับอาร์กิวเมนต์ได้จำนวนแปรผัน)

variadic tuple คือชนิด tuple ที่มีพร็อพเพอร์ตีทั้งหมดเหมือนเดิม แต่ยังไม่ได้กำหนดรูปแบบที่แน่นอน:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

ในโค้ดก่อนหน้านี้ เราจะเห็นว่ารูปแบบของ tuple ถูกกำหนดโดย generic `T` ที่ส่งเข้ามา

variadic tuple สามารถรับ generic ได้หลายตัว จึงมีความยืดหยุ่นอย่างมาก:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

ด้วย variadic tuple แบบใหม่ เราสามารถใช้สิ่งต่อไปนี้ได้:

* spread ในไวยากรณ์ชนิด tuple สามารถเป็น generic ได้แล้ว ดังนั้นเราจึงสามารถแสดงการดำเนินการแบบ higher-order กับ tuple และอาร์เรย์ได้แม้ไม่ทราบชนิดจริงที่กำลังดำเนินการอยู่
* rest element สามารถอยู่ตรงตำแหน่งใดก็ได้ใน tuple

ตัวอย่าง:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### ชนิดแบบ Boxed

ชนิดแบบ boxed หมายถึงออบเจ็กต์ wrapper ที่ใช้แสดงชนิด primitive ในรูปแบบออบเจ็กต์ ออบเจ็กต์ wrapper เหล่านี้มีฟังก์ชันการทำงานและเมธอดเพิ่มเติมซึ่งไม่สามารถใช้กับค่า primitive ได้โดยตรง

เมื่อคุณเข้าถึงเมธอดอย่าง `charAt` หรือ `normalize` บนค่า primitive ชนิด `string` JavaScript จะห่อค่านั้นด้วยออบเจ็กต์ `String` เรียกเมธอด แล้วทิ้งออบเจ็กต์ดังกล่าว

ตัวอย่างสาธิต:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript แสดงความแตกต่างนี้ด้วยการกำหนดชนิดแยกกันสำหรับ primitive และออบเจ็กต์ wrapper ที่สอดคล้องกัน:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

โดยทั่วไปไม่จำเป็นต้องใช้ชนิดแบบ boxed ควรหลีกเลี่ยงชนิดแบบ boxed และใช้ชนิด primitive แทน เช่น ใช้ `string` แทน `String`

### Covariance และ Contravariance ใน TypeScript

Covariance และ contravariance อธิบายลักษณะการทำงานของความสัมพันธ์ระหว่างชนิดในชนิด generic

ใน TypeScript:

* อาร์เรย์เป็นแบบ **covariant** แต่ไม่ปลอดภัยด้านชนิดอย่างสมบูรณ์
* ชนิดพารามิเตอร์ของฟังก์ชันเป็น:
  * **contravariant** เมื่อเปิดใช้ `strictFunctionTypes`
  * **bivariant** ในกรณีอื่น

Covariance หมายถึงความสัมพันธ์ยังคงเดิม กล่าวคือ หากชนิด A เป็นชนิดย่อยของชนิด B แล้ว `F<A>` ก็เป็นชนิดย่อยของ `F<B>` เช่นกัน ใน TypeScript ลักษณะนี้มักพบในชนิดค่าที่คืนและอาร์เรย์ (แม้ covariance ของอาร์เรย์จะไม่ปลอดภัยด้านชนิดอย่างสมบูรณ์)

Contravariance หมายถึงความสัมพันธ์กลับทิศ กล่าวคือ หากชนิด A เป็นชนิดย่อยของชนิด B แล้ว `F<B>` จะเป็นชนิดย่อยของ `F<A>` ใน TypeScript ชนิดพารามิเตอร์ของฟังก์ชันถูกออกแบบให้เป็นแบบ contravariant ซึ่งหมายความว่าฟังก์ชันที่รับชนิดกว้างกว่าสามารถใช้แทนในตำแหน่งที่คาดหวังชนิดแคบกว่าได้

อย่างไรก็ตาม ในทางปฏิบัติ TypeScript มักยอมให้พารามิเตอร์ของฟังก์ชันเป็นแบบ bivariance (เว้นแต่จะเปิดใช้ `strictFunctionTypes`) ซึ่งหมายความว่าอาจยอมรับได้ทั้งสองทิศทางแม้จะไม่ปลอดภัยด้านชนิดอย่างเคร่งครัด

ตัวอย่าง: ลองนึกภาพพื้นที่สำหรับสัตว์ทุกชนิด และอีกพื้นที่หนึ่งสำหรับสุนัขเท่านั้น

* **Covariance**:  
  คุณสามารถใช้ “พื้นที่สำหรับสุนัข” ในตำแหน่งที่คาดหวัง “พื้นที่สำหรับสัตว์” ได้ เพราะสุนัขทุกตัวเป็นสัตว์  
  แต่ไม่สามารถใช้ “พื้นที่สำหรับสัตว์” ในตำแหน่งที่คาดหวัง “พื้นที่สำหรับสุนัข” ได้ เพราะในนั้นอาจมีสัตว์ที่ไม่ใช่สุนัข

* **Contravariance** (พิจารณาในแง่ของฟังก์ชัน):  
  หากคุณมีบางสิ่งที่จัดการ **สัตว์ชนิดใดก็ได้** คุณสามารถนำไปใช้ในตำแหน่งที่คาดหวังสิ่งซึ่งจัดการ **เฉพาะสุนัข** ได้  
  แต่ไม่สามารถทำในทางกลับกันได้

ตัวอย่าง Covariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

ตัวอย่าง Contravariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Variance Annotation แบบเลือกใช้ได้สำหรับพารามิเตอร์ชนิด

ตั้งแต่ TypeScript 4.7.0 เราสามารถใช้คีย์เวิร์ด `out` และ `in` เพื่อระบุ variance annotation ได้

สำหรับ covariance ให้ใช้คีย์เวิร์ด `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

และสำหรับ contravariant ให้ใช้คีย์เวิร์ด `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Index Signature ที่ใช้รูปแบบ Template String

index signature ที่ใช้รูปแบบ template string ช่วยให้เรากำหนด index signature ที่ยืดหยุ่นด้วยรูปแบบ template string ได้ คุณลักษณะนี้ทำให้เราสามารถสร้างออบเจ็กต์ที่เข้าถึงด้วยดัชนีซึ่งเป็นคีย์สตริงรูปแบบเฉพาะ จึงควบคุมและระบุความเจาะจงได้มากขึ้นเมื่อเข้าถึงและจัดการพร็อพเพอร์ตี

TypeScript ตั้งแต่เวอร์ชัน 4.4 อนุญาตให้ใช้ index signature สำหรับ symbol และรูปแบบ template string

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### ตัวดำเนินการ satisfies

ตัวดำเนินการ `satisfies` ช่วยให้คุณตรวจสอบได้ว่าชนิดที่กำหนดเป็นไปตาม interface หรือเงื่อนไขเฉพาะหรือไม่ กล่าวอีกนัยหนึ่งคือช่วยรับรองว่าชนิดนั้นมีพร็อพเพอร์ตีและเมธอดที่จำเป็นทั้งหมดของ interface ที่ระบุ เป็นวิธีรับรองว่าตัวแปรตรงกับนิยามของชนิด
ตัวอย่างมีดังนี้:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### การ Import และ Export เฉพาะชนิด

การ import และ export เฉพาะชนิดช่วยให้คุณ import หรือ export ชนิดได้โดยไม่ต้อง import หรือ export ค่าและฟังก์ชันที่เชื่อมโยงกับชนิดเหล่านั้น ซึ่งช่วยลดขนาด bundle ได้

หากต้องการ import เฉพาะชนิด คุณสามารถใช้คีย์เวิร์ด `import type`

TypeScript อนุญาตให้ใช้นามสกุลไฟล์ทั้งแบบประกาศและแบบ implementation (.ts, .mts, .cts และ .tsx) ในการ import เฉพาะชนิด ไม่ว่าจะตั้งค่า `allowImportingTsExtensions` ไว้อย่างไรก็ตาม

ตัวอย่าง:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

รูปแบบต่อไปนี้ได้รับการรองรับ:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### การประกาศ using และการจัดการทรัพยากรอย่างชัดแจ้ง

การประกาศ `using` เป็น binding ที่เปลี่ยนแปลงค่าไม่ได้และมี scope ระดับบล็อก คล้ายกับ `const` ใช้สำหรับจัดการทรัพยากรที่กำจัดได้ เมื่อกำหนดค่าเริ่มต้นด้วยค่าใด เมธอด `Symbol.dispose` ของค่านั้นจะถูกบันทึกไว้และเรียกใช้ในภายหลังเมื่อออกจาก scope ของบล็อกที่ครอบอยู่

สิ่งนี้อิงตามคุณลักษณะ Resource Management ของ ECMAScript ซึ่งมีประโยชน์สำหรับดำเนินงานล้างข้อมูลที่จำเป็นหลังจากสร้างออบเจ็กต์ เช่น การปิดการเชื่อมต่อ การลบไฟล์ และการคืนหน่วยความจำ

หมายเหตุ:

* เนื่องจากเพิ่งเปิดตัวใน TypeScript เวอร์ชัน 5.2 รันไทม์ส่วนใหญ่จึงยังไม่รองรับโดยตรง คุณจะต้องใช้ polyfill สำหรับ: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`
* นอกจากนี้ คุณจะต้องกำหนดค่า tsconfig.json ดังนี้:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

ตัวอย่าง:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

โค้ดจะแสดงผลดังนี้:

```shell
1
2
disposed
3
```

ทรัพยากรที่สามารถกำจัดได้ต้องเป็นไปตาม interface `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

การประกาศ `using` จะบันทึกการดำเนินการกำจัดทรัพยากรไว้ใน stack เพื่อให้แน่ใจว่าทรัพยากรถูกกำจัดตามลำดับย้อนกลับของการประกาศ:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

มีการรับประกันว่าทรัพยากรจะถูกกำจัด แม้ว่าโค้ดหรือข้อยกเว้นที่ตามมาจะเกิดขึ้นก็ตาม การกำจัดอาจทำให้เกิดข้อยกเว้นซึ่งอาจบดบังข้อยกเว้นอีกตัวหนึ่งได้ จึงมีการเพิ่มข้อยกเว้นเนทีฟแบบใหม่ชื่อ `SuppressedError` เพื่อเก็บรักษาข้อมูลเกี่ยวกับข้อผิดพลาดที่ถูกบดบัง

#### การประกาศ await using

การประกาศ `await using` ใช้จัดการทรัพยากรที่กำจัดแบบอะซิงโครนัสได้ ค่าดังกล่าวต้องมีเมธอด `Symbol.asyncDispose` ซึ่งจะได้รับการ await เมื่อสิ้นสุดบล็อก

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

ทรัพยากรที่กำจัดแบบอะซิงโครนัสได้ต้องเป็นไปตาม interface `Disposable` หรือ `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

โค้ดแสดงผลดังนี้:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

อนุญาตให้ใช้การประกาศ `using` และ `await using` ในคำสั่งต่อไปนี้: `for`, `for-in`, `for-of`, `for-await-of`, `switch`

### Import Attributes

Import Attributes (ป้ายกำกับสำหรับ import) ของ TypeScript 5.3 บอกรันไทม์ว่าควรจัดการโมดูลอย่างไร (JSON เป็นต้น) ซึ่งช่วยปรับปรุงความปลอดภัยด้วยการทำให้ import ชัดเจน และสอดคล้องกับ Content Security Policy (CSP) เพื่อให้การโหลดทรัพยากรปลอดภัยยิ่งขึ้น TypeScript จะตรวจสอบว่าค่าเหล่านี้ถูกต้อง แต่ปล่อยให้รันไทม์ตีความเพื่อจัดการโมดูลแต่ละแบบ

ตัวอย่าง:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

เมื่อใช้ dynamic import:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### การตรวจสอบไวยากรณ์ Regular Expression

ตั้งแต่ TypeScript 5.5.4 จะมีการตรวจสอบ regex literal เพื่อหาข้อผิดพลาดที่พบบ่อยในเวลาคอมไพล์ (เช่น ไวยากรณ์ไม่ถูกต้อง backreference ผิด หรือคุณลักษณะที่ไม่รองรับในเวอร์ชัน JS เป้าหมาย) ซึ่งช่วยตรวจพบบั๊กได้เร็วขึ้น แต่จะไม่ตรวจสอบสตริง new RegExp("...")

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` ช่วยให้คุณโหลดโมดูลได้โดยเลื่อนการทำงานของโมดูลออกไปจนกว่าจะใช้งานบางสิ่งจากโมดูลจริง ๆ ซึ่งช่วยหลีกเลี่ยงการทำงานและ side effect ที่ไม่จำเป็น

* ใช้ได้เฉพาะกับ: `import defer * as name from "module"`
* โค้ดจะทำงานเมื่อคุณเข้าถึง export เท่านั้น
