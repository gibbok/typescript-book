# Generic



Generic cho phép bạn tạo các component và hàm có thể tái sử dụng, hoạt động với nhiều kiểu. Với generic, bạn có thể tham số hóa kiểu, hàm và interface, cho phép chúng hoạt động trên các kiểu khác nhau mà không cần chỉ định tường minh từ trước.

Generic cho phép bạn làm cho mã linh hoạt và có thể tái sử dụng hơn.

### Generic Type

Để định nghĩa generic type, bạn sử dụng dấu ngoặc nhọn (`<>`) để chỉ định các tham số kiểu, ví dụ:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generic Class

Generic cũng có thể được áp dụng cho class; theo cách này, class có thể làm việc với nhiều kiểu bằng cách sử dụng tham số kiểu. Điều này hữu ích để tạo các định nghĩa class có thể tái sử dụng, hoạt động trên các kiểu dữ liệu khác nhau trong khi vẫn duy trì an toàn kiểu.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Ràng buộc Generic

Các tham số generic có thể được giới hạn bằng từ khóa `extends` theo sau bởi một type hoặc interface mà tham số kiểu phải thỏa mãn.

Trong ví dụ sau, `T` phải có thuộc tính `length` được định kiểu đúng để hợp lệ:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

Một tính năng generic đáng chú ý được giới thiệu trong phiên bản 3.4 RC là suy luận kiểu cho higher-order function, giúp lan truyền các generic type argument:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Chức năng này giúp việc lập trình theo phong cách pointfree an toàn kiểu trở nên dễ dàng hơn, một phong cách phổ biến trong lập trình hàm.

### Thu hẹp theo ngữ cảnh cho Generic

Contextual narrowing cho generic là cơ chế trong TypeScript cho phép trình biên dịch thu hẹp kiểu của một tham số generic dựa trên ngữ cảnh mà nó được sử dụng. Điều này hữu ích khi làm việc với generic type trong các câu lệnh điều kiện:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

