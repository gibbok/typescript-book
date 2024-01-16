---
title: Class
sidebar:
  order: 54
  label: 54. Class
---


### 通用语法

TypeScript 中使用关键字 `class` 来定义类。下面，您可以看到一个示例：

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

`class` 关键字用于定义名为 `Person` 的类。

该类有两个私有属性：类型名称 `string` 和类型年龄 `number`。

构造函数是使用 `constructor` 关键字定义的。它将姓名和年龄作为参数并将它们分配给相应的属性。

该类有一个 `public` 名为 `sayHi` 的方法，用于记录问候消息。

要在 TypeScript 中创建类的实例，可以使用 `new` 关键字，后跟类名，然后使用括号 `()`。例如：

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // 输出：Hello, my name is John Doe and I am 25 years old.
```

### 构造函数

构造函数是类中的特殊方法，用于在创建类的实例时初始化对象的属性。

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

可以使用以下语法重载构造函数：

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

在 TypeScript 中，可以定义多个构造函数重载，但只能有一个必须与所有重载兼容的实现，这可以通过使用可选参数来实现。

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

### 私有和受保护的构造函数

在 TypeScript 中，构造函数可以标记为私有或受保护，这限制了它们的可访问性和使用。

私有构造函数：只能在类本身内调用。私有构造函数通常用于以下场景：您想要强制执行单例模式或将实例的创建限制为类中的工厂方法

受保护的构造函数：当您想要创建一个不应直接实例化但可以由子类扩展的基类时，受保护的构造函数非常有用。

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

// 尝试直接实例化基类将导致错误
// const baseObj = new BaseClass(); // 错误：类"BaseClass"的构造函数受到保护。

// 创建派生类的实例
const derivedObj = new DerivedClass(10);
```

### 访问修饰符

访问修饰符 `private` 、`protected` 和 `public` 用于控制 TypeScript 类中类成员（例如属性和方法）的可见性和可访问性。这些修饰符对于强制封装以及建立访问和修改类内部状态的边界至关重要。

修饰符 `private` 仅限制对包含类中的类成员的访问。

修饰符 `protected` 允许访问包含类及其派生类中的类成员。

修饰符 `public` 提供对类成员的不受限制的访问，允许从任何地方访问它。

### Get 与 Set

Getter 和 Setter 是特殊方法，允许您定义类属性的自定义访问和修改行为。它们使您能够封装对象的内部状态，并在获取或设置属性值时提供附加逻辑。在 TypeScript 中，getter 和 setter 分别使用 `get` 和 `set` 关键字定义。这是一个例子：

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

### 类中的自动访问器

TypeScript 版本 4.9 添加了对自动访问器的支持，这是即将推出的 ECMAScript 功能。它们类似于类属性，但使用"accessor"关键字声明。

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

自动访问器被"脱糖"为私有get访问set器，在无法访问的属性上运行。

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

在 TypeScript 中，`this` 关键字指的是类的方法或构造函数中的当前实例。它允许您在类自己的范围内访问和修改类的属性和方法。它提供了一种在对象自己的方法中访问和操作对象内部状态的方法。

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

### 参数属性

参数属性允许您直接在构造函数参数中声明和初始化类属性，从而避免样板代码，例如：

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // 构造函数中的"private"和"public"关键字自动声明并初始化相应的类属性。
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

### 抽象类

抽象类在 TypeScript 中主要用于继承，它们提供了一种定义可由子类继承的公共属性和方法的方法。当您想要定义常见行为并强制子类实现某些方法时，这非常有用。它们提供了一种创建类层次结构的方法，其中抽象基类为子类提供共享接口和通用功能。

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
cat.makeSound(); // 输出：Whiskers meows.
```

### 使用泛型

具有泛型的类允许您定义可以与不同类型一起使用的可重用类。

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

### 装饰器

装饰器提供了一种添加元数据、修改行为、验证或扩展目标元素功能的机制。它们是在运行时执行的函数。多个装饰器可以应用于一个声明。

装饰器是实验性功能，以下示例仅与使用 ES6 的 TypeScript 版本 5 或更高版本兼容。

对于 5 之前的 TypeScript 版本，应在您的 `tsconfig.json` 中使用使`experimentalDecorators` 或在命令行中使用 `--experimentalDecorators` 来启用它们（但以下示例不起作用）。

装饰器的一些常见用例包括：

* 观察属性变化。
* 观察方法调用。
* 添加额外的属性或方法。
* 运行时验证。
* 自动序列化和反序列化。
* 日志记录。
* 授权和认证。
* 错误防护。

注意：版本 5 的装饰器不允许装饰参数。

装饰器的类型：

#### 类装饰器

类装饰器对于扩展现有类非常有用，例如添加属性或方法，或者收集类的实例。在下面的示例中，我们添加一个 `toString` 将类转换为字符串表示形式的方法。

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

#### 属性装饰器

属性装饰器对于修改属性的行为非常有用，例如更改初始化值。在下面的代码中，我们有一个脚本将属性设置为始终大写：

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

console.log(new MyClass().prop1); // 日志：HELLO!
```

#### 方法装饰器

方法装饰器允许您更改或增强方法的行为。下面是一个简单记录器的示例：

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

它记录：

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter 和 Setter 装饰器

getter 和 setter 装饰器允许您更改或增强类访问器的行为。例如，它们对于验证属性分配很有用。这是 getter 装饰器的一个简单示例：

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
console.log(obj.getValue); // 有效: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // 抛出异常: Invalid!
```

### 装饰器元数据

装饰器元数据简化了装饰器在任何类中应用和利用元数据的过程。 他们可以访问上下文对象上的新元数据属性，该属性可以充当基元和对象的密钥。
可以通过"Symbol.metadata"在类上访问元数据信息。

元数据可用于各种目的，例如调试、序列化或使用装饰器的依赖项注入。

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // 简单的兼容性填充

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // 上下文对象包含属性元数据: 装饰器元数据

function setMetadata(_target: any, context: Context) {
    // 使用基本类型值设置元数据对象
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

const metadata = MyClass[Symbol.metadata]; // 获取元数据对象信息

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### 继承

继承是指一个类可以从另一个类（称为基类或超类）继承属性和方法的机制。派生类也称为子类或子类，可以通过添加新的属性和方法或重写现有的属性和方法来扩展和专门化基类的功能。

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

// 创建基类的一个实例
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// 创建派生类的一个实例
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript 不支持传统意义上的多重继承，而是允许从单个基类继承。TypeScript 支持多种接口。接口可以定义对象结构的契约，类可以实现多个接口。这允许类从多个源继承行为和结构。

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

TypeScript 中的关键字 `class` 与 JavaScript 类似，通常被称为语法糖。它是在 ECMAScript 2015 (ES6) 中引入的，旨在提供更熟悉的语法，以基于类的方式创建和使用对象。然而，值得注意的是，TypeScript 作为 JavaScript 的超集，最终会编译为 JavaScript，而 JavaScript 的核心仍然是基于原型的。

### 静态成员

TypeScript 有静态成员。要访问类的静态成员，可以使用类名后跟一个点，而不需要创建对象。

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

### 属性初始化

在 TypeScript 中初始化类的属性有多种方法：

内嵌：

在下面的示例中，创建类的实例时将使用这些初始值。

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

在构造函数中：

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

使用构造函数参数：

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // 无需显式地将值分配给属性。
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### 方法重载

方法重载允许一个类有多个名称相同但参数类型不同或参数数量不同的方法。这允许我们根据传递的参数以不同的方式调用方法。

```typescript
class MyClass {
    add(a: number, b: number): number; // 重载签名 1
    add(a: string, b: string): string; // 重载签名 2

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
console.log(r.add(10, 5)); // 日志：15
```

