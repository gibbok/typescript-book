---
title: Class
sidebar:
  order: 55
  label: 55. Class
---


### Cú pháp class thông dụng

Từ khóa `class` được sử dụng trong TypeScript để định nghĩa một class. Dưới đây là một ví dụ:

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

Từ khóa `class` được dùng để định nghĩa một class có tên "Person".

Class có hai thuộc tính private: name kiểu `string` và age kiểu `number`.

Constructor được định nghĩa bằng từ khóa `constructor`. Nó nhận name và age làm tham số và gán chúng cho các thuộc tính tương ứng.

Class có một phương thức `public` tên là sayHi, phương thức này ghi ra một lời chào.

Để tạo một instance của class trong TypeScript, bạn có thể dùng từ khóa `new`, theo sau là tên class rồi dấu ngoặc đơn `()`. Ví dụ:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Constructor là các phương thức đặc biệt trong một class, được dùng để khởi tạo các thuộc tính của đối tượng khi một instance của class được tạo.

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

Có thể overload một constructor bằng cú pháp sau:

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

Trong TypeScript, có thể định nghĩa nhiều overload cho constructor, nhưng chỉ có thể có một phần triển khai và phần này phải tương thích với tất cả overload; có thể đạt được điều này bằng cách sử dụng tham số tùy chọn.

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

### Constructor private và protected

Trong TypeScript, constructor có thể được đánh dấu là private hoặc protected, điều này hạn chế khả năng truy cập và sử dụng của chúng.

Private Constructor:
Chỉ có thể được gọi bên trong chính class đó. Private constructor thường được dùng trong các tình huống bạn muốn thực thi singleton pattern hoặc giới hạn việc tạo instance vào một factory method bên trong class.

Protected Constructor:
Protected constructor hữu ích khi bạn muốn tạo một base class không nên được khởi tạo trực tiếp nhưng có thể được mở rộng bởi các subclass.

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

### Access Modifier

Access Modifier `private`, `protected` và `public` được dùng để kiểm soát tính hiển thị và khả năng truy cập của các thành viên class, như thuộc tính và phương thức, trong các class TypeScript. Các modifier này rất quan trọng để thực thi tính đóng gói và thiết lập ranh giới cho việc truy cập và sửa đổi trạng thái nội bộ của class.

Modifier `private` giới hạn quyền truy cập thành viên class chỉ trong class chứa nó.

Modifier `protected` cho phép truy cập thành viên class trong class chứa nó và các class dẫn xuất.

Modifier `public` cung cấp quyền truy cập không hạn chế vào thành viên class, cho phép truy cập từ bất kỳ đâu.

### Get và Set

Getter và setter là các phương thức đặc biệt cho phép bạn định nghĩa hành vi truy cập và sửa đổi tùy chỉnh cho thuộc tính class. Chúng cho phép đóng gói trạng thái nội bộ của đối tượng và cung cấp logic bổ sung khi lấy hoặc đặt giá trị của thuộc tính.
Trong TypeScript, getter và setter được định nghĩa lần lượt bằng từ khóa `get` và `set`. Dưới đây là một ví dụ:

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

### Auto-Accessor trong Class

TypeScript phiên bản 4.9 bổ sung hỗ trợ auto-accessor, một tính năng ECMAScript sắp tới. Chúng giống thuộc tính class nhưng được khai báo bằng từ khóa "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessor được "de-sugared" thành các accessor `get` và `set` private, hoạt động trên một thuộc tính không thể truy cập.

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

Trong TypeScript, từ khóa `this` tham chiếu đến instance hiện tại của một class bên trong các phương thức hoặc constructor của nó. Nó cho phép bạn truy cập và sửa đổi các thuộc tính và phương thức của class từ trong phạm vi của chính class đó.
Nó cung cấp cách truy cập và thao tác trạng thái nội bộ của một đối tượng bên trong các phương thức của chính đối tượng đó.

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

### Parameter Property

Parameter property cho phép bạn khai báo và khởi tạo thuộc tính class trực tiếp trong các tham số constructor, tránh mã boilerplate. Ví dụ:

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

### Abstract Class

Abstract Class được sử dụng trong TypeScript chủ yếu cho kế thừa. Nó cung cấp cách định nghĩa các thuộc tính và phương thức chung có thể được các subclass kế thừa.
Điều này hữu ích khi bạn muốn định nghĩa hành vi chung và bắt buộc các subclass triển khai một số phương thức nhất định. Chúng cung cấp cách tạo một hệ phân cấp class, trong đó abstract base class cung cấp interface dùng chung và chức năng chung cho các subclass.

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

### Với Generic

Class với generic cho phép bạn định nghĩa các class có thể tái sử dụng và làm việc với nhiều kiểu khác nhau.

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

Decorator cung cấp cơ chế để thêm metadata, sửa đổi hành vi, xác thực hoặc mở rộng chức năng của phần tử đích. Chúng là các hàm được thực thi tại thời gian chạy. Có thể áp dụng nhiều decorator cho một khai báo.

Decorator là tính năng thử nghiệm và các ví dụ sau chỉ tương thích với TypeScript phiên bản 5 trở lên khi dùng ES6.

Với các phiên bản TypeScript trước 5, cần bật chúng bằng thuộc tính `experimentalDecorators` trong `tsconfig.json` hoặc bằng `--experimentalDecorators` trên dòng lệnh (nhưng ví dụ sau sẽ không hoạt động).

Một số trường hợp sử dụng decorator phổ biến gồm:

* Theo dõi thay đổi thuộc tính.
* Theo dõi lời gọi phương thức.
* Thêm thuộc tính hoặc phương thức bổ sung.
* Xác thực tại thời gian chạy.
* Tự động serialization và deserialization.
* Logging.
* Authorization và authentication.
* Bảo vệ khỏi lỗi.

Lưu ý: Decorator của phiên bản 5 không cho phép trang trí tham số.

Các loại decorator:

#### Class Decorator

Class Decorator hữu ích để mở rộng một class hiện có, chẳng hạn thêm thuộc tính hoặc phương thức, hoặc thu thập các instance của một class. Trong ví dụ sau, chúng ta thêm phương thức `toString` chuyển class thành biểu diễn chuỗi.

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

Property decorator hữu ích để sửa đổi hành vi của một thuộc tính, chẳng hạn thay đổi giá trị khởi tạo. Trong đoạn mã sau, chúng ta có một script đặt một thuộc tính luôn ở dạng chữ hoa:

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

Method decorator cho phép bạn thay đổi hoặc tăng cường hành vi của phương thức. Dưới đây là ví dụ về một logger đơn giản:

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

Nó ghi ra:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter và Setter Decorator

Getter và setter decorator cho phép bạn thay đổi hoặc tăng cường hành vi của accessor trong class. Chúng hữu ích, chẳng hạn để xác thực việc gán thuộc tính. Dưới đây là một ví dụ đơn giản về getter decorator:

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

#### Metadata của Decorator

Decorator Metadata đơn giản hóa quá trình để decorator áp dụng và sử dụng metadata trong bất kỳ class nào. Chúng có thể truy cập một thuộc tính metadata mới trên đối tượng context, thuộc tính này có thể đóng vai trò như key cho cả primitive và object.
Có thể truy cập thông tin metadata trên class thông qua `Symbol.metadata`.

Metadata có thể được dùng cho nhiều mục đích như debugging, serialization hoặc dependency injection với decorator.

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

### Kế thừa

Kế thừa nói đến cơ chế mà một class có thể kế thừa thuộc tính và phương thức từ một class khác, được gọi là base class hoặc superclass. Class dẫn xuất, còn gọi là child class hoặc subclass, có thể mở rộng và chuyên biệt hóa chức năng của base class bằng cách thêm thuộc tính và phương thức mới hoặc override các thành phần hiện có.

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

TypeScript không hỗ trợ đa kế thừa theo nghĩa truyền thống và thay vào đó chỉ cho phép kế thừa từ một base class duy nhất.
TypeScript hỗ trợ nhiều interface. Một interface có thể định nghĩa hợp đồng cho cấu trúc của một đối tượng và một class có thể implement nhiều interface. Điều này cho phép class kế thừa hành vi và cấu trúc từ nhiều nguồn.

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

Từ khóa `class` trong TypeScript, tương tự JavaScript, thường được gọi là syntactic sugar. Nó được giới thiệu trong ECMAScript 2015 (ES6) để cung cấp cú pháp quen thuộc hơn cho việc tạo và làm việc với đối tượng theo cách dựa trên class. Tuy nhiên, điều quan trọng cần lưu ý là TypeScript, với tư cách tập cha của JavaScript, cuối cùng được biên dịch xuống JavaScript, vốn về cốt lõi vẫn dựa trên prototype.

### Thành viên static

TypeScript có các thành viên static. Để truy cập thành viên static của một class, bạn có thể dùng tên class theo sau bởi dấu chấm mà không cần tạo đối tượng.

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

### Khởi tạo thuộc tính

Có một số cách để khởi tạo thuộc tính cho class trong TypeScript:

Inline:

Trong ví dụ sau, các giá trị ban đầu này sẽ được sử dụng khi một instance của class được tạo.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Trong constructor:

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

Sử dụng tham số constructor:

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

Method overloading cho phép một class có nhiều phương thức cùng tên nhưng với kiểu tham số khác nhau hoặc số lượng tham số khác nhau. Điều này cho phép chúng ta gọi một phương thức theo nhiều cách dựa trên các đối số được truyền vào.

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

