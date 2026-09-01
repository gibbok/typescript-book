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

Abstract Class được sử dụng trong TypeScript chủ yếu cho kế thừa. Chúng cung cấp cách định nghĩa các thuộc tính và phương thức chung có thể được các subclass kế thừa.
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
