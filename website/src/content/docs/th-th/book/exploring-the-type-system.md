---
title: สำรวจระบบชนิด
sidebar:
  order: 10
  label: 10. สำรวจระบบชนิด
---


### บริการภาษาของ TypeScript

TypeScript Language Service หรือที่รู้จักกันในชื่อ tsserver มีคุณสมบัติต่าง ๆ เช่น การรายงานข้อผิดพลาด การวินิจฉัย การคอมไพล์เมื่อบันทึก การเปลี่ยนชื่อ การไปยังนิยาม รายการเติมข้อความอัตโนมัติ ความช่วยเหลือเกี่ยวกับลายเซ็น และอื่น ๆ โดยสภาพแวดล้อมการพัฒนาแบบเบ็ดเสร็จ (IDE) ใช้บริการนี้เป็นหลักเพื่อรองรับ IntelliSense บริการนี้ผสานรวมกับ Visual Studio Code ได้อย่างราบรื่น และเครื่องมือต่าง ๆ เช่น Conquer of Completion (Coc) ก็นำไปใช้ด้วย

นักพัฒนาสามารถใช้ประโยชน์จาก API เฉพาะและสร้างปลั๊กอินบริการภาษาที่ปรับแต่งเอง เพื่อยกระดับประสบการณ์การแก้ไข TypeScript ซึ่งมีประโยชน์อย่างยิ่งสำหรับการนำคุณสมบัติ linting แบบพิเศษมาใช้ หรือการเปิดใช้การเติมข้อความอัตโนมัติสำหรับภาษาเทมเพลตที่กำหนดเอง

<!-- markdownlint-disable MD044 -->
ตัวอย่างปลั๊กอินที่ปรับแต่งเองและใช้งานจริงคือ "typescript-styled-plugin" ซึ่งรองรับการรายงานข้อผิดพลาดทางไวยากรณ์และ IntelliSense สำหรับพร็อพเพอร์ตี CSS ใน styled components
<!-- markdownlint-enable MD044 -->

สำหรับข้อมูลเพิ่มเติมและคู่มือเริ่มต้นอย่างรวดเร็ว โปรดดู Wiki อย่างเป็นทางการของ TypeScript บน GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### การกำหนดชนิดเชิงโครงสร้าง

TypeScript มีพื้นฐานอยู่บนระบบชนิดเชิงโครงสร้าง ซึ่งหมายความว่าความเข้ากันได้และความเท่าเทียมกันของชนิดจะพิจารณาจากโครงสร้างหรือนิยามที่แท้จริงของชนิด ไม่ใช่ชื่อหรือตำแหน่งที่ประกาศเหมือนในระบบชนิดเชิงนาม เช่น C# หรือ C

ระบบชนิดเชิงโครงสร้างของ TypeScript ได้รับการออกแบบโดยอิงจากการทำงานของระบบ duck typing แบบไดนามิกของ JavaScript ขณะรันไทม์

ตัวอย่างต่อไปนี้เป็นโค้ด TypeScript ที่ถูกต้อง ดังที่สังเกตได้ว่า "X" และ "Y" มีสมาชิก "a" เหมือนกัน แม้จะมีชื่อประกาศต่างกัน ชนิดจะพิจารณาจากโครงสร้าง และในกรณีนี้เนื่องจากโครงสร้างเหมือนกัน จึงเข้ากันได้และถูกต้อง

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### กฎพื้นฐานในการเปรียบเทียบของ TypeScript

กระบวนการเปรียบเทียบของ TypeScript ทำงานแบบเรียกซ้ำกับชนิดที่ซ้อนกันอยู่ในทุกระดับ

ชนิด "X" เข้ากันได้กับ "Y" หาก "Y" มีสมาชิกอย่างน้อยเหมือนกับ "X"

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

พารามิเตอร์ของฟังก์ชันเปรียบเทียบกันด้วยชนิด ไม่ใช่ชื่อ:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

ชนิดค่าที่ส่งกลับของฟังก์ชันต้องเหมือนกัน:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

ชนิดค่าที่ส่งกลับของฟังก์ชันต้นทางต้องเป็นชนิดย่อยของชนิดค่าที่ส่งกลับของฟังก์ชันเป้าหมาย:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

อนุญาตให้ละทิ้งพารามิเตอร์ของฟังก์ชันได้ เนื่องจากเป็นแนวปฏิบัติทั่วไปใน JavaScript เช่น เมื่อใช้ "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

ดังนั้น การประกาศชนิดต่อไปนี้จึงถูกต้องอย่างสมบูรณ์:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

พารามิเตอร์ทางเลือกเพิ่มเติมใด ๆ ของชนิดต้นทางถือว่าถูกต้อง:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

พารามิเตอร์ทางเลือกใด ๆ ของชนิดเป้าหมายที่ไม่มีพารามิเตอร์ที่สอดคล้องกันในชนิดต้นทางถือว่าถูกต้องและไม่เป็นข้อผิดพลาด:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

พารามิเตอร์ rest จะถือเป็นชุดพารามิเตอร์ทางเลือกที่มีจำนวนไม่สิ้นสุด:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

ฟังก์ชันที่มีโอเวอร์โหลดจะถูกต้อง หากลายเซ็นโอเวอร์โหลดเข้ากันได้กับลายเซ็นการนำไปใช้:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

การเปรียบเทียบพารามิเตอร์ของฟังก์ชันจะสำเร็จ หากพารามิเตอร์ต้นทางและเป้าหมายสามารถกำหนดให้กับชนิดแม่หรือชนิดย่อยได้ (bivariance)

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Enum สามารถเปรียบเทียบและใช้ร่วมกับตัวเลขได้ รวมถึงในทางกลับกัน แต่การเปรียบเทียบค่า Enum จากชนิด Enum ที่ต่างกันถือว่าไม่ถูกต้อง

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

อินสแตนซ์ของคลาสจะต้องผ่านการตรวจสอบความเข้ากันได้ของสมาชิก private และ protected:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

การตรวจสอบการเปรียบเทียบจะไม่พิจารณาความแตกต่างของลำดับชั้นการสืบทอด ตัวอย่างเช่น:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Generic จะเปรียบเทียบกันโดยใช้โครงสร้างตามชนิดผลลัพธ์หลังจากนำพารามิเตอร์ generic ไปใช้ โดยจะเปรียบเทียบเฉพาะผลลัพธ์สุดท้ายในฐานะชนิดที่ไม่ใช่ generic

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

เมื่อ generic ไม่ได้ระบุอาร์กิวเมนต์ชนิด อาร์กิวเมนต์ที่ไม่ระบุทั้งหมดจะถือเป็นชนิด "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

โปรดจำไว้ว่า:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

โปรดทราบว่าเมื่อเปิดใช้งาน "strictNullChecks" ค่า "null" และ "undefined" จะถูกจัดการคล้ายกับ "void" มิฉะนั้นจะคล้ายกับ "never"

### ชนิดในฐานะเซต

ใน TypeScript ชนิดคือเซตของค่าที่เป็นไปได้ เซตนี้เรียกอีกอย่างว่าโดเมนของชนิด แต่ละค่าของชนิดสามารถมองเป็นสมาชิกหนึ่งในเซตได้ ชนิดกำหนดข้อจำกัดที่ทุกองค์ประกอบในเซตต้องเป็นไปตาม จึงจะถือว่าเป็นสมาชิกของเซตนั้น
หน้าที่หลักของ TypeScript คือการตรวจสอบและยืนยันว่าเซตหนึ่งเป็นเซตย่อยของอีกเซตหนึ่งหรือไม่

TypeScript รองรับเซตหลายประเภท:

| คำศัพท์เกี่ยวกับเซต | TypeScript                      | หมายเหตุ                                                                                                           |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| เซตว่าง            | never                           | "never" ไม่มีสิ่งใดนอกจากตัวมันเอง                                                                                |
| เซตสมาชิกเดียว     | undefined / null / literal type |                                                                                                                    |
| เซตจำกัด           | boolean / union                 |                                                                                                                    |
| เซตอนันต์           | string / number / object        |                                                                                                                    |
| เซตสากล            | any / unknown                   | ทุกองค์ประกอบเป็นสมาชิกของ "any" และทุกเซตเป็นเซตย่อยของมัน / "unknown" คือชนิดคู่เทียบที่ปลอดภัยด้านชนิดของ "any" |

ตัวอย่างบางส่วนมีดังนี้:

| TypeScript            | คำศัพท์เกี่ยวกับเซต    | ตัวอย่าง                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (เซตว่าง)            | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Literal type          | เซตสมาชิกเดียว         | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| ค่าที่กำหนดให้ T ได้  | ค่า ∈ T (เป็นสมาชิกของ) | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 กำหนดให้ T2 ได้    | T1 ⊆ T2 (เป็นเซตย่อยของ) | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (เป็นเซตย่อยของ) | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (ยูเนียน)      | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (อินเตอร์เซกชัน) | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | เซตสากล                | const x: unknown = 1                                                            |

ยูเนียน (T1 | T2) สร้างเซตที่กว้างขึ้น (ทั้งสองชนิด):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

อินเตอร์เซกชัน (T1 & T2) สร้างเซตที่แคบลง (เฉพาะส่วนที่มีร่วมกัน):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

ในบริบทนี้ คีย์เวิร์ด `extends` สามารถถือว่าหมายถึง "เป็นเซตย่อยของ" โดยใช้กำหนดข้อจำกัดให้กับชนิด เมื่อใช้ `extends` กับ generic คีย์เวิร์ดนี้จะจำกัดพารามิเตอร์ชนิด generic ให้เป็นชนิดที่เฉพาะเจาะจงยิ่งขึ้น

โปรดทราบว่า `extends` ในที่นี้ไม่เกี่ยวข้องกับการสืบทอดคลาสในความหมายของ OOP

TypeScript ทำงานกับชนิดเชิงโครงสร้างและไม่มีลำดับชั้นเชิงนามที่เคร่งครัด ที่จริงแล้ว ดังตัวอย่างด้านล่าง ชนิดสองชนิดสามารถทับซ้อนกันได้โดยที่ชนิดใดชนิดหนึ่งไม่จำเป็นต้องเป็นชนิดย่อยของอีกชนิด เพราะ TypeScript พิจารณาโครงสร้างหรือรูปร่างของออบเจ็กต์

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### การกำหนดชนิด: การประกาศชนิดและการยืนยันชนิด

ใน TypeScript สามารถกำหนดชนิดได้หลายวิธี:

#### การประกาศชนิด

ในตัวอย่างต่อไปนี้ เราใช้ x: X (": Type") เพื่อประกาศชนิดให้กับตัวแปร x

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

หากตัวแปรไม่อยู่ในรูปแบบที่ระบุ TypeScript จะรายงานข้อผิดพลาด ตัวอย่างเช่น:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### การยืนยันชนิด

สามารถเพิ่มการยืนยันได้โดยใช้คีย์เวิร์ด `as` ซึ่งเป็นการบอกคอมไพเลอร์ว่านักพัฒนามีข้อมูลเกี่ยวกับชนิดมากกว่า และระงับข้อผิดพลาดใด ๆ ที่อาจเกิดขึ้น

ตัวอย่างเช่น:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

ในตัวอย่างข้างต้น ออบเจ็กต์ x ได้รับการยืนยันให้มีชนิด X โดยใช้คีย์เวิร์ด as ซึ่งแจ้งให้คอมไพเลอร์ TypeScript ทราบว่าออบเจ็กต์สอดคล้องกับชนิดที่ระบุ แม้ว่าจะมีพร็อพเพอร์ตี b เพิ่มเติมซึ่งไม่มีอยู่ในนิยามชนิดก็ตาม

การยืนยันชนิดมีประโยชน์ในสถานการณ์ที่ต้องระบุชนิดให้เฉพาะเจาะจงยิ่งขึ้น โดยเฉพาะเมื่อทำงานกับ DOM ตัวอย่างเช่น:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

ในที่นี้ ใช้การยืนยันชนิด as HTMLInputElement เพื่อบอก TypeScript ว่าควรจัดการผลลัพธ์ของ getElementById เป็น HTMLInputElement
การยืนยันชนิดยังสามารถใช้แมปคีย์ใหม่ได้ ดังตัวอย่างด้านล่างที่ใช้ template literal:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

ในตัวอย่างนี้ ชนิด `J<Type>` ใช้ mapped type ร่วมกับ template literal เพื่อแมปคีย์ของ Type ใหม่ โดยสร้างพร็อพเพอร์ตีใหม่ที่เพิ่ม "prefix_" ไว้หน้าคีย์แต่ละรายการ และค่าที่สอดคล้องกันคือฟังก์ชันที่ส่งกลับค่าพร็อพเพอร์ตีเดิม

ควรสังเกตว่าเมื่อใช้การยืนยันชนิด TypeScript จะไม่ดำเนินการตรวจสอบพร็อพเพอร์ตีส่วนเกิน ดังนั้น โดยทั่วไปจึงควรใช้การประกาศชนิดเมื่อทราบโครงสร้างของออบเจ็กต์ล่วงหน้า

#### การประกาศแบบ Ambient

การประกาศแบบ Ambient คือไฟล์ที่อธิบายชนิดสำหรับโค้ด JavaScript โดยมีรูปแบบชื่อไฟล์เป็น `.d.ts` โดยทั่วไปจะนำเข้าและใช้เพื่อใส่คำอธิบายประกอบให้กับไลบรารี JavaScript ที่มีอยู่ หรือเพื่อเพิ่มชนิดให้กับไฟล์ JS ที่มีอยู่ในโครงการของคุณ

ชนิดสำหรับไลบรารีที่ใช้กันทั่วไปจำนวนมากสามารถหาได้ที่:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

และสามารถติดตั้งได้โดยใช้:

```shell
npm install --save-dev @types/library-name
```

สำหรับการประกาศแบบ Ambient ที่คุณกำหนดเอง สามารถนำเข้าได้โดยใช้การอ้างอิงแบบ "triple-slash":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

คุณสามารถใช้การประกาศแบบ Ambient ได้แม้ภายในไฟล์ JavaScript โดยใช้ `// @ts-check`

คีย์เวิร์ด `declare` ช่วยให้กำหนดชนิดสำหรับโค้ด JavaScript ที่มีอยู่ได้โดยไม่ต้องนำเข้า โดยทำหน้าที่เป็นตัวยึดสำหรับชนิดจากไฟล์อื่นหรือจากขอบเขตโกลบอล

### การตรวจสอบพร็อพเพอร์ตีและการตรวจสอบพร็อพเพอร์ตีส่วนเกิน

TypeScript มีพื้นฐานอยู่บนระบบชนิดเชิงโครงสร้าง แต่การตรวจสอบพร็อพเพอร์ตีส่วนเกินเป็นคุณสมบัติของ TypeScript ที่ช่วยให้ตรวจสอบได้ว่าออบเจ็กต์มีพร็อพเพอร์ตีตรงตามที่ระบุไว้ในชนิดทุกประการหรือไม่

การตรวจสอบพร็อพเพอร์ตีส่วนเกินจะดำเนินการเมื่อกำหนด object literal ให้กับตัวแปร หรือเมื่อส่งเป็นอาร์กิวเมนต์ให้กับฟังก์ชัน ตัวอย่างเช่น

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### ชนิดแบบอ่อน

ชนิดหนึ่งจะถือว่าเป็นชนิดแบบอ่อน เมื่อมีเพียงชุดพร็อพเพอร์ตีที่เป็นทางเลือกทั้งหมด:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript ถือว่าการกำหนดค่าใด ๆ ให้กับชนิดแบบอ่อนที่ไม่มีส่วนทับซ้อนกันเป็นข้อผิดพลาด ตัวอย่างเช่น โค้ดต่อไปนี้ทำให้เกิดข้อผิดพลาด:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

แม้จะไม่แนะนำ แต่หากจำเป็นก็สามารถข้ามการตรวจสอบนี้ได้โดยใช้การยืนยันชนิด:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

หรือเพิ่ม `unknown` ลงใน index signature ของชนิดแบบอ่อน:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### การตรวจสอบ Object Literal อย่างเข้มงวด (Freshness)

การตรวจสอบ object literal อย่างเข้มงวด ซึ่งบางครั้งเรียกว่า "freshness" เป็นคุณสมบัติใน TypeScript ที่ช่วยตรวจจับพร็อพเพอร์ตีส่วนเกินหรือพร็อพเพอร์ตีที่สะกดผิด ซึ่งมิฉะนั้นอาจไม่ถูกตรวจพบในการตรวจสอบชนิดเชิงโครงสร้างตามปกติ

เมื่อสร้าง object literal คอมไพเลอร์ TypeScript จะถือว่าเป็นค่า "fresh" หาก object literal ถูกกำหนดให้กับตัวแปรหรือส่งเป็นพารามิเตอร์ TypeScript จะทำให้เกิดข้อผิดพลาดหาก object literal ระบุพร็อพเพอร์ตีที่ไม่มีอยู่ในชนิดเป้าหมาย

อย่างไรก็ตาม "freshness" จะหายไปเมื่อ object literal ถูกขยายชนิดหรือมีการใช้การยืนยันชนิด

ตัวอย่างต่อไปนี้ช่วยอธิบายแนวคิดดังกล่าว:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### การอนุมานชนิด

TypeScript สามารถอนุมานชนิดได้เมื่อไม่มีการระบุคำอธิบายประกอบในระหว่าง:

* การกำหนดค่าเริ่มต้นให้ตัวแปร
* การกำหนดค่าเริ่มต้นให้สมาชิก
* การตั้งค่าเริ่มต้นสำหรับพารามิเตอร์
* การกำหนดชนิดค่าที่ส่งกลับของฟังก์ชัน

ตัวอย่างเช่น:

```typescript
let x = 'x'; // The type inferred is string
```

คอมไพเลอร์ TypeScript จะวิเคราะห์ค่าหรือนิพจน์ และกำหนดชนิดโดยอิงจากข้อมูลที่มีอยู่

### การอนุมานขั้นสูงขึ้น

เมื่อใช้หลายนิพจน์ในการอนุมานชนิด TypeScript จะค้นหา "ชนิดร่วมที่เหมาะสมที่สุด" ตัวอย่างเช่น:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

หากคอมไพเลอร์ไม่พบชนิดร่วมที่เหมาะสมที่สุด ก็จะส่งกลับชนิดยูเนียน ตัวอย่างเช่น:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript ใช้ "การกำหนดชนิดตามบริบท" โดยอิงจากตำแหน่งของตัวแปรเพื่ออนุมานชนิด ในตัวอย่างต่อไปนี้ คอมไพเลอร์ทราบว่า `e` มีชนิดเป็น `MouseEvent` เนื่องจากชนิดเหตุการณ์ `click` ที่กำหนดไว้ในไฟล์ lib.d.ts ซึ่งมีการประกาศแบบ ambient สำหรับโครงสร้าง JavaScript ที่ใช้กันทั่วไปและ DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### การขยายชนิด

การขยายชนิดคือกระบวนการที่ TypeScript กำหนดชนิดให้กับตัวแปรที่กำหนดค่าเริ่มต้นโดยไม่มีคำอธิบายประกอบชนิด กระบวนการนี้อนุญาตให้เปลี่ยนจากชนิดที่แคบไปเป็นชนิดที่กว้างกว่า แต่ไม่อนุญาตในทางกลับกัน
ในตัวอย่างต่อไปนี้:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript กำหนด `string` ให้กับ `x` โดยอิงจากค่าเดียวที่ให้ไว้ระหว่างการกำหนดค่าเริ่มต้น (`x`) ซึ่งเป็นตัวอย่างของการขยายชนิด

TypeScript มีวิธีควบคุมกระบวนการขยายชนิด เช่น การใช้ "const"

### ค่าคงที่ (Const)

การใช้คีย์เวิร์ด `const` เมื่อประกาศตัวแปรทำให้ TypeScript อนุมานชนิดได้แคบลง

ตัวอย่างเช่น:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

เมื่อใช้ `const` เพื่อประกาศตัวแปร x ชนิดของตัวแปรจะถูกจำกัดให้แคบลงเหลือค่าลิเทอรัลเฉพาะ 'x' เนื่องจากชนิดของ x แคบลง จึงสามารถกำหนดให้กับตัวแปร y ได้โดยไม่มีข้อผิดพลาด
เหตุผลที่สามารถอนุมานชนิดได้คือ ตัวแปร `const` ไม่สามารถกำหนดค่าใหม่ได้ ดังนั้นชนิดของตัวแปรจึงสามารถจำกัดให้แคบลงเป็นชนิดลิเทอรัลที่เฉพาะเจาะจง ซึ่งในกรณีนี้คือชนิดลิเทอรัล 'x'

#### ตัวปรับแต่ง Const บนพารามิเตอร์ชนิด

ตั้งแต่ TypeScript เวอร์ชัน 5.0 เป็นต้นมา สามารถระบุแอตทริบิวต์ `const` บนพารามิเตอร์ชนิด generic ได้ ซึ่งช่วยให้อนุมานชนิดที่แม่นยำที่สุดเท่าที่เป็นไปได้ มาดูตัวอย่างที่ไม่ใช้ `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

ดังที่เห็น พร็อพเพอร์ตี `a` และ `b` ได้รับการอนุมานว่ามีชนิดเป็น `string`

ต่อไป มาดูความแตกต่างเมื่อใช้เวอร์ชันที่มี `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

ตอนนี้จะเห็นว่าพร็อพเพอร์ตี `a` และ `b` ได้รับการอนุมานเป็นลิเทอรัลสตริง แทนที่จะเป็นเพียงชนิด `string`

#### การยืนยันแบบ Const

คุณสมบัตินี้ช่วยให้คุณประกาศตัวแปรด้วยชนิดลิเทอรัลที่แม่นยำยิ่งขึ้น โดยอิงจากค่าเริ่มต้นของตัวแปร เป็นการแจ้งคอมไพเลอร์ว่าควรจัดการค่านั้นเป็นลิเทอรัลที่เปลี่ยนแปลงไม่ได้ ตัวอย่างบางส่วนมีดังนี้:

ใช้กับพร็อพเพอร์ตีเดียว:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

ใช้กับออบเจ็กต์ทั้งรายการ:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

วิธีนี้มีประโยชน์อย่างยิ่งเมื่อต้องกำหนดชนิดให้กับ tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### คำอธิบายประกอบชนิดอย่างชัดเจน

เราสามารถระบุให้เฉพาะเจาะจงและส่งชนิดเข้าไปได้ ในตัวอย่างต่อไปนี้ พร็อพเพอร์ตี `x` มีชนิดเป็น `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

เราสามารถทำให้คำอธิบายประกอบชนิดเฉพาะเจาะจงยิ่งขึ้นได้โดยใช้ยูเนียนของชนิดลิเทอรัล:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### การจำกัดชนิดให้แคบลง

การจำกัดชนิดให้แคบลงคือกระบวนการใน TypeScript ที่จำกัดชนิดทั่วไปให้เป็นชนิดที่เฉพาะเจาะจงยิ่งขึ้น กระบวนการนี้เกิดขึ้นเมื่อ TypeScript วิเคราะห์โค้ดและพิจารณาว่าเงื่อนไขหรือการดำเนินการบางอย่างสามารถปรับข้อมูลชนิดให้ละเอียดขึ้นได้

การจำกัดชนิดให้แคบลงสามารถเกิดขึ้นได้หลายวิธี ได้แก่:

#### เงื่อนไข

เมื่อใช้คำสั่งแบบมีเงื่อนไข เช่น `if` หรือ `switch` TypeScript สามารถจำกัดชนิดให้แคบลงตามผลลัพธ์ของเงื่อนไขได้ ตัวอย่างเช่น:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### การ throw หรือ return

การ throw ข้อผิดพลาดหรือ return ออกจากแขนงก่อนกำหนด สามารถช่วยให้ TypeScript จำกัดชนิดให้แคบลงได้ ตัวอย่างเช่น:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

วิธีอื่นในการจำกัดชนิดให้แคบลงใน TypeScript ได้แก่:

* ตัวดำเนินการ `instanceof`: ใช้ตรวจสอบว่าออบเจ็กต์เป็นอินสแตนซ์ของคลาสที่ระบุหรือไม่
* ตัวดำเนินการ `in`: ใช้ตรวจสอบว่ามีพร็อพเพอร์ตีอยู่ในออบเจ็กต์หรือไม่
* ตัวดำเนินการ `typeof`: ใช้ตรวจสอบชนิดของค่าขณะรันไทม์
* ฟังก์ชันในตัว เช่น `Array.isArray()`: ใช้ตรวจสอบว่าค่าเป็นอาร์เรย์หรือไม่

#### ยูเนียนแบบจำแนก (Discriminated Union)

การใช้ "Discriminated Union" เป็นรูปแบบหนึ่งใน TypeScript ที่เพิ่ม "แท็ก" อย่างชัดเจนให้กับออบเจ็กต์ เพื่อแยกความแตกต่างระหว่างชนิดต่าง ๆ ภายในยูเนียน รูปแบบนี้เรียกอีกอย่างว่า "tagged union" ในตัวอย่างต่อไปนี้ "แท็ก" แสดงด้วยพร็อพเพอร์ตี "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Type Guard ที่ผู้ใช้กำหนดเอง

ในกรณีที่ TypeScript ไม่สามารถระบุชนิดได้ คุณสามารถเขียนฟังก์ชันช่วยที่เรียกว่า "type guard ที่ผู้ใช้กำหนดเอง" ในตัวอย่างต่อไปนี้ เราจะใช้ Type Predicate เพื่อจำกัดชนิดให้แคบลงหลังจากใช้การกรองบางอย่าง:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### การจำกัดชนิดด้วย Switch-true

TypeScript 5.3 เพิ่มการจำกัดชนิดด้วย switch-true ซึ่งช่วยให้คุณแทนที่สายโซ่ if/else ที่ซับซ้อนด้วย switch (true) โดยใช้เงื่อนไขบูลีน วิธีนี้ช่วยให้อ่านง่ายขึ้นและยังคงจำกัดชนิดให้แคบลงได้ ลักษณะคล้ายกับ pattern matching แต่เรียบง่ายกว่า

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

