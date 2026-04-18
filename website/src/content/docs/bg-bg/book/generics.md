---
title: Class
sidebar:
  order: 55
  label: 55. Class
---


### Общ синтаксис на Class

Ключовата дума `class` се използва в TypeScript за дефиниране на клас. По-долу е показан пример:

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

Ключовата дума `class` се използва за дефиниране на клас с име "Person".

Класът има две private свойства: name от тип `string` и age от тип `number`.

Конструкторът се дефинира чрез ключовата дума `constructor`. Той приема name и age като параметри и ги присвоява на съответните свойства.

Класът има `public` метод с име sayHi, който извежда поздравително съобщение.

За да създадете инстанция на клас в TypeScript, можете да използвате ключовата дума `new`, последвана от името на класа и скоби `()`. Например:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Конструкторите са специални методи в рамките на class, които се използват за инициализиране на свойствата на обекта при създаване на инстанция на класа.

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

Възможно е да се използва overload на constructor със следния синтаксис:

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

В TypeScript е възможно да се дефинират множество constructor overload-и, но може да има само една имплементация, която трябва да бъде съвместима с всички overload-и. Това може да се постигне чрез използване на опционални параметри.

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

### Private и Protected конструктори

В TypeScript конструкторите могат да бъдат маркирани като private или protected, което ограничава тяхната достъпност и използване.

Private конструктори:
Могат да бъдат извиквани само в рамките на самия class. Private конструкторите често се използват, когато искате да наложите singleton pattern или да ограничите създаването на инстанции чрез factory метод в рамките на класа.

Protected конструктори:
Protected конструкторите са полезни, когато искате да създадете базов клас, който не трябва да бъде инстанциран директно, но може да бъде разширяван от наследяващи класове.

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

// Опит за директно създаване на инстанция на базовия клас ще доведе до грешка
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Създаване на инстанция на наследения клас
const derivedObj = new DerivedClass(10);
```

### Модификатори за достъп

Модификаторите за достъп `private`, `protected` и `public` се използват за контролиране на видимостта и достъпността на членовете на клас (като свойства и методи) в TypeScript. Тези модификатори са от съществено значение за прилагане на енкапсулация и за определяне на граници при достъп и промяна на вътрешното състояние на един клас.

Модификаторът `private` ограничава достъпа до члена на класа само в рамките на самия клас.

Модификаторът `protected` позволява достъп до члена на класа в рамките на самия клас и неговите наследници.

Модификаторът `public` предоставя неограничен достъп до члена на класа, като позволява той да бъде достъпен отвсякъде.

### Get и Set

Getter-и и setter-и са специални методи, които позволяват да дефинирате персонализирано поведение при достъп и промяна на свойства на клас. Те позволяват да капсулирате вътрешното състояние на обект и да добавите допълнителна логика при вземане (get) или задаване (set) на стойности.
В TypeScript getter-ите и setter-ите се дефинират съответно чрез ключовите думи `get` и `set`. Ето пример:

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

### Auto-accessors в класове

TypeScript версия 4.9 добавя поддръжка за auto-accessors — предстояща функционалност в ECMAScript. Те наподобяват свойства на клас, но се декларират с ключовата дума `accessor`.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessors се "десъгарират" (de-sugared) до private `get` и `set` аксесори, които работят върху недостъпно свойство.

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = name;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

В TypeScript, ключовата дума `this` се отнася до текущата инстанция на класа в рамките на неговите методи или конструктори. Тя позволява достъп и промяна на свойствата и методите на класа от неговия собствен обхват.
Тя предоставя начин за достъп и манипулиране на вътрешното състояние на обект в рамките на неговите методи.

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

### Parameter Properties

Parameter properties позволяват да декларирате и инициализирате свойства на клас директно в параметрите на конструктора, като избягвате излишен boilerplate код. Пример:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // Ключовите думи "private" и "public" в конструктора
        // автоматично декларират и инициализират съответните свойства на класа.
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

### Абстрактни класове

Абстрактните класове се използват в TypeScript основно за наследяване. Те предоставят начин за дефиниране на общи свойства и методи, които могат да бъдат наследявани от под-класове.
Това е полезно, когато искате да дефинирате общо поведение и да наложите под-класовете да имплементират определени методи. Те предоставят начин за създаване на йерархия от класове, където абстрактният базов клас осигурява общ интерфейс и функционалност за под-класовете.

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

### С generics

Класовете с generics позволяват да дефинирате преизползваеми класове, които могат да работят с различни типове.

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

### Decorators

Decorators предоставят механизъм за добавяне на metadata, промяна на поведение, валидиране или разширяване на функционалността на даден елемент. Те са функции, които се изпълняват по време на runtime. Могат да бъдат прилагани множество decorators върху една декларация.

Decorators са експериментална функционалност и следващите примери са съвместими само с TypeScript версия 5 или по-нова, използвайки ES6.

За версии на TypeScript преди 5, те трябва да бъдат активирани чрез свойството `experimentalDecorators` във вашия `tsconfig.json` или чрез използване на `--experimentalDecorators` в командния ред (но следният пример няма да работи).

Някои от често срещаните случаи на употреба на decorators включват:

* Следене на промени в свойства.
* Следене на извиквания на методи.
* Добавяне на допълнителни свойства или методи.
* Runtime валидиране.
* Автоматична сериализация и десериализация.
* Логване.
* Авторизация и автентикация.
* Защита от грешки.

Забележка: Decorators във версия 5 не позволяват декориране на параметри.

Видове decorators:

#### Class Decorators

Class Decorators са полезни за разширяване на съществуващ клас, например чрез добавяне на свойства или методи, или събиране на инстанции на даден клас. В следния пример добавяме метод `toString`, който преобразува класа в текстово представяне.

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

Property decorators са полезни за промяна на поведението на дадено свойство, например чрез промяна на началните му стойности. В следния код имаме скрипт, който задава стойността на свойство винаги да бъде с главни букви:

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

Method decorators позволяват да променяте или разширявате поведението на методи. По-долу е даден пример за прост logger:

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

Логва:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Декоратори за Getter и Setter

Декораторите за getter и setter позволяват да променяте или разширявате поведението на аксесорите на клас. Те са полезни например за валидиране на присвоявания на свойства. Ето един прост пример за getter декоратор:

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Невалидно';
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
console.log(obj.getValue); // Валидно: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Невалидно!
```

#### Metadata за декоратори

Decorator Metadata улеснява процеса за decorators да прилагат и използват metadata във всеки клас. Те могат да достъпват ново metadata свойство върху context обекта, което може да служи като ключ както за примитиви, така и за обекти.
Metadata информацията може да бъде достъпена от класа чрез `Symbol.metadata`.

Metadata може да се използва за различни цели, като дебъгване, сериализация или dependency injection с decorators.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Прост polify

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context съдържа metadata за свойства: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Задава metadata обект с примитивна стойност
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

const metadata = MyClass[Symbol.metadata]; // Взима metadata информация

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Наследяване

Наследяването се отнася до механизма, при който един клас може да наследява свойства и методи от друг клас, наречен базов клас или superclass. Производният клас, наричан още child class или subclass, може да разширява и специализира функционалността на базовия клас чрез добавяне на нови свойства и методи или чрез презаписване (override) на съществуващи.

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

// Създаване на инстанция на базовия клас
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Създаване на инстанция на производния клас
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript не поддържа множествено наследяване в традиционния смисъл и вместо това позволява наследяване от един базов клас.
TypeScript поддържа множество interfaces. Един interface може да дефинира договор за структурата на обект, а един клас може да имплементира множество interfaces. Това позволява на класа да наследява поведение и структура от множество източници.

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

Ключовата дума `class` в TypeScript, подобно на JavaScript, често се нарича syntactic sugar. Тя е въведена в ECMAScript 2015 (ES6), за да предостави по-познат синтаксис за създаване и работа с обекти по клас-ориентиран начин. Въпреки това е важно да се отбележи, че TypeScript, като надмножество на JavaScript, в крайна сметка се компилира до JavaScript, който остава прототипно базиран в основата си.

### Статични членове

TypeScript поддържа статични членове. За достъп до статичните членове на клас можете да използвате името на класа, последвано от точка, без да е необходимо да създавате инстанция.

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

### Инициализация на свойства

Съществуват няколко начина за инициализиране на свойства на клас в TypeScript:

Inline:

В следния пример тези начални стойности ще бъдат използвани при създаване на инстанция на класа.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

В конструктора:

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

Чрез параметри на конструктора:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // Няма нужда да присвояваме стойностите на свойствата изрично.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Method overloading

Method overloading позволява на един клас да има множество методи със същото име, но с различни типове параметри или различен брой параметри. Това позволява методът да бъде извикван по различни начини в зависимост от подадените аргументи.

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

