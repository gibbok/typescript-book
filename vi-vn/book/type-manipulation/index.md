# Thao tác kiểu



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

Tạo một kiểu gỡ bọc đệ quy các kiểu Promise.

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

Chuyển tên của kiểu đầu vào T thành chữ hoa.

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

Chuyển tên của kiểu đầu vào T thành chữ thường.

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

Viết hoa chữ cái đầu trong tên của kiểu đầu vào T.

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

Chuyển chữ cái đầu trong tên của kiểu đầu vào T thành chữ thường.

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

