## Khác

### Lỗi và xử lý ngoại lệ

TypeScript cho phép bạn bắt và xử lý lỗi bằng các cơ chế xử lý lỗi JavaScript tiêu chuẩn:

Khối Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Bạn cũng có thể xử lý các loại lỗi khác nhau:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

Kiểu lỗi tùy chỉnh:

Có thể chỉ định các lỗi cụ thể hơn bằng cách mở rộng `class` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin class

Mixin class cho phép bạn kết hợp và tổng hợp hành vi từ nhiều class vào một class duy nhất. Chúng cung cấp cách tái sử dụng và mở rộng chức năng mà không cần các chuỗi kế thừa sâu.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Các tính năng ngôn ngữ bất đồng bộ

Vì TypeScript là tập cha của JavaScript, nó có các tính năng ngôn ngữ bất đồng bộ tích hợp của JavaScript như:

Promise:

Promise là cách xử lý các thao tác bất đồng bộ và kết quả của chúng bằng các phương thức như `.then()` và `.catch()` để xử lý điều kiện thành công và lỗi.

Tìm hiểu thêm: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Các từ khóa Async/await cung cấp cú pháp trông đồng bộ hơn khi làm việc với Promise. Từ khóa `async` được dùng để định nghĩa một hàm bất đồng bộ và từ khóa `await` được dùng bên trong hàm async để tạm dừng thực thi cho đến khi Promise được resolve hoặc reject.

Tìm hiểu thêm:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Các API sau được TypeScript hỗ trợ tốt:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iterator và Generator

Cả Iterator và Generator đều được TypeScript hỗ trợ tốt.

Iterator là các đối tượng triển khai iterator protocol, cung cấp cách truy cập từng phần tử của một collection hoặc sequence. Nó là một cấu trúc chứa con trỏ đến phần tử tiếp theo trong quá trình lặp. Chúng có phương thức `next()` trả về giá trị tiếp theo trong sequence cùng một giá trị boolean cho biết sequence đã `done` hay chưa.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Generator là các hàm đặc biệt được định nghĩa bằng cú pháp `function*` giúp đơn giản hóa việc tạo iterator. Chúng sử dụng từ khóa `yield` để định nghĩa chuỗi giá trị và tự động tạm dừng rồi tiếp tục thực thi khi giá trị được yêu cầu.

Generator giúp tạo iterator dễ dàng hơn và đặc biệt hữu ích khi làm việc với sequence lớn hoặc vô hạn.

Ví dụ:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript cũng hỗ trợ async iterator và async Generator.

Tìm hiểu thêm:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Tham khảo TsDocs JSDoc

Khi làm việc với codebase JavaScript, có thể giúp TypeScript suy luận đúng kiểu bằng cách sử dụng comment JSDoc với annotation bổ sung để cung cấp thông tin kiểu.

Ví dụ:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Tài liệu đầy đủ có tại liên kết này:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Từ phiên bản 3.7, có thể tạo định nghĩa kiểu .d.ts từ cú pháp JavaScript JSDoc.
Bạn có thể tìm thêm thông tin tại đây:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)
