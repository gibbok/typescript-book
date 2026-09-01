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

Lưu ý: Decorator của phiên bản 5 không cho phép decorate tham số.

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
