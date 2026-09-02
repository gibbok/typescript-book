---
title: Класс
sidebar:
  order: 55
  label: 55. Класс
---


### Общий синтаксис класса

Ключевое слово `class` используется в TypeScript для определения класса. Ниже приведён пример:

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

Ключевое слово `class` используется для определения класса с именем "Person".

Класс имеет два закрытых свойства: name с типом `string` и age с типом `number`.

Конструктор определяется с помощью ключевого слова `constructor`. Он принимает name и age в качестве параметров и присваивает их соответствующим свойствам.

Класс имеет `public`-метод sayHi, который выводит приветственное сообщение в консоль.

Чтобы создать экземпляр класса в TypeScript, можно использовать ключевое слово `new`, после которого следуют имя класса и круглые скобки `()`. Например:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Конструктор

Конструкторы — это специальные методы класса, которые используются для инициализации свойств объекта при создании экземпляра класса.

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

Конструктор можно перегрузить, используя следующий синтаксис:

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

В TypeScript можно определить несколько перегрузок конструктора, однако реализация может быть только одна и должна быть совместима со всеми перегрузками. Этого можно добиться с помощью необязательного параметра.

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

### Закрытые и защищённые конструкторы

В TypeScript конструкторы можно объявить закрытыми или защищёнными, что ограничивает их доступность и использование.

Закрытые конструкторы:
Могут вызываться только внутри самого класса. Закрытые конструкторы часто используются, когда необходимо реализовать паттерн «Одиночка» или разрешить создание экземпляров только фабричному методу внутри класса.

Защищённые конструкторы:
Защищённые конструкторы полезны, когда необходимо создать базовый класс, экземпляры которого не следует создавать напрямую, но от которого могут наследоваться подклассы.

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

### Модификаторы доступа

Модификаторы доступа `private`, `protected` и `public` используются для управления видимостью и доступностью членов классов TypeScript, таких как свойства и методы. Эти модификаторы необходимы для обеспечения инкапсуляции и установления границ доступа к внутреннему состоянию класса и его изменению.

Модификатор `private` разрешает доступ к члену класса только внутри содержащего его класса.

Модификатор `protected` разрешает доступ к члену класса внутри содержащего его класса и производных классов.

Модификатор `public` предоставляет неограниченный доступ к члену класса, позволяя обращаться к нему откуда угодно.

### Геттеры и сеттеры

Геттеры и сеттеры — это специальные методы, позволяющие определять пользовательское поведение при доступе к свойствам класса и их изменении. Они позволяют инкапсулировать внутреннее состояние объекта и добавлять логику при получении или установке значений свойств.
В TypeScript геттеры и сеттеры определяются с помощью ключевых слов `get` и `set` соответственно. Рассмотрим пример:

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

### Автоаксессоры в классах

В TypeScript версии 4.9 добавлена поддержка автоаксессоров — планируемой возможности ECMAScript. Они похожи на свойства класса, но объявляются с помощью ключевого слова "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Автоаксессоры преобразуются в закрытые аксессоры `get` и `set`, работающие с недоступным извне свойством.

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

В TypeScript ключевое слово `this` внутри методов или конструкторов класса ссылается на текущий экземпляр класса. Оно позволяет получать доступ к свойствам и методам класса и изменять их из области видимости самого класса.
Это даёт возможность получать доступ к внутреннему состоянию объекта и управлять им в его собственных методах.

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

### Свойства-параметры

Свойства-параметры позволяют объявлять и инициализировать свойства класса непосредственно в параметрах конструктора, избегая повторяющегося шаблонного кода. Например:

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

### Абстрактные классы

Абстрактные классы используются в TypeScript главным образом для наследования. Они позволяют определять общие свойства и методы, которые могут наследоваться подклассами.
Это полезно, когда требуется определить общее поведение и обязать подклассы реализовать определённые методы. Абстрактные классы позволяют создать иерархию классов, в которой абстрактный базовый класс предоставляет подклассам общий интерфейс и общую функциональность.

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

### С обобщёнными типами

Классы с обобщёнными типами позволяют определять классы, пригодные для повторного использования и способные работать с разными типами.

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

### Декораторы

Декораторы предоставляют механизм для добавления метаданных, изменения поведения, проверки или расширения функциональности целевого элемента. Это функции, выполняемые во время работы программы. К одному объявлению можно применить несколько декораторов.

Декораторы являются экспериментальной возможностью, а следующие примеры совместимы только с TypeScript версии 5 или выше при использовании ES6.

В версиях TypeScript до 5 их необходимо включить с помощью свойства `experimentalDecorators` в файле `tsconfig.json` или параметра `--experimentalDecorators` в командной строке (но следующий пример работать не будет).

Некоторые распространённые сценарии использования декораторов:

* Отслеживание изменений свойств.
* Отслеживание вызовов методов.
* Добавление дополнительных свойств или методов.
* Проверка во время выполнения.
* Автоматическая сериализация и десериализация.
* Логирование.
* Авторизация и аутентификация.
* Защита от ошибок.

Примечание: декораторы в версии 5 не позволяют декорировать параметры.

Типы декораторов:

#### Декораторы классов

Декораторы классов полезны для расширения существующего класса, например для добавления свойств или методов либо сбора экземпляров класса. В следующем примере мы добавляем метод `toString`, преобразующий класс в строковое представление.

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

#### Декоратор свойства

Декораторы свойств полезны для изменения поведения свойства, например для изменения начальных значений. В следующем коде приведён скрипт, который всегда задаёт значение свойства в верхнем регистре:

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

#### Декоратор метода

Декораторы методов позволяют изменять или расширять поведение методов. Ниже приведён пример простого логгера:

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

Будет выведено:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Декораторы геттеров и сеттеров

Декораторы геттеров и сеттеров позволяют изменять или расширять поведение аксессоров класса. Они полезны, например, для проверки значений, присваиваемых свойствам. Ниже приведён простой пример декоратора геттера:

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

#### Метаданные декораторов

Метаданные декораторов упрощают применение и использование метаданных в любом классе. Декораторы могут обращаться к новому свойству metadata объекта контекста, которое может служить ключом как для примитивов, так и для объектов.
Доступ к метаданным класса можно получить через `Symbol.metadata`.

Метаданные можно использовать для различных целей, таких как отладка, сериализация или внедрение зависимостей с помощью декораторов.

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

### Наследование

Наследование — это механизм, благодаря которому класс может наследовать свойства и методы другого класса, называемого базовым классом или суперклассом. Производный класс, также называемый дочерним классом или подклассом, может расширять и специализировать функциональность базового класса, добавляя новые свойства и методы либо переопределяя существующие.

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

TypeScript не поддерживает множественное наследование в традиционном смысле и вместо этого допускает наследование от одного базового класса.
TypeScript поддерживает использование нескольких интерфейсов. Интерфейс может определять контракт структуры объекта, а класс может реализовывать несколько интерфейсов. Благодаря этому класс может наследовать поведение и структуру из нескольких источников.

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

Ключевое слово `class` в TypeScript, как и в JavaScript, часто называют синтаксическим сахаром. Оно было введено в ECMAScript 2015 (ES6), чтобы предоставить более привычный синтаксис для создания объектов и работы с ними в стиле классов. Однако важно отметить, что TypeScript, являясь надмножеством JavaScript, в конечном счёте компилируется в JavaScript, который по своей сути остаётся прототипно-ориентированным.

### Статические члены

TypeScript поддерживает статические члены. Для доступа к статическим членам класса можно указать имя класса и поставить после него точку, не создавая объект.

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

### Инициализация свойств

В TypeScript существует несколько способов инициализировать свойства класса:

Непосредственно в объявлении:

В следующем примере эти начальные значения будут использованы при создании экземпляра класса.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

В конструкторе:

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

С помощью параметров конструктора:

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

### Перегрузка методов

Перегрузка методов позволяет классу иметь несколько методов с одинаковым именем, но с разными типами или количеством параметров. Это позволяет вызывать метод разными способами в зависимости от переданных аргументов.

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

