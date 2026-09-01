## Các đối tượng JS tích hợp phổ biến

TypeScript là tập cha của JavaScript; nó bao gồm tất cả các đối tượng JavaScript tích hợp thường dùng. Bạn có thể tìm danh sách đầy đủ các đối tượng này trên trang tài liệu Mozilla Developer Network (MDN):
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

Dưới đây là danh sách một số đối tượng JavaScript tích hợp thường dùng:

* Function
* Object
* Boolean
* Error
* Number
* BigInt
* Math
* Date
* String
* RegExp
* Array
* Map
* Set
* Promise
* Intl

## Overload

Function overload trong TypeScript cho phép bạn định nghĩa nhiều chữ ký hàm cho một tên hàm duy nhất, nhờ đó có thể định nghĩa các hàm được gọi theo nhiều cách. Dưới đây là một ví dụ:

```typescript
// Overloads
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementation
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Valid
sayHi(['aa', 'bb']); // Valid
```

Dưới đây là một ví dụ khác về sử dụng function overload trong một `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // overload
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementation
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

## Hợp nhất và mở rộng

Merging và extension nói đến hai khái niệm khác nhau liên quan đến làm việc với type và interface.

Merging cho phép bạn kết hợp nhiều khai báo có cùng tên thành một định nghĩa duy nhất, ví dụ khi bạn định nghĩa một interface có cùng tên nhiều lần:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Extension nói đến khả năng mở rộng hoặc kế thừa từ type hoặc interface hiện có để tạo type hoặc interface mới. Đây là cơ chế để thêm thuộc tính hoặc phương thức vào một kiểu hiện có mà không sửa đổi định nghĩa ban đầu của nó. Ví dụ:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

## Khác biệt giữa Type và Interface

Declaration merging (augmentation):

Interface hỗ trợ declaration merging, nghĩa là bạn có thể định nghĩa nhiều interface có cùng tên và TypeScript sẽ hợp nhất chúng thành một interface duy nhất với các thuộc tính và phương thức kết hợp. Ngược lại, type không hỗ trợ declaration merging. Điều này có thể hữu ích khi bạn muốn thêm chức năng hoặc tùy chỉnh các kiểu hiện có mà không sửa đổi định nghĩa ban đầu, hoặc vá các kiểu bị thiếu hay không chính xác.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Mở rộng type/interface khác:

Cả type và interface đều có thể mở rộng type/interface khác, nhưng cú pháp khác nhau. Với interface, bạn sử dụng từ khóa `extends` để kế thừa thuộc tính và phương thức từ interface khác. Tuy nhiên, interface không thể mở rộng một kiểu phức tạp như union type.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Với type, bạn sử dụng toán tử & để kết hợp nhiều kiểu thành một kiểu duy nhất (intersection).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Union Type và Intersection Type:

Type linh hoạt hơn khi định nghĩa Union Type và Intersection Type. Với từ khóa `type`, bạn có thể dễ dàng tạo union type bằng toán tử `|` và intersection type bằng toán tử `&`. Trong khi interface cũng có thể biểu diễn union type một cách gián tiếp, chúng không có hỗ trợ tích hợp cho intersection type.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Ví dụ với interface:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```
