---
title: การจัดการชนิดข้อมูล
sidebar:
  order: 61
  label: 61. การจัดการชนิดข้อมูล
---


### การสร้างชนิดจากชนิดอื่น

คุณสามารถสร้างชนิดใหม่ได้ด้วยการประกอบ จัดการ หรือแปลงชนิดที่มีอยู่

ชนิด Intersection (`&`):

ช่วยให้คุณรวมหลายชนิดเป็นชนิดเดียวได้:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

ชนิด Union (`|`):

ช่วยให้คุณกำหนดชนิดที่สามารถเป็นหนึ่งในหลายชนิดได้:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

ชนิด Mapped:

ช่วยให้คุณแปลงพร็อพเพอร์ตีของชนิดที่มีอยู่เพื่อสร้างชนิดใหม่ได้:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Properties become read-only
```

ชนิด Conditional:

ช่วยให้คุณสร้างชนิดตามเงื่อนไขบางอย่างได้:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### ชนิด Indexed Access

ใน TypeScript คุณสามารถเข้าถึงและจัดการชนิดของพร็อพเพอร์ตีภายในอีกชนิดหนึ่งได้โดยใช้ดัชนี `Type[Key]`

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### Utility Type

Utility type ในตัวหลายรายการสามารถใช้จัดการชนิดข้อมูลได้ ด้านล่างคือรายการที่ใช้บ่อยที่สุด:

#### Awaited\<T\>

สร้างชนิดที่แกะชนิด Promise ซ้ำแบบ recursive

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

สร้างชนิดที่กำหนดให้พร็อพเพอร์ตีทั้งหมดของ T เป็นแบบเลือกได้

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

สร้างชนิดที่กำหนดให้พร็อพเพอร์ตีทั้งหมดของ T เป็นแบบบังคับ

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

สร้างชนิดที่กำหนดให้พร็อพเพอร์ตีทั้งหมดของ T เป็น readonly

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Invalid
```

#### Record\<K, T\>

สร้างชนิดที่มีชุดพร็อพเพอร์ตี K ซึ่งมีชนิดเป็น T

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

สร้างชนิดด้วยการเลือกพร็อพเพอร์ตี K ที่ระบุจาก T

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

สร้างชนิดด้วยการละเว้นพร็อพเพอร์ตี K ที่ระบุจาก T

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

สร้างชนิดด้วยการตัดค่าทั้งหมดของชนิด U ออกจาก T

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

สร้างชนิดด้วยการดึงค่าทั้งหมดของชนิด U จาก T

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

สร้างชนิดด้วยการตัด null และ undefined ออกจาก T

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

ดึงชนิดพารามิเตอร์ของฟังก์ชันชนิด T

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

ดึงชนิดพารามิเตอร์ของฟังก์ชันคอนสตรักเตอร์ชนิด T

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

ดึงชนิดค่าที่ส่งคืนของฟังก์ชันชนิด T

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

ดึงชนิดอินสแตนซ์ของคลาสชนิด T

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

ดึงชนิดของพารามิเตอร์ 'this' จากฟังก์ชันชนิด T

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

ลบพารามิเตอร์ 'this' ออกจากฟังก์ชันชนิด T

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

ทำหน้าที่เป็นตัวระบุสำหรับชนิด `this` ตามบริบท

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Valid as "log" is a part of "this".
        this.update(); // Invalid
    },
};
```

#### Uppercase\<T\>

เปลี่ยนชื่อของชนิดอินพุต T ให้เป็นตัวพิมพ์ใหญ่

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

เปลี่ยนชื่อของชนิดอินพุต T ให้เป็นตัวพิมพ์เล็ก

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

เปลี่ยนอักษรตัวแรกของชื่อชนิดอินพุต T ให้เป็นตัวพิมพ์ใหญ่

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

เปลี่ยนอักษรตัวแรกของชื่อชนิดอินพุต T ให้เป็นตัวพิมพ์เล็ก

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer เป็น utility type ที่ออกแบบมาเพื่อป้องกันการอนุมานชนิดโดยอัตโนมัติภายในขอบเขตของฟังก์ชัน generic

ตัวอย่าง:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

เมื่อใช้ NoInfer:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

