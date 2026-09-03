---
title: الصنف
sidebar:
  order: 55
  label: 55. الصنف
---


### الصياغة الشائعة للصنف

تُستخدم الكلمة المفتاحية `class` في TypeScript لتعريف صنف. يمكنك رؤية مثال أدناه:

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

تُستخدم الكلمة المفتاحية `class` لتعريف صنف باسم "Person".

يحتوي الصنف على خاصيتين خاصتين: name من النوع `string` وage من النوع `number`.

يُعرّف المُنشئ باستخدام الكلمة المفتاحية `constructor`. ويأخذ name وage بوصفهما معاملين ويُسندهما إلى الخاصيتين المقابلتين.

يحتوي الصنف على أسلوب `public` باسم sayHi يسجّل رسالة ترحيب.

لإنشاء مثيل لصنف في TypeScript، يمكنك استخدام الكلمة المفتاحية `new` متبوعة باسم الصنف، ثم القوسين `()`. على سبيل المثال:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### المُنشئ

المُنشئات هي أساليب خاصة داخل الصنف تُستخدم لتهيئة خصائص الكائن عند إنشاء مثيل للصنف.

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

يمكن إجراء تحميل زائد لمُنشئ باستخدام الصياغة التالية:

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

في TypeScript، يمكن تعريف عدة تحميلات زائدة للمُنشئ، لكن لا يمكن أن يكون لديك سوى تنفيذ واحد يجب أن يكون متوافقًا مع جميع التحميلات الزائدة؛ ويمكن تحقيق ذلك باستخدام معامل اختياري.

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

### المُنشئات الخاصة والمحمية

في TypeScript، يمكن وسم المُنشئات بأنها خاصة أو محمية، مما يقيّد إمكانية الوصول إليها واستخدامها.

المُنشئات الخاصة:
لا يمكن استدعاؤها إلا من داخل الصنف نفسه. وغالبًا ما تُستخدم المُنشئات الخاصة في الحالات التي تريد فيها فرض نمط النسخة المفردة أو حصر إنشاء المثيلات في أسلوب مصنع داخل الصنف.

المُنشئات المحمية:
تكون المُنشئات المحمية مفيدة عندما تريد إنشاء صنف أساسي ينبغي عدم إنشاء مثيل منه مباشرةً، لكن يمكن توسيعه بواسطة الأصناف الفرعية.

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

### محددات الوصول

تُستخدم محددات الوصول `private` و`protected` و`public` للتحكم في ظهور أعضاء الصنف وإمكانية الوصول إليها، مثل الخصائص والأساليب، في أصناف TypeScript. وتُعد هذه المحددات أساسية لفرض التغليف ووضع حدود للوصول إلى الحالة الداخلية للصنف وتعديلها.

يقيّد المحدد `private` الوصول إلى عضو الصنف بحيث لا يكون متاحًا إلا داخل الصنف الذي يحتويه.

يسمح المحدد `protected` بالوصول إلى عضو الصنف داخل الصنف الذي يحتويه وأصنافه المشتقة.

يوفر المحدد `public` وصولًا غير مقيّد إلى عضو الصنف، مما يسمح بالوصول إليه من أي مكان.

### الجلب والضبط

دوال الجلب والضبط هي أساليب خاصة تتيح لك تعريف سلوك مخصص للوصول إلى خصائص الصنف وتعديلها. وهي تمكّنك من تغليف الحالة الداخلية للكائن وتوفير منطق إضافي عند جلب قيم الخصائص أو ضبطها.
في TypeScript، تُعرّف دوال الجلب والضبط باستخدام الكلمتين المفتاحيتين `get` و`set` على التوالي. إليك مثالًا:

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

### الموصلات التلقائية في الأصناف

يضيف TypeScript الإصدار 4.9 دعمًا للموصلات التلقائية، وهي ميزة مرتقبة في ECMAScript. وهي تشبه خصائص الصنف، لكن يُصرّح عنها باستخدام الكلمة المفتاحية "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

تُحوَّل الموصلات التلقائية إلى موصّلي `get` و`set` خاصين يعملان على خاصية لا يمكن الوصول إليها.

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

في TypeScript، تشير الكلمة المفتاحية `this` إلى النسخة المثيلة الحالية من الصنف داخل أساليبه أو مُنشئاته. وهي تتيح لك الوصول إلى خصائص الصنف وأساليبه وتعديلها من داخل نطاقه الخاص.
وتوفر طريقة للوصول إلى الحالة الداخلية للكائن ومعالجتها داخل أساليبه الخاصة.

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

### خصائص المعاملات

تتيح لك خصائص المعاملات التصريح عن خصائص الصنف وتهيئتها مباشرةً ضمن معاملات المُنشئ، مما يجنبك الشيفرة النمطية المتكررة. على سبيل المثال:

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

### الأصناف المجرّدة

تُستخدم الأصناف المجرّدة في TypeScript أساسًا للوراثة. وهي توفر طريقة لتعريف خصائص وأساليب مشتركة يمكن أن ترثها الأصناف الفرعية.
يفيد ذلك عندما تريد تعريف سلوك مشترك وفرض تنفيذ أساليب معينة على الأصناف الفرعية. وهي توفر طريقة لإنشاء تسلسل هرمي من الأصناف، يوفّر فيه الصنف الأساسي المجرّد واجهة مشتركة ووظائف مشتركة للأصناف الفرعية.

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

### باستخدام الأنواع العامة

تتيح لك الأصناف ذات الأنواع العامة تعريف أصناف قابلة لإعادة الاستخدام يمكنها العمل مع أنواع مختلفة.

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

### المزخرفات

توفر المزخرفات آلية لإضافة بيانات وصفية أو تعديل السلوك أو التحقق أو توسيع وظائف العنصر المستهدف. وهي دوال تُنفّذ في وقت التشغيل. ويمكن تطبيق عدة مزخرفات على تصريح واحد.

المزخرفات ميزات تجريبية، والأمثلة التالية متوافقة فقط مع TypeScript الإصدار 5 أو أحدث عند استخدام ES6.

بالنسبة إلى إصدارات TypeScript السابقة للإصدار 5، يجب تمكينها باستخدام الخاصية `experimentalDecorators` في ملف `tsconfig.json` أو باستخدام `--experimentalDecorators` في سطر الأوامر (لكن المثال التالي لن يعمل).

تشمل بعض حالات الاستخدام الشائعة للمزخرفات ما يلي:

* مراقبة تغييرات الخصائص.
* مراقبة استدعاءات الأساليب.
* إضافة خصائص أو أساليب إضافية.
* التحقق في وقت التشغيل.
* التسلسل وإلغاء التسلسل تلقائيًا.
* التسجيل.
* التخويل والمصادقة.
* الحماية من الأخطاء.

ملاحظة: لا تسمح مزخرفات الإصدار 5 بزخرفة المعاملات.

أنواع المزخرفات:

#### مزخرفات الأصناف

تفيد مزخرفات الأصناف في توسيع صنف موجود، مثل إضافة خصائص أو أساليب، أو جمع مثيلات صنف. في المثال التالي، نضيف أسلوب `toString` يحوّل الصنف إلى تمثيل نصي.

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

#### مزخرف الخاصية

تفيد مزخرفات الخصائص في تعديل سلوك خاصية، مثل تغيير قيم التهيئة. في الشيفرة التالية، لدينا برنامج نصي يضبط خاصية بحيث تكون دائمًا بأحرف كبيرة:

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

#### مزخرف الأسلوب

تتيح لك مزخرفات الأساليب تغيير سلوك الأساليب أو تحسينه. فيما يلي مثال على مُسجِّل بسيط:

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

يُسجّل ما يلي:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### مزخرفات دوال الجلب والضبط

تتيح لك مزخرفات دوال الجلب والضبط تغيير سلوك موصلات الصنف أو تحسينه. وهي مفيدة، على سبيل المثال، للتحقق من إسناد الخصائص. إليك مثالًا بسيطًا على مزخرف لدالة جلب:

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

#### البيانات الوصفية للمزخرفات

تُبسّط البيانات الوصفية للمزخرفات عملية تطبيق البيانات الوصفية واستخدامها بواسطة المزخرفات في أي صنف. ويمكن للمزخرفات الوصول إلى خاصية جديدة للبيانات الوصفية في كائن السياق؛ ويمكن أن تُستخدم مفتاحًا لكل من القيم الأولية والكائنات.
يمكن الوصول إلى معلومات البيانات الوصفية في الصنف عبر `Symbol.metadata`.

يمكن استخدام البيانات الوصفية لأغراض مختلفة، مثل تصحيح الأخطاء أو التسلسل أو حقن التبعيات باستخدام المزخرفات.

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

### الوراثة

تشير الوراثة إلى الآلية التي يمكن لصنف من خلالها أن يرث خصائص وأساليب من صنف آخر يُعرف بالصنف الأساسي أو الصنف الفائق. ويمكن للصنف المشتق، الذي يُسمى أيضًا الصنف الابن أو الصنف الفرعي، توسيع وظائف الصنف الأساسي وتخصيصها بإضافة خصائص وأساليب جديدة أو تجاوز الخصائص والأساليب الموجودة.

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

لا يدعم TypeScript الوراثة المتعددة بالمعنى التقليدي، بل يسمح بالوراثة من صنف أساسي واحد.
يدعم TypeScript واجهات متعددة. يمكن للواجهة تعريف عقد لبنية كائن، ويمكن للصنف تنفيذ عدة واجهات. وهذا يسمح للصنف بوراثة السلوك والبنية من مصادر متعددة.

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

غالبًا ما يُشار إلى الكلمة المفتاحية `class` في TypeScript، كما في JavaScript، بوصفها سكرًا نحويًا. وقد قُدّمت في ECMAScript 2015 (ES6) لتوفير صياغة مألوفة أكثر لإنشاء الكائنات والتعامل معها بأسلوب قائم على الأصناف. ومع ذلك، من المهم ملاحظة أن TypeScript، بصفته مجموعة فائقة من JavaScript، يُصرَّف في النهاية إلى JavaScript الذي يظل قائمًا في جوهره على النماذج الأولية.

### الأعضاء الساكنة

يحتوي TypeScript على أعضاء ساكنة. للوصول إلى الأعضاء الساكنة في صنف، يمكنك استخدام اسم الصنف متبوعًا بنقطة، من دون الحاجة إلى إنشاء كائن.

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

### تهيئة الخصائص

توجد عدة طرائق لتهيئة خصائص صنف في TypeScript:

مباشرةً:

في المثال التالي، ستُستخدم هذه القيم الأولية عند إنشاء مثيل للصنف.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

في المُنشئ:

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

باستخدام معاملات المُنشئ:

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

### التحميل الزائد للأساليب

يتيح التحميل الزائد للأساليب للصنف أن يحتوي على عدة أساليب بالاسم نفسه، لكن بأنواع معاملات مختلفة أو بعدد مختلف من المعاملات. وهذا يتيح لنا استدعاء أسلوب بطرائق مختلفة بناءً على الوسائط المُمرَّرة.

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

