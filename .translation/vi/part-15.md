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
