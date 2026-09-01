## Kiểu cấu trúc bị xóa

Trong TypeScript, đối tượng không cần phải khớp với một kiểu cụ thể, chính xác. Ví dụ, nếu chúng ta tạo một đối tượng đáp ứng các yêu cầu của một interface, chúng ta có thể sử dụng đối tượng đó ở những nơi cần interface ấy, ngay cả khi giữa chúng không có liên kết tường minh.
Ví dụ:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

## Namespace

Trong TypeScript, namespace được dùng để tổ chức mã thành các container logic, ngăn xung đột tên và cung cấp cách nhóm các đoạn mã liên quan với nhau.
Việc sử dụng từ khóa `export` cho phép truy cập namespace từ bên ngoài module.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

## Symbol

Symbol là một kiểu dữ liệu nguyên thủy biểu diễn một giá trị bất biến được bảo đảm là duy nhất trên toàn cục trong suốt vòng đời của chương trình.

Symbol có thể được dùng làm key cho thuộc tính đối tượng và cung cấp cách tạo các thuộc tính không enumerable.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

Trong WeakMap và WeakSet, symbol hiện được phép dùng làm key.

## Triple-Slash Directive

Triple-slash directive là các comment đặc biệt cung cấp chỉ dẫn cho trình biên dịch về cách xử lý một tệp. Các directive này bắt đầu bằng ba dấu gạch chéo liên tiếp (`///`), thường được đặt ở đầu tệp TypeScript và không ảnh hưởng đến hành vi thời gian chạy.

Triple-slash directive được dùng để tham chiếu dependency bên ngoài, chỉ định hành vi tải module, bật hoặc tắt một số tính năng của trình biên dịch và nhiều mục đích khác. Một vài ví dụ:

Tham chiếu một tệp khai báo:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Chỉ định định dạng module:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Bật các tùy chọn trình biên dịch, trong ví dụ sau là strict mode:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

## Thao tác kiểu

### Tạo kiểu từ kiểu

Có thể tạo các kiểu mới bằng cách kết hợp, thao tác hoặc biến đổi các kiểu hiện có.

Intersection Type (`&`):

Cho phép bạn kết hợp nhiều kiểu thành một kiểu duy nhất:

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // Intersection of A and B
const obj: C = { foo: 42, bar: 'hello' };
```

Union Type (`|`):

Cho phép bạn định nghĩa một kiểu có thể là một trong nhiều kiểu:

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

Mapped Type:

Cho phép bạn biến đổi các thuộc tính của một kiểu hiện có để tạo kiểu mới:

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // Properties become read-only
```

Conditional type:

Cho phép bạn tạo kiểu dựa trên một số điều kiện:

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### Indexed Access Type

Trong TypeScript, có thể truy cập và thao tác kiểu của các thuộc tính bên trong một kiểu khác bằng index, `Type[Key]`.

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### Utility Type

Có thể dùng một số utility type tích hợp để thao tác kiểu; dưới đây là danh sách các loại được sử dụng phổ biến nhất:

#### Awaited\<T\>

Tạo một kiểu đệ quy unwrap các kiểu Promise.

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

Tạo một kiểu với tất cả thuộc tính của T được đặt thành tùy chọn.

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

Tạo một kiểu với tất cả thuộc tính của T được đặt thành bắt buộc.

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

Tạo một kiểu với tất cả thuộc tính của T được đặt thành readonly.

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // Invalid
```

#### Record\<K, T\>

Tạo một kiểu với một tập hợp thuộc tính K có kiểu T.

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

Tạo một kiểu bằng cách lấy các thuộc tính K đã chỉ định từ T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

Tạo một kiểu bằng cách loại bỏ các thuộc tính K đã chỉ định khỏi T.

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

Tạo một kiểu bằng cách loại trừ tất cả giá trị kiểu U khỏi T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

Tạo một kiểu bằng cách trích xuất tất cả giá trị kiểu U từ T.

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

Tạo một kiểu bằng cách loại trừ null và undefined khỏi T.

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

Trích xuất các kiểu tham số của function type T.

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

Trích xuất các kiểu tham số của constructor function type T.

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

Trích xuất kiểu trả về của function type T.

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

Trích xuất instance type của class type T.

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

Trích xuất kiểu của tham số 'this' từ function type T.

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

Loại bỏ tham số 'this' khỏi function type T.

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase() + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

Đóng vai trò marker cho kiểu `this` theo ngữ cảnh.

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // Valid as "log" is a part of "this".
        this.update(); // Invalid
    },
};
```

#### Uppercase\<T\>

Chuyển tên của input type T thành chữ hoa.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Chuyển tên của input type T thành chữ thường.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Viết hoa chữ cái đầu tên của input type T.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Chuyển chữ cái đầu tên của input type T thành chữ thường.

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer là một utility type được thiết kế để chặn việc tự động suy luận kiểu trong phạm vi của một hàm generic.

Ví dụ:

```typescript
// Automatic inference of types within the scope of a generic function.
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // Type here is ("a" | "b" | "c")[]
```

Với NoInfer:

<!-- skip -->
```typescript
// Example function that uses NoInfer to prevent type inference
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
    return x.concat(y);
}

const r2 = fn2(['a', 'b'], 'c'); // Error: Type Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.
```
