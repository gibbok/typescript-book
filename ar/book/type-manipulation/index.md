# معالجة الأنواع



### إنشاء أنواع من أنواع أخرى

يمكن إنشاء أنواع جديدة من خلال تركيب الأنواع الموجودة أو معالجتها أو تحويلها.

أنواع التقاطع (`&`):

تتيح لك دمج أنواع متعددة في نوع واحد:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

أنواع الاتحاد (`|`):

تتيح لك تعريف نوع يمكن أن يكون واحدًا من عدة أنواع:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

الأنواع المعيّنة:

تتيح لك تحويل خصائص نوع موجود لإنشاء نوع جديد:

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

الأنواع الشرطية:

تتيح لك إنشاء أنواع استنادًا إلى بعض الشروط:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### أنواع الوصول المفهرس

في TypeScript، يمكن الوصول إلى أنواع الخصائص الموجودة داخل نوع آخر ومعالجتها باستخدام فهرس، `Type[Key]`.

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

### أنواع الأدوات المساعدة

يمكن استخدام عدة أنواع أدوات مساعدة مضمّنة لمعالجة الأنواع، وفيما يلي قائمة بأكثرها استخدامًا:

#### Awaited\<T\>

ينشئ نوعًا يفك تغليف أنواع Promise بصورة متكررة.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

ينشئ نوعًا تُعيَّن فيه جميع خصائص T على أنها اختيارية.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

ينشئ نوعًا تُعيَّن فيه جميع خصائص T على أنها مطلوبة.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

ينشئ نوعًا تُعيَّن فيه جميع خصائص T على أنها للقراءة فقط.

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

ينشئ نوعًا يحتوي على مجموعة من الخصائص K من النوع T.

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

ينشئ نوعًا بانتقاء الخصائص المحددة K من T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

ينشئ نوعًا بحذف الخصائص المحددة K من T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

ينشئ نوعًا باستبعاد جميع قيم النوع U من T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

ينشئ نوعًا باستخراج جميع قيم النوع U من T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

ينشئ نوعًا باستبعاد null وundefined من T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

يستخرج أنواع معاملات نوع الدالة T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

يستخرج أنواع معاملات نوع دالة المُنشئ T.

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

يستخرج نوع الإرجاع لنوع الدالة T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

يستخرج نوع المثيل لنوع الصنف T.

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

يستخرج نوع معامل 'this' من نوع الدالة T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

يزيل معامل 'this' من نوع الدالة T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

يعمل كعلامة لنوع `this` سياقي.

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

يحوّل اسم نوع الإدخال T إلى أحرف كبيرة.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

يحوّل اسم نوع الإدخال T إلى أحرف صغيرة.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

يحوّل الحرف الأول من اسم نوع الإدخال T إلى حرف كبير.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

يحوّل الحرف الأول من اسم نوع الإدخال T إلى حرف صغير.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer هو نوع أداة مساعدة مصمم لمنع الاستدلال التلقائي للأنواع ضمن نطاق دالة عامة.

مثال:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

باستخدام NoInfer:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```

