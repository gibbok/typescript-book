---
title: 클래스
sidebar:
  order: 55
  label: 55. 클래스
---


### 클래스 공통 구문

TypeScript에서 `class` 키워드는 클래스를 정의하는 데 사용됩니다. 아래에서 예제를 확인할 수 있습니다.

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

`class` 키워드는 "Person"이라는 클래스를 정의하는 데 사용됩니다.

이 클래스에는 두 개의 private 프로퍼티가 있습니다. `string` 타입의 name과 `number` 타입의 age입니다.

생성자는 `constructor` 키워드를 사용하여 정의됩니다. name과 age를 매개변수로 받아 해당 프로퍼티에 할당합니다.

클래스에는 인사 메시지를 기록하는 sayHi라는 `public` 메서드가 있습니다.

TypeScript에서 클래스의 인스턴스를 만들려면 `new` 키워드 다음에 클래스 이름과 괄호 `()`를 사용할 수 있습니다. 예를 들면 다음과 같습니다.

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### 생성자

생성자는 클래스의 인스턴스가 생성될 때 객체의 프로퍼티를 초기화하는 데 사용되는 클래스 내의 특수 메서드입니다.

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

다음 구문을 사용하여 생성자를 오버로드할 수 있습니다.

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

TypeScript에서는 여러 생성자 오버로드를 정의할 수 있지만 모든 오버로드와 호환되어야 하는 구현은 하나만 둘 수 있습니다. 이는 선택적 매개변수를 사용하여 구현할 수 있습니다.

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

### Private 및 Protected 생성자

TypeScript에서는 생성자를 private 또는 protected로 표시하여 접근성과 사용을 제한할 수 있습니다.

private 생성자:
클래스 자체 내에서만 호출할 수 있습니다. private 생성자는 싱글턴 패턴을 강제하거나 인스턴스 생성을 클래스 내의 팩토리 메서드로 제한하려는 경우에 자주 사용됩니다.

protected 생성자:
직접 인스턴스화해서는 안 되지만 서브클래스가 확장할 수 있는 기본 클래스를 만들려는 경우에 유용합니다.

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

### 접근 제한자

접근 제한자 `private`, `protected`, `public`은 TypeScript 클래스에서 프로퍼티와 메서드 같은 클래스 멤버의 가시성과 접근성을 제어하는 데 사용됩니다. 이러한 제한자는 캡슐화를 강제하고 클래스 내부 상태에 접근하고 이를 수정하기 위한 경계를 설정하는 데 필수적입니다.

`private` 제한자는 클래스 멤버에 대한 접근을 해당 멤버를 포함하는 클래스 내부로만 제한합니다.

`protected` 제한자는 해당 멤버를 포함하는 클래스와 파생 클래스 내부에서 클래스 멤버에 접근할 수 있게 합니다.

`public` 제한자는 클래스 멤버에 제한 없이 접근할 수 있게 하여 어디서든 접근할 수 있도록 합니다.

### Get과 Set

getter와 setter는 클래스 프로퍼티에 대한 사용자 지정 접근 및 수정 동작을 정의할 수 있게 하는 특수 메서드입니다. 객체의 내부 상태를 캡슐화하고 프로퍼티 값을 가져오거나 설정할 때 추가 로직을 제공할 수 있습니다.
TypeScript에서 getter와 setter는 각각 `get`과 `set` 키워드를 사용하여 정의됩니다. 다음은 예제입니다.

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

### 클래스의 자동 접근자

TypeScript 버전 4.9에서는 향후 제공될 ECMAScript 기능인 자동 접근자를 지원합니다. 자동 접근자는 클래스 프로퍼티와 유사하지만 "accessor" 키워드로 선언됩니다.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

자동 접근자는 접근할 수 없는 프로퍼티에 대해 작동하는 private `get` 및 `set` 접근자로 "디슈거링"됩니다.

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

TypeScript에서 `this` 키워드는 메서드 또는 생성자 내에서 클래스의 현재 인스턴스를 가리킵니다. 클래스 자체의 범위 안에서 클래스의 프로퍼티와 메서드에 접근하고 이를 수정할 수 있게 합니다.
객체 자체의 메서드 안에서 객체의 내부 상태에 접근하고 이를 조작하는 방법을 제공합니다.

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

### 매개변수 프로퍼티

매개변수 프로퍼티를 사용하면 생성자 매개변수에서 클래스 프로퍼티를 직접 선언하고 초기화하여 반복적인 코드를 피할 수 있습니다. 예를 들면 다음과 같습니다.

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

### 추상 클래스

추상 클래스는 TypeScript에서 주로 상속에 사용됩니다. 서브클래스가 상속할 수 있는 공통 프로퍼티와 메서드를 정의하는 방법을 제공합니다.
공통 동작을 정의하고 서브클래스가 특정 메서드를 구현하도록 강제하려는 경우 유용합니다. 추상 기본 클래스는 서브클래스에 공유 인터페이스와 공통 기능을 제공하는 클래스 계층 구조를 만들 때 유용합니다.

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

### 제네릭과 함께 사용하기

제네릭 클래스는 여러 타입을 대상으로 작동할 수 있는 재사용 가능한 클래스를 정의할 수 있게 합니다.

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

### 데코레이터

데코레이터는 메타데이터를 추가하고 동작을 수정하거나 검증하며 대상 요소의 기능을 확장하는 메커니즘을 제공합니다. 데코레이터는 런타임에 실행되는 함수입니다. 하나의 선언에 여러 데코레이터를 적용할 수 있습니다.

데코레이터는 실험적 기능이며 다음 예제는 ES6를 사용하는 TypeScript 버전 5 이상에서만 호환됩니다.

버전 5 이전 TypeScript에서는 `experimentalDecorators` 프로퍼티를 `tsconfig.json`에서 사용하거나 명령줄에서 `--experimentalDecorators`를 사용하여 활성화해야 합니다(하지만 다음 예제는 작동하지 않습니다).

데코레이터의 일반적인 사용 사례는 다음과 같습니다.

* 프로퍼티 변경 감시.
* 메서드 호출 감시.
* 추가 프로퍼티 또는 메서드 추가.
* 런타임 검증.
* 자동 직렬화 및 역직렬화.
* 로깅.
* 권한 부여 및 인증.
* 오류 방지.

참고: 버전 5의 데코레이터는 매개변수 데코레이팅을 허용하지 않습니다.

데코레이터의 종류:

#### 클래스 데코레이터

클래스 데코레이터는 프로퍼티나 메서드를 추가하거나 클래스의 인스턴스를 수집하는 등 기존 클래스를 확장하는 데 유용합니다. 다음 예제에서는 클래스를 문자열 표현으로 변환하는 `toString` 메서드를 추가합니다.

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

#### 프로퍼티 데코레이터

프로퍼티 데코레이터는 초기화 값을 변경하는 등 프로퍼티의 동작을 수정하는 데 유용합니다. 다음 코드에는 프로퍼티가 항상 대문자가 되도록 설정하는 스크립트가 있습니다.

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

#### 메서드 데코레이터

메서드 데코레이터를 사용하면 메서드의 동작을 변경하거나 향상할 수 있습니다. 아래는 간단한 로거의 예제입니다.

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

다음과 같이 출력됩니다.

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter 및 Setter 데코레이터

getter 및 setter 데코레이터를 사용하면 클래스 접근자의 동작을 변경하거나 향상할 수 있습니다. 예를 들어 프로퍼티 할당을 검증하는 데 유용합니다. 다음은 getter 데코레이터의 간단한 예제입니다.

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

#### 데코레이터 메타데이터

데코레이터 메타데이터는 데코레이터가 모든 클래스에서 메타데이터를 적용하고 활용하는 과정을 간소화합니다. 데코레이터는 컨텍스트 객체의 새로운 metadata 프로퍼티에 접근할 수 있으며, 이 프로퍼티는 원시 값과 객체 모두의 키 역할을 할 수 있습니다.
메타데이터 정보는 `Symbol.metadata`를 통해 클래스에서 접근할 수 있습니다.

메타데이터는 디버깅, 직렬화 또는 데코레이터를 사용한 의존성 주입 등 다양한 목적으로 사용할 수 있습니다.

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

### 상속

상속은 클래스가 기본 클래스 또는 슈퍼클래스라고 하는 다른 클래스의 프로퍼티와 메서드를 상속할 수 있는 메커니즘을 가리킵니다. 자식 클래스 또는 서브클래스라고도 하는 파생 클래스는 새로운 프로퍼티와 메서드를 추가하거나 기존 항목을 재정의하여 기본 클래스의 기능을 확장하고 특수화할 수 있습니다.

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

TypeScript는 전통적인 의미의 다중 상속을 지원하지 않으며 대신 하나의 기본 클래스에서 상속할 수 있습니다.
TypeScript는 다중 인터페이스를 지원합니다. 인터페이스는 객체 구조에 대한 계약을 정의할 수 있으며 클래스는 여러 인터페이스를 구현할 수 있습니다. 이를 통해 클래스가 여러 소스로부터 동작과 구조를 상속할 수 있습니다.

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

JavaScript와 마찬가지로 TypeScript의 `class` 키워드는 흔히 문법적 설탕이라고 합니다. 클래스 기반 방식으로 객체를 만들고 다루는 데 더 익숙한 구문을 제공하기 위해 ECMAScript 2015(ES6)에 도입되었습니다. 그러나 TypeScript는 JavaScript의 상위 집합이므로 궁극적으로 JavaScript로 컴파일되며, JavaScript의 핵심은 여전히 프로토타입 기반이라는 점에 유의해야 합니다.

### 정적 멤버

TypeScript에는 정적 멤버가 있습니다. 클래스의 정적 멤버에 접근하려면 객체를 생성할 필요 없이 클래스 이름 다음에 점을 사용할 수 있습니다.

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

### 프로퍼티 초기화

TypeScript에서 클래스의 프로퍼티를 초기화하는 방법은 여러 가지가 있습니다.

인라인:

다음 예제에서는 클래스의 인스턴스가 생성될 때 이러한 초기값이 사용됩니다.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

생성자에서:

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

생성자 매개변수 사용:

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

### 메서드 오버로딩

메서드 오버로드를 사용하면 클래스가 이름은 같지만 매개변수 타입이나 매개변수 수가 다른 여러 메서드를 가질 수 있습니다. 이를 통해 전달된 인수에 따라 메서드를 여러 방식으로 호출할 수 있습니다.

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

