---
title: บทนำสู่ TypeScript
sidebar:
  order: 8
  label: 8. บทนำสู่ TypeScript
---


### TypeScript คืออะไร?

TypeScript เป็นภาษาโปรแกรมแบบ strongly typed ที่ต่อยอดจาก JavaScript เดิมทีออกแบบโดย Anders Hejlsberg ในปี 2012 และปัจจุบันได้รับการพัฒนาและดูแลโดย Microsoft ในรูปแบบโปรเจกต์โอเพนซอร์ส

TypeScript คอมไพล์เป็น JavaScript และทำงานได้ใน JavaScript runtime ทุกชนิด (เช่น เบราว์เซอร์หรือ Node.js บนเซิร์ฟเวอร์)

ภาษานี้รองรับกระบวนทัศน์การเขียนโปรแกรมหลายรูปแบบ เช่น functional, generic, imperative และ object-oriented และเป็นภาษาที่ต้องคอมไพล์ (transpile) ให้เป็น JavaScript ก่อนนำไปรัน

### ทำไมต้องใช้ TypeScript?

TypeScript เป็นภาษาแบบ strongly typed ที่ช่วยป้องกันข้อผิดพลาดทั่วไปในการเขียนโปรแกรม และหลีกเลี่ยง runtime error บางประเภทก่อนที่จะรันโปรแกรม

ภาษาแบบ strongly typed ช่วยให้นักพัฒนาระบุข้อจำกัดและพฤติกรรมต่าง ๆ ของโปรแกรมไว้ในการกำหนดชนิดข้อมูล ทำให้ตรวจสอบความถูกต้องของซอฟต์แวร์และป้องกันข้อบกพร่องได้ง่ายขึ้น ซึ่งมีประโยชน์อย่างยิ่งในแอปพลิเคชันขนาดใหญ่

ประโยชน์บางประการของ TypeScript ได้แก่:

* การกำหนดชนิดข้อมูลแบบ static และเลือกใช้การกำหนดชนิดแบบเข้มงวดได้
* การอนุมานชนิดข้อมูล
* เข้าถึงคุณสมบัติของ ES6 และ ES7
* รองรับหลายแพลตฟอร์มและหลายเบราว์เซอร์
* เครื่องมือที่รองรับ IntelliSense

### TypeScript และ JavaScript

TypeScript เขียนในไฟล์ `.ts` หรือ `.tsx` ส่วน JavaScript เขียนในไฟล์ `.js` หรือ `.jsx`

ไฟล์ที่มีนามสกุล `.tsx` หรือ `.jsx` สามารถมี JSX ซึ่งเป็นส่วนขยายไวยากรณ์ของ JavaScript ที่ใช้ใน React สำหรับพัฒนา UI

ในแง่ไวยากรณ์ TypeScript เป็น superset แบบมีชนิดข้อมูลของ JavaScript (ECMAScript 2015) โค้ด JavaScript ทั้งหมดเป็นโค้ด TypeScript ที่ถูกต้อง แต่ในทางกลับกันไม่เป็นเช่นนั้นเสมอไป

ตัวอย่างเช่น ลองพิจารณาฟังก์ชันในไฟล์ JavaScript ที่มีนามสกุล `.js` ดังต่อไปนี้:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

เราสามารถแปลงและใช้ฟังก์ชันนี้ใน TypeScript ได้โดยเปลี่ยนนามสกุลไฟล์เป็น `.ts` แต่หากเพิ่มคำอธิบายชนิดข้อมูล TypeScript ให้ฟังก์ชันเดียวกัน จะไม่สามารถรันใน JavaScript runtime ใด ๆ ได้โดยไม่คอมไพล์ โค้ด TypeScript ต่อไปนี้จะเกิด syntax error หากไม่ได้คอมไพล์:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript ได้รับการออกแบบให้ตรวจจับ runtime error ที่อาจเกิดขึ้นตั้งแต่เวลาคอมไพล์ โดยเปิดให้นักพัฒนาสื่อเจตนาผ่านคำอธิบายชนิดข้อมูล นอกจากนี้ การอนุมานชนิดข้อมูลยังช่วยให้ TypeScript ตรวจพบปัญหาบางอย่างได้แม้ไม่ได้ระบุคำอธิบายชนิดข้อมูลไว้อย่างชัดเจน ตัวอย่างโค้ดต่อไปนี้ไม่ได้ระบุชนิดข้อมูล TypeScript ใด ๆ:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

ในกรณีนี้ TypeScript ตรวจพบข้อผิดพลาดและรายงานว่า:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

ระบบชนิดข้อมูลของ TypeScript ได้รับอิทธิพลอย่างมากจากพฤติกรรม runtime ของ JavaScript ตัวอย่างเช่น ตัวดำเนินการบวก (+) ซึ่งใน JavaScript สามารถต่อสตริงหรือบวกตัวเลขได้ ถูกจำลองในลักษณะเดียวกันใน TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

ทีมงาน TypeScript ตั้งใจให้การใช้ JavaScript ในรูปแบบที่ผิดปกติถูกระบุเป็นข้อผิดพลาด ตัวอย่างเช่น ลองพิจารณาโค้ด JavaScript ที่ถูกต้องต่อไปนี้:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

อย่างไรก็ตาม TypeScript จะแจ้งข้อผิดพลาด:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

ข้อผิดพลาดนี้เกิดขึ้นเพราะ TypeScript บังคับใช้ความเข้ากันได้ของชนิดข้อมูลอย่างเคร่งครัด และในกรณีนี้ตรวจพบการดำเนินการที่ไม่ถูกต้องระหว่าง number กับ boolean

### การสร้างโค้ดของ TypeScript

คอมไพเลอร์ TypeScript มีหน้าที่หลักสองประการ ได้แก่ ตรวจสอบข้อผิดพลาดด้านชนิดข้อมูลและคอมไพล์เป็น JavaScript กระบวนการทั้งสองแยกจากกัน ชนิดข้อมูลไม่ส่งผลต่อการทำงานของโค้ดใน JavaScript runtime เพราะจะถูกลบออกทั้งหมดระหว่างการคอมไพล์ TypeScript ยังสามารถสร้าง JavaScript ออกมาได้แม้มีข้อผิดพลาดด้านชนิดข้อมูล
ต่อไปนี้เป็นตัวอย่างโค้ด TypeScript ที่มีข้อผิดพลาดด้านชนิดข้อมูล:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

อย่างไรก็ตาม ยังสามารถสร้างผลลัพธ์ JavaScript ที่รันได้:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

ไม่สามารถตรวจสอบชนิดข้อมูล TypeScript ที่ runtime ได้ ตัวอย่างเช่น:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

เนื่องจากชนิดข้อมูลถูกลบหลังการคอมไพล์ จึงไม่มีทางรันโค้ดนี้ใน JavaScript ได้ หากต้องการแยกแยะชนิดข้อมูลที่ runtime เราต้องใช้กลไกอื่น TypeScript มีตัวเลือกหลายแบบ โดยแบบที่พบบ่อยคือ "tagged union" ตัวอย่างเช่น:

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

พร็อพเพอร์ตี "kind" เป็นค่าที่ใช้แยกความแตกต่างระหว่างออบเจ็กต์ใน JavaScript ที่ runtime ได้

ค่าที่ runtime อาจมีชนิดข้อมูลแตกต่างจากชนิดที่ระบุไว้ในการประกาศชนิดข้อมูลได้เช่นกัน ตัวอย่างเช่น เมื่อนักพัฒนาเข้าใจชนิดข้อมูลของ API ผิดและใส่คำอธิบายไว้ไม่ถูกต้อง

TypeScript เป็น superset ของ JavaScript ดังนั้นคีย์เวิร์ด "class" จึงใช้ได้ทั้งเป็นชนิดข้อมูลและเป็นค่าที่ runtime

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

ใน JavaScript "class" มีพร็อพเพอร์ตี "prototype" และสามารถใช้ตัวดำเนินการ "instanceof" เพื่อตรวจสอบว่าพร็อพเพอร์ตี prototype ของ constructor ปรากฏอยู่ที่ใดใน prototype chain ของออบเจ็กต์หรือไม่

TypeScript ไม่ส่งผลต่อประสิทธิภาพที่ runtime เพราะชนิดข้อมูลทั้งหมดจะถูกลบออก อย่างไรก็ตาม TypeScript เพิ่มภาระในขั้นตอน build อยู่บ้าง

### ใช้ JavaScript สมัยใหม่ได้แล้ววันนี้ (Downleveling)

TypeScript สามารถคอมไพล์โค้ดเป็น JavaScript รุ่นใดก็ได้ที่เปิดตัวตั้งแต่ ECMAScript 3 (1999) เป็นต้นมา ซึ่งหมายความว่า TypeScript สามารถ transpile โค้ดที่ใช้คุณสมบัติล่าสุดของ JavaScript ให้เป็นรุ่นเก่าได้ กระบวนการนี้เรียกว่า Downleveling ทำให้ใช้ JavaScript สมัยใหม่ได้พร้อมรักษาความเข้ากันได้สูงสุดกับสภาพแวดล้อม runtime รุ่นเก่า

ควรทราบว่าระหว่างการ transpile เป็น JavaScript รุ่นเก่า TypeScript อาจสร้างโค้ดที่มีภาระด้านประสิทธิภาพมากกว่าการทำงานแบบ native

ต่อไปนี้เป็นคุณสมบัติ JavaScript สมัยใหม่บางส่วนที่ใช้ใน TypeScript ได้:

* โมดูล ECMAScript แทน callback แบบ "define" ของ AMD หรือคำสั่ง "require" ของ CommonJS
* Class แทน prototype
* ประกาศตัวแปรด้วย "let" หรือ "const" แทน "var"
* ลูป "for-of" หรือ ".forEach" แทนลูป "for" แบบดั้งเดิม
* Arrow function แทน function expression
* Destructuring assignment
* ชื่อพร็อพเพอร์ตี/เมธอดแบบย่อ และชื่อพร็อพเพอร์ตีที่คำนวณได้
* พารามิเตอร์เริ่มต้นของฟังก์ชัน

การใช้ประโยชน์จากคุณสมบัติ JavaScript สมัยใหม่เหล่านี้ช่วยให้นักพัฒนาเขียนโค้ด TypeScript ที่สื่อความหมายและกระชับยิ่งขึ้น

