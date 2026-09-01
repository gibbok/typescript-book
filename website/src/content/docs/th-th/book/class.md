---
title: คลาส
sidebar:
  order: 55
  label: 55. คลาส
---


### ไวยากรณ์ทั่วไปของคลาส

ใน TypeScript คีย์เวิร์ด `class` ใช้สำหรับกำหนดคลาส ตัวอย่างมีดังนี้:

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
```

คีย์เวิร์ด `class` ใช้สำหรับกำหนดคลาสชื่อ "Person"

คลาสนี้มีพร็อพเพอร์ตีแบบ private สองรายการ ได้แก่ name ซึ่งมีชนิดเป็น `string` และ age ซึ่งมีชนิดเป็น `number`

คอนสตรักเตอร์กำหนดโดยใช้คีย์เวิร์ด `constructor` โดยรับ name และ age เป็นพารามิเตอร์ แล้วกำหนดค่าให้กับพร็อพเพอร์ตีที่สอดคล้องกัน

คลาสนี้มีเมธอด `public` ชื่อ sayHi ซึ่งแสดงข้อความทักทายในล็อก

หากต้องการสร้างอินสแตนซ์ของคลาสใน TypeScript คุณสามารถใช้คีย์เวิร์ด `new` ตามด้วยชื่อคลาสและวงเล็บ `()` ตัวอย่างเช่น:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### คอนสตรักเตอร์

คอนสตรักเตอร์เป็นเมธอดพิเศษภายในคลาสที่ใช้กำหนดค่าเริ่มต้นให้กับพร็อพเพอร์ตีของออบเจ็กต์เมื่อมีการสร้างอินสแตนซ์ของคลาส

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.age} years old.`
        );
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

คุณสามารถโอเวอร์โหลดคอนสตรักเตอร์ได้โดยใช้ไวยากรณ์ต่อไปนี้:

```typescript
type Sex = 'm' | 'f';

class Person {
    name: string;
    age: number;
    sex: Sex;

    constructor(name: string, age: number, sex?: Sex);
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ?? 'm';
    }
}

const p1 = new Person('Simon', 17);
const p2 = new Person('Alice', 22, 'f');
```

ใน TypeScript คุณสามารถกำหนดโอเวอร์โหลดของคอนสตรักเตอร์ได้หลายรูปแบบ แต่มีอิมพลีเมนเทชันได้เพียงหนึ่งรายการ ซึ่งต้องเข้ากันได้กับโอเวอร์โหลดทั้งหมด โดยสามารถทำได้ด้วยการใช้พารามิเตอร์แบบเลือกได้

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Unknown';
        this.age = age ?? 0;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Name: Unknown, Age: 0

const person2 = new Person('John');
person2.displayInfo(); // Name: John, Age: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Name: Jane, Age: 25
```

### คอนสตรักเตอร์แบบ Private และ Protected

ใน TypeScript คอนสตรักเตอร์สามารถกำหนดเป็น private หรือ protected เพื่อจำกัดการเข้าถึงและการใช้งาน

คอนสตรักเตอร์แบบ Private:
สามารถเรียกใช้ได้ภายในคลาสเท่านั้น คอนสตรักเตอร์แบบ private มักใช้ในกรณีที่ต้องการบังคับใช้รูปแบบ singleton หรือจำกัดการสร้างอินสแตนซ์ไว้ที่ factory method ภายในคลาส

คอนสตรักเตอร์แบบ Protected:
คอนสตรักเตอร์แบบ protected มีประโยชน์เมื่อคุณต้องการสร้างคลาสฐานที่ไม่ควรถูกสร้างอินสแตนซ์โดยตรง แต่สามารถสืบทอดโดยคลาสย่อยได้

```typescript
class BaseClass {
    protected constructor() {}
}

class DerivedClass extends BaseClass {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

// Attempting to instantiate the base class directly will result in an error
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Create an instance of the derived class
const derivedObj = new DerivedClass(10);
```

### ตัวระบุการเข้าถึง

ตัวระบุการเข้าถึง `private`, `protected` และ `public` ใช้ควบคุมการมองเห็นและการเข้าถึงสมาชิกของคลาส เช่น พร็อพเพอร์ตีและเมธอด ในคลาส TypeScript ตัวระบุเหล่านี้จำเป็นต่อการบังคับใช้การห่อหุ้มข้อมูลและการกำหนดขอบเขตในการเข้าถึงและแก้ไขสถานะภายในของคลาส

ตัวระบุ `private` จำกัดการเข้าถึงสมาชิกของคลาสไว้เฉพาะภายในคลาสที่ประกาศสมาชิกนั้น

ตัวระบุ `protected` อนุญาตให้เข้าถึงสมาชิกของคลาสได้ภายในคลาสที่ประกาศสมาชิกนั้นและคลาสที่สืบทอดมา

ตัวระบุ `public` อนุญาตให้เข้าถึงสมาชิกของคลาสได้โดยไม่จำกัด จึงสามารถเข้าถึงได้จากทุกที่

### Get และ Set

Getter และ setter เป็นเมธอดพิเศษที่ช่วยให้คุณกำหนดพฤติกรรมเฉพาะสำหรับการเข้าถึงและแก้ไขพร็อพเพอร์ตีของคลาสได้ โดยช่วยให้คุณห่อหุ้มสถานะภายในของออบเจ็กต์และเพิ่มตรรกะเมื่ออ่านหรือกำหนดค่าพร็อพเพอร์ตี
ใน TypeScript getter และ setter กำหนดโดยใช้คีย์เวิร์ด `get` และ `set` ตามลำดับ ตัวอย่างมีดังนี้:

```typescript
class MyClass {
    private _myProperty: string;

    constructor(value: string) {
        this._myProperty = value;
    }
    get myProperty(): string {
        return this._myProperty;
    }
    set myProperty(value: string) {
        this._myProperty = value;
    }
}
```

### Auto-Accessor ในคลาส

TypeScript เวอร์ชัน 4.9 เพิ่มการรองรับ auto-accessor ซึ่งเป็นฟีเจอร์ ECMAScript ที่กำลังจะมีขึ้น ฟีเจอร์นี้คล้ายกับพร็อพเพอร์ตีของคลาส แต่ประกาศด้วยคีย์เวิร์ด "accessor"

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessor จะถูก "แปลงรูป" เป็น accessor `get` และ `set` แบบ private ซึ่งทำงานกับพร็อพเพอร์ตีที่ไม่สามารถเข้าถึงได้

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

ใน TypeScript คีย์เวิร์ด `this` อ้างถึงอินสแตนซ์ปัจจุบันของคลาสภายในเมธอดหรือคอนสตรักเตอร์ของคลาส ซึ่งช่วยให้คุณเข้าถึงและแก้ไขพร็อพเพอร์ตีและเมธอดของคลาสได้จากภายในขอบเขตของคลาสเอง
คีย์เวิร์ดนี้เป็นวิธีสำหรับเข้าถึงและจัดการสถานะภายในของออบเจ็กต์จากภายในเมธอดของออบเจ็กต์เอง

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Hello, my name is Alice.
```

### พร็อพเพอร์ตีจากพารามิเตอร์

พร็อพเพอร์ตีจากพารามิเตอร์ช่วยให้คุณประกาศและกำหนดค่าเริ่มต้นให้พร็อพเพอร์ตีของคลาสได้โดยตรงภายในพารามิเตอร์ของคอนสตรักเตอร์ จึงหลีกเลี่ยงโค้ดซ้ำซากได้ ตัวอย่างเช่น:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // The "private" and "public" keywords in the constructor
        // automatically declare and initialize the corresponding class properties.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### คลาส Abstract

คลาส abstract ใน TypeScript ใช้สำหรับการสืบทอดเป็นหลัก โดยช่วยให้กำหนดพร็อพเพอร์ตีและเมธอดร่วมที่คลาสย่อยสามารถสืบทอดได้
สิ่งนี้มีประโยชน์เมื่อคุณต้องการกำหนดพฤติกรรมร่วมและบังคับให้คลาสย่อยอิมพลีเมนต์เมธอดบางรายการ คลาส abstract ช่วยให้สร้างลำดับชั้นของคลาส โดยคลาสฐานแบบ abstract จะกำหนดอินเทอร์เฟซร่วมและความสามารถพื้นฐานสำหรับคลาสย่อย

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### การใช้ร่วมกับ Generic

คลาสที่ใช้ generic ช่วยให้คุณกำหนดคลาสที่นำกลับมาใช้ซ้ำและทำงานกับชนิดข้อมูลที่แตกต่างกันได้

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### Decorator

Decorator เป็นกลไกสำหรับเพิ่ม metadata ปรับเปลี่ยนพฤติกรรม ตรวจสอบความถูกต้อง หรือขยายความสามารถขององค์ประกอบเป้าหมาย โดยเป็นฟังก์ชันที่ทำงานขณะรันไทม์ และสามารถใช้ decorator หลายรายการกับการประกาศเดียวได้

Decorator เป็นฟีเจอร์ทดลอง และตัวอย่างต่อไปนี้ใช้ได้กับ TypeScript เวอร์ชัน 5 ขึ้นไปที่ใช้ ES6 เท่านั้น

สำหรับ TypeScript เวอร์ชันก่อน 5 ต้องเปิดใช้งานด้วยพร็อพเพอร์ตี `experimentalDecorators` ใน `tsconfig.json` หรือใช้ `--experimentalDecorators` ในบรรทัดคำสั่ง (แต่ตัวอย่างต่อไปนี้จะใช้งานไม่ได้)

กรณีใช้งาน decorator ที่พบบ่อย ได้แก่:

* เฝ้าติดตามการเปลี่ยนแปลงของพร็อพเพอร์ตี
* เฝ้าติดตามการเรียกเมธอด
* เพิ่มพร็อพเพอร์ตีหรือเมธอดเพิ่มเติม
* ตรวจสอบความถูกต้องขณะรันไทม์
* ทำ serialization และ deserialization โดยอัตโนมัติ
* บันทึกล็อก
* กำหนดสิทธิ์และยืนยันตัวตน
* ป้องกันข้อผิดพลาด

หมายเหตุ: Decorator สำหรับเวอร์ชัน 5 ไม่อนุญาตให้ตกแต่งพารามิเตอร์

ประเภทของ decorator:

#### Class Decorator

Class decorator มีประโยชน์สำหรับขยายคลาสที่มีอยู่ เช่น เพิ่มพร็อพเพอร์ตีหรือเมธอด หรือรวบรวมอินสแตนซ์ของคลาส ในตัวอย่างต่อไปนี้ เราเพิ่มเมธอด `toString` ซึ่งแปลงคลาสเป็นการแสดงผลในรูปสตริง

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Property Decorator

Property decorator มีประโยชน์สำหรับปรับเปลี่ยนพฤติกรรมของพร็อพเพอร์ตี เช่น เปลี่ยนค่าเริ่มต้น ในโค้ดต่อไปนี้ เรามีสคริปต์ที่กำหนดให้พร็อพเพอร์ตีเป็นตัวพิมพ์ใหญ่เสมอ:

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### Method Decorator

Method decorator ช่วยให้คุณเปลี่ยนหรือเสริมพฤติกรรมของเมธอดได้ ด้านล่างคือตัวอย่าง logger อย่างง่าย:

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

โค้ดนี้แสดงล็อกดังนี้:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter และ Setter Decorator

Getter และ setter decorator ช่วยให้คุณเปลี่ยนหรือเสริมพฤติกรรมของ accessor ในคลาสได้ ตัวอย่างเช่น ใช้ตรวจสอบความถูกต้องของการกำหนดค่าพร็อพเพอร์ตี ต่อไปนี้คือตัวอย่างอย่างง่ายของ getter decorator:

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Metadata ของ Decorator

Metadata ของ decorator ช่วยให้ decorator นำ metadata ไปใช้กับคลาสใด ๆ และใช้งาน metadata ได้ง่ายขึ้น โดยสามารถเข้าถึงพร็อพเพอร์ตี metadata ใหม่บนออบเจ็กต์ context ซึ่งใช้เป็นคีย์ได้ทั้งสำหรับค่าพื้นฐานและออบเจ็กต์
สามารถเข้าถึงข้อมูล metadata บนคลาสได้ผ่าน `Symbol.metadata`

Metadata สามารถใช้เพื่อวัตถุประสงค์ต่าง ๆ เช่น การดีบัก การทำ serialization หรือการทำ dependency injection ด้วย decorator

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polyfill

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contains property metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a primitive value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Get metadata information

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### การสืบทอด

การสืบทอดคือกลไกที่ทำให้คลาสหนึ่งสามารถสืบทอดพร็อพเพอร์ตีและเมธอดจากอีกคลาสหนึ่ง ซึ่งเรียกว่าคลาสฐานหรือ superclass ส่วนคลาสที่สืบทอดมา ซึ่งเรียกว่าคลาสลูกหรือ subclass สามารถขยายและปรับความสามารถของคลาสฐานให้เฉพาะเจาะจงขึ้นได้ด้วยการเพิ่มพร็อพเพอร์ตีและเมธอดใหม่ หรือ override รายการที่มีอยู่

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log('The animal makes a sound');
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }

    speak(): void {
        console.log('Woof! Woof!');
    }
}

// Create an instance of the base class
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Create an instance of the derived class
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript ไม่รองรับการสืบทอดหลายคลาสในความหมายแบบดั้งเดิม แต่อนุญาตให้สืบทอดจากคลาสฐานเพียงคลาสเดียว
TypeScript รองรับหลายอินเทอร์เฟซ อินเทอร์เฟซสามารถกำหนดสัญญาสำหรับโครงสร้างของออบเจ็กต์ และคลาสสามารถอิมพลีเมนต์ได้หลายอินเทอร์เฟซ ซึ่งทำให้คลาสสืบทอดพฤติกรรมและโครงสร้างจากหลายแหล่งได้

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class FlyingFish implements Flyable, Swimmable {
    fly() {
        console.log('Flying...');
    }

    swim() {
        console.log('Swimming...');
    }
}

const flyingFish = new FlyingFish();
flyingFish.fly();
flyingFish.swim();
```

คีย์เวิร์ด `class` ใน TypeScript ซึ่งคล้ายกับ JavaScript มักเรียกว่า syntactic sugar โดยถูกนำมาใช้ใน ECMAScript 2015 (ES6) เพื่อมอบไวยากรณ์ที่คุ้นเคยยิ่งขึ้นสำหรับการสร้างและทำงานกับออบเจ็กต์ในลักษณะที่อิงคลาส อย่างไรก็ตาม สิ่งสำคัญคือต้องทราบว่า TypeScript ซึ่งเป็น superset ของ JavaScript จะถูกคอมไพล์เป็น JavaScript ในท้ายที่สุด และ JavaScript ยังคงมี prototype เป็นพื้นฐานหลัก

### สมาชิก Static

TypeScript มีสมาชิก static หากต้องการเข้าถึงสมาชิก static ของคลาส คุณสามารถใช้ชื่อคลาสตามด้วยจุดได้โดยไม่ต้องสร้างออบเจ็กต์

```typescript
class OfficeWorker {
    static memberCount: number = 0;

    constructor(private name: string) {
        OfficeWorker.memberCount++;
    }
}

const w1 = new OfficeWorker('James');
const w2 = new OfficeWorker('Simon');
const total = OfficeWorker.memberCount;
console.log(total); // 2
```

### การกำหนดค่าเริ่มต้นให้พร็อพเพอร์ตี

ใน TypeScript มีหลายวิธีในการกำหนดค่าเริ่มต้นให้พร็อพเพอร์ตีของคลาส:

แบบอินไลน์:

ในตัวอย่างต่อไปนี้ ค่าเริ่มต้นเหล่านี้จะถูกใช้เมื่อสร้างอินสแตนซ์ของคลาส

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

ภายในคอนสตรักเตอร์:

```typescript
class MyClass {
    property1: string;
    property2: number;

    constructor() {
        this.property1 = 'default value';
        this.property2 = 42;
    }
}
```

การใช้พารามิเตอร์ของคอนสตรักเตอร์:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // There is no need to assign the values to the properties explicitly.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### การโอเวอร์โหลดเมธอด

การโอเวอร์โหลดเมธอดช่วยให้คลาสมีเมธอดชื่อเดียวกันได้หลายรูปแบบ แต่ใช้ชนิดพารามิเตอร์หรือจำนวนพารามิเตอร์ที่แตกต่างกัน ทำให้เราสามารถเรียกเมธอดได้หลายวิธีตามอาร์กิวเมนต์ที่ส่งเข้าไป

```typescript
class MyClass {
    add(a: number, b: number): number; // Overload signature 1
    add(a: string, b: string): string; // Overload signature 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Invalid arguments');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Logs 15
```

