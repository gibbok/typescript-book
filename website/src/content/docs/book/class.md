---
title: Class
sidebar:
  order: 54
  label: 54. Class
---


### Class Common Syntax

The `class` keyword is used in TypeScript to define a class. Below, you can see an example:

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

The `class` keyword is used to define a class named "Person".

The class has two private properties: name of type `string` and age of type `number`.

The constructor is defined using the `constructor` keyword. It takes name and age as parameters and assigns them to the corresponding properties.

The class has a `public` method named sayHi that logs a greeting message.

To create an instance of a class in TypeScript, you can use the `new` keyword followed by the class name, followed by parentheses `()`. For instance:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Constructors are special methods within a class that are used to initialize the object's properties when an instance of the class is created.

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

It is possible to overload a constructor using the following syntax:

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

In TypeScript, it is possible to define multiple constructor overloads, but you can have only one implementation that must be compatible with all the overloads, this can be achieved  by using an optional parameter.

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

### Private and Protected Constructors

In TypeScript, constructors can be marked as private or protected, which restricts their accessibility and usage.

Private Constructors:
Can be called only within the class itself. Private constructors are often used in scenarios where you want to enforce a singleton pattern or restrict the creation of instances to a factory method within the class

Protected Constructors:
Protected constructors are useful when you want to create a base class that should not be instantiated directly but can be extended by subclasses.

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

### Access Modifiers

Access Modifiers `private`, `protected`, and `public` are used to control the visibility and accessibility of class members, such as properties and methods, in TypeScript classes. These modifiers are essential for enforcing encapsulation and establishing boundaries for accessing and modifying the internal state of a class.

The `private` modifier restricts access to the class member only within the containing class.

The `protected` modifier allows access to the class member within the containing class and its derived classes.

The `public` modifier provides unrestricted access to the class member, allowing it to be accessed from anywhere."

### Get & Set

Getters and setters are special methods that allow you to define custom access and modification behavior for class properties. They enable you to encapsulate the internal state of an object and provide additional logic when getting or setting the values of properties.
In TypeScript, getters and setters are defined using the `get` and `set` keywords respectively. Here's an example:

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

### Auto-Accessors in Classes

TypeScript version 4.9 adds support for auto-accessors, a forthcoming ECMAScript feature. They resemble class properties but are declared with the "accessor" keyword.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessors are "de-sugared" into private `get` and `set` accessors, operating on an inaccessible property.

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

In TypeScript, the `this` keyword refers to the current instance of a class within its methods or constructors. It allows you to access and modify the properties and methods of the class from within its own scope.
It provides a way to access and manipulate the internal state of an object within its own methods.

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

Parameter properties allow you to declare and initialize class properties directly within the constructor parameters avoiding boilerplate code, example:

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

### Abstract Classes

Abstract Classes are used in TypeScript mainly for inheritance, they provide a way to define common properties and methods that can be inherited by subclasses.
This is useful when you want to define common behavior and enforce that subclasses implement certain methods. They provide a way to create a hierarchy of classes where the abstract base class provides a shared interface and common functionality for the subclasses.

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

### With Generics

Classes with generics allow you to define reusable classes which can work with different types.

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

Decorators provide a mechanism to add metadata, modify behavior, validate, or extend the functionality of the target element. They are functions that execute at runtime. Multiple decorators can be applied to a declaration.

Decorators are experimental features, and the following examples are only compatible with TypeScript version 5 or above using ES6.

For TypeScript versions prior to 5, they should be enabled using the `experimentalDecorators` property in your `tsconfig.json` or by using `--experimentalDecorators` in your command line (but the following example won't work).

Some of the common use cases for decorators include:

* Watching property changes.
* Watching method calls.
* Adding extra properties or methods.
* Runtime validation.
* Automatic serialization and deserialization.
* Logging.
* Authorization and authentication.
* Error guarding.

Note: Decorators for version 5 do not allow decorating parameters.

Types of decorators:

#### Class Decorators

Class Decorators are useful for extending an existing class, such as adding properties or methods, or collecting instances of a class. In the following example, we add a `toString` method that converts the class into a string representation.

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

Property decorators are useful for modifying the behavior of a property, such as changing the initialization values. In the following code, we have a script that sets a property to always be in uppercase:

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

Method decorators allow you to change or enhance the behavior of methods. Below is an example of a simple logger:

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

It logs:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter and Setter Decorators

Getter and setter decorators allow you to change or enhance the behavior of class accessors. They are useful, for instance, for validating property assignments. Here's a simple example for a getter decorator:

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

#### Decorator Metadata

Decorator Metadata simplifies the process for decorators to apply and utilize metadata in any class. They can access a new metadata property on the context object, which can serve as a key for both primitives and objects.
Metadata information can be accessed on the class via `Symbol.metadata`.

Metadata can be used for various purposes, such as debugging, serialization, or dependency injection with decorators.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polify

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

### Inheritance

Inheritance refers to the mechanism by which a class can inherit properties and methods from another class, known as the base class or superclass. The derived class, also called the child class or subclass, can extend and specialize the functionality of the base class by adding new properties and methods or overriding existing ones.

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

TypeScript does not support multiple inheritance in the traditional sense and instead allows inheritance from a single base class.
TypeScript supports multiple interfaces. An interface can define a contract for the structure of an object, and a class can implement multiple interfaces. This allows a class to inherit behavior and structure from multiple sources.

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

The `class` keyword in TypeScript, similar to JavaScript, is often referred to as syntactic sugar. It was introduced in ECMAScript 2015 (ES6) to offer a more familiar syntax for creating and working with objects in a class-based manner. However, it's important to note that TypeScript, being a superset of JavaScript, ultimately compiles down to JavaScript, which remains prototype-based at its core.

### Statics

TypeScript has static members. To access the static members of a class, you can use the class name followed by a dot, without the need to create an object.

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

### Property initialization

There are several ways how you can initialize properties for a class in TypeScript:

Inline:

In the following example these initial values will be used when an instance of the class is created.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

In the constructor:

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

Using constructor parameters:

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

### Method overloading

Method overloading allows a class to have multiple methods with the same name but different parameter types or a different number of parameters. This allows us to call a method in different ways based on the arguments passed.

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

