## Class

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

Để tạo một instance của class trong TypeScript, bạn có thể dùng từ khóa `new` theo sau bởi tên class, rồi dấu ngoặc đơn `()`. Ví dụ:

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
