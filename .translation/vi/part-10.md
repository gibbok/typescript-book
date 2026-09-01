## Conditional Type được định nghĩa sẵn

Trong TypeScript, Predefined Conditional Type là các conditional type tích hợp do ngôn ngữ cung cấp. Chúng được thiết kế để thực hiện các phép biến đổi kiểu phổ biến dựa trên đặc điểm của một kiểu nhất định.

`Exclude<UnionType, ExcludedType>`: Kiểu này loại bỏ khỏi Type tất cả các kiểu có thể gán cho ExcludedType.

`Extract<Type, Union>`: Kiểu này trích xuất từ Union tất cả các kiểu có thể gán cho Type.

`NonNullable<Type>`: Kiểu này loại bỏ null và undefined khỏi Type.

`ReturnType<Type>`: Kiểu này trích xuất kiểu trả về của một hàm Type.

`Parameters<Type>`: Kiểu này trích xuất các kiểu tham số của một hàm Type.

`Required<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành bắt buộc.

`Partial<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành tùy chọn.

`Readonly<Type>`: Kiểu này biến tất cả thuộc tính trong Type thành readonly.

## Template Union Type

Template union type có thể được dùng để kết hợp và thao tác văn bản bên trong hệ thống kiểu, ví dụ:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

## Kiểu any

Kiểu `any` là một kiểu đặc biệt (universal supertype) có thể được dùng để biểu diễn bất kỳ kiểu giá trị nào (primitive, object, array, function, error, symbol). Nó thường được sử dụng trong những tình huống kiểu của một giá trị không được biết tại thời điểm biên dịch hoặc khi làm việc với giá trị từ API hoặc thư viện bên ngoài không có TypeScript typing.

Khi sử dụng kiểu `any`, bạn cho trình biên dịch TypeScript biết rằng các giá trị nên được biểu diễn mà không có bất kỳ giới hạn nào. Để tối đa hóa an toàn kiểu trong mã, hãy cân nhắc:

* Giới hạn việc sử dụng `any` cho các trường hợp cụ thể khi kiểu thực sự chưa biết.
* Không trả về kiểu `any` từ một hàm, vì điều này làm suy yếu an toàn kiểu trong mã sử dụng nó.
* Thay vì `any`, hãy dùng `@ts-ignore` nếu bạn cần làm im trình biên dịch.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

## Kiểu unknown

Trong TypeScript, kiểu `unknown` biểu diễn một giá trị có kiểu chưa biết. Không giống kiểu `any` cho phép bất kỳ kiểu giá trị nào, `unknown` yêu cầu kiểm tra kiểu hoặc assertion trước khi có thể được sử dụng theo một cách cụ thể, vì vậy không có thao tác nào được phép trên `unknown` nếu trước tiên chưa assertion hoặc thu hẹp thành một kiểu cụ thể hơn.

Kiểu `unknown` chỉ có thể gán cho `any` và chính `unknown`, đồng thời là lựa chọn thay thế an toàn kiểu cho `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

## Kiểu void

Kiểu `void` được dùng để chỉ ra rằng một hàm không trả về giá trị.

```typescript
const sayHello = (): void => {
    console.log('Hello!');
};
```

## Kiểu never

Kiểu `never` biểu diễn các giá trị không bao giờ xảy ra. Nó được dùng để biểu thị các hàm hoặc biểu thức không bao giờ trả về hoặc luôn throw lỗi.

Ví dụ, một vòng lặp vô hạn:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Throw một lỗi:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Kiểu `never` hữu ích để bảo đảm an toàn kiểu và phát hiện các lỗi tiềm ẩn trong mã. Nó giúp TypeScript phân tích và suy luận các kiểu chính xác hơn khi được dùng kết hợp với các kiểu khác và câu lệnh luồng điều khiển, ví dụ:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

## Interface và Type

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

## Primitive Type tích hợp

TypeScript có một số primitive type tích hợp có thể được dùng để định nghĩa biến, tham số hàm và kiểu trả về:

* `number`: Biểu diễn các giá trị số, bao gồm số nguyên và số dấu phẩy động.
* `string`: Biểu diễn dữ liệu văn bản
* `boolean`: Biểu diễn các giá trị logic, có thể là true hoặc false.
* `null`: Biểu diễn sự vắng mặt của một giá trị.
* `undefined`: Biểu diễn một giá trị chưa được gán hoặc chưa được định nghĩa.
* `symbol`: Biểu diễn một định danh duy nhất. Symbol thường được dùng làm key cho thuộc tính đối tượng.
* `bigint`: Biểu diễn số nguyên với độ chính xác tùy ý.
* `any`: Biểu diễn một kiểu động hoặc chưa biết. Biến kiểu any có thể chứa giá trị của bất kỳ kiểu nào và bỏ qua kiểm tra kiểu.
* `void`: Biểu diễn sự vắng mặt của bất kỳ kiểu nào. Nó thường được dùng làm kiểu trả về của các hàm không trả về giá trị.
* `never`: Biểu diễn một kiểu cho các giá trị không bao giờ xảy ra. Nó thường được dùng làm kiểu trả về của các hàm throw lỗi hoặc đi vào vòng lặp vô hạn.
