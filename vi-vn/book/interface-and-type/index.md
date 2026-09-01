# Interface và Type



### Cú pháp chung

Trong TypeScript, interface định nghĩa cấu trúc của đối tượng, chỉ định tên và kiểu của các thuộc tính hoặc phương thức mà một đối tượng phải có. Cú pháp thông thường để định nghĩa interface trong TypeScript như sau:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Tương tự với định nghĩa type:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` hoặc `type TypeName`: Định nghĩa tên của interface.
`property1`: `Type1`: Chỉ định các thuộc tính của interface cùng các kiểu tương ứng. Có thể định nghĩa nhiều thuộc tính, mỗi thuộc tính được phân tách bằng dấu chấm phẩy.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Chỉ định các phương thức của interface. Phương thức được định nghĩa bằng tên, tiếp theo là danh sách tham số trong dấu ngoặc đơn và kiểu trả về. Có thể định nghĩa nhiều phương thức, mỗi phương thức được phân tách bằng dấu chấm phẩy.

Ví dụ về interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Ví dụ về type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

Trong TypeScript, type được dùng để định nghĩa hình dạng của dữ liệu và thực thi kiểm tra kiểu. Có một số cú pháp phổ biến để định nghĩa type trong TypeScript tùy theo trường hợp sử dụng cụ thể. Dưới đây là một số ví dụ:

### Kiểu cơ bản

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Đối tượng và Interface

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Union Type và Intersection Type

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

