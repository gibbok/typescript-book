## Kiểu đối tượng

Trong TypeScript, kiểu đối tượng mô tả hình dạng của một đối tượng. Chúng chỉ định tên và kiểu của các thuộc tính của đối tượng, cũng như các thuộc tính đó là bắt buộc hay tùy chọn.

Trong TypeScript, bạn có thể định nghĩa kiểu đối tượng theo hai cách chính:

Interface định nghĩa hình dạng của một đối tượng bằng cách chỉ định tên, kiểu và tính tùy chọn của các thuộc tính.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Type alias, tương tự interface, định nghĩa hình dạng của một đối tượng. Tuy nhiên, nó cũng có thể tạo một kiểu tùy chỉnh mới dựa trên kiểu hiện có hoặc kết hợp các kiểu hiện có. Điều này bao gồm việc định nghĩa union type, intersection type và các kiểu phức tạp khác.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Cũng có thể định nghĩa một kiểu ẩn danh:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

## Tuple Type (ẩn danh)

Tuple Type là kiểu biểu diễn một mảng có số lượng phần tử cố định và các kiểu tương ứng của chúng. Tuple type bắt buộc một số lượng phần tử cụ thể và kiểu tương ứng của từng phần tử theo thứ tự cố định. Tuple type hữu ích khi bạn muốn biểu diễn một tập hợp các giá trị có kiểu cụ thể, trong đó vị trí của mỗi phần tử trong mảng có ý nghĩa riêng.

```typescript
type Point = [number, number];
```

## Named Tuple Type (có nhãn)

Tuple type có thể bao gồm nhãn hoặc tên tùy chọn cho từng phần tử. Các nhãn này phục vụ khả năng đọc và hỗ trợ công cụ, không ảnh hưởng đến các thao tác bạn có thể thực hiện với chúng.

```typescript
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b: T];
type Tuple3 = [a: T, T]; // Named Tuple plus Anonymous Tuple
```

## Tuple có độ dài cố định

Fixed Length Tuple là một kiểu tuple cụ thể bắt buộc số lượng phần tử cố định với các kiểu cụ thể và không cho phép thay đổi độ dài của tuple sau khi được định nghĩa.

Fixed Length Tuple hữu ích khi bạn cần biểu diễn một tập hợp giá trị với số lượng phần tử và kiểu cụ thể, đồng thời muốn bảo đảm độ dài và kiểu của tuple không bị thay đổi ngoài ý muốn.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

## Union Type

Union Type là kiểu biểu diễn một giá trị có thể thuộc một trong nhiều kiểu. Union Type được biểu diễn bằng ký hiệu `|` giữa mỗi kiểu có thể có.

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

## Intersection Type

Intersection Type là kiểu biểu diễn một giá trị có tất cả thuộc tính của hai hoặc nhiều kiểu. Intersection Type được biểu diễn bằng ký hiệu `&` giữa mỗi kiểu.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

## Type Indexing

Type indexing nói đến khả năng định nghĩa các kiểu có thể được index bằng một key chưa biết trước, sử dụng index signature để chỉ định kiểu cho các thuộc tính không được khai báo tường minh.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

## Kiểu từ giá trị

Type from Value trong TypeScript nói đến việc tự động suy luận kiểu từ một giá trị hoặc biểu thức thông qua type inference.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

## Kiểu từ giá trị trả về của hàm

Type from Func Return nói đến khả năng tự động suy luận kiểu trả về của một hàm dựa trên phần triển khai. Điều này cho phép TypeScript xác định kiểu của giá trị được hàm trả về mà không cần chú thích kiểu tường minh.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

## Kiểu từ module

Type from Module nói đến khả năng sử dụng các giá trị được export của một module để tự động suy luận kiểu của chúng. Khi một module export một giá trị có kiểu cụ thể, TypeScript có thể dùng thông tin đó để tự động suy luận kiểu của giá trị khi nó được import vào module khác.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

## Mapped Type

Mapped Type trong TypeScript cho phép bạn tạo kiểu mới dựa trên một kiểu hiện có bằng cách biến đổi từng thuộc tính thông qua một hàm ánh xạ. Bằng cách ánh xạ các kiểu hiện có, bạn có thể tạo các kiểu mới biểu diễn cùng thông tin ở định dạng khác. Để tạo mapped type, bạn truy cập các thuộc tính của một kiểu hiện có bằng toán tử `keyof` rồi thay đổi chúng để tạo ra kiểu mới.
Trong ví dụ sau:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

chúng ta định nghĩa MyMappedType để ánh xạ qua các thuộc tính của T, tạo một kiểu mới trong đó mỗi thuộc tính là một mảng của kiểu ban đầu. Sử dụng nó, chúng ta tạo MyNewType để biểu diễn cùng thông tin như MyType nhưng mỗi thuộc tính là một mảng.

## Modifier của Mapped Type

Mapped Type Modifier trong TypeScript cho phép biến đổi các thuộc tính trong một kiểu hiện có:

* `readonly` hoặc `+readonly`: Làm cho một thuộc tính trong mapped type chỉ đọc.
* `-readonly`: Cho phép một thuộc tính trong mapped type có thể thay đổi.
* `?`: Đánh dấu một thuộc tính trong mapped type là tùy chọn.

Ví dụ:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

## Conditional Type

Conditional Type là cách tạo một kiểu phụ thuộc vào một điều kiện, trong đó kiểu được tạo ra được xác định dựa trên kết quả của điều kiện. Chúng được định nghĩa bằng từ khóa `extends` và toán tử ba ngôi để chọn có điều kiện giữa hai kiểu.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

## Distributive Conditional Type

Distributive Conditional Type là một tính năng cho phép một kiểu được phân phối trên một union các kiểu bằng cách áp dụng một phép biến đổi riêng cho từng thành viên của union.
Điều này có thể đặc biệt hữu ích khi làm việc với mapped type hoặc higher-order type.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

## Suy luận kiểu infer trong Conditional Type

Từ khóa `infer` được sử dụng trong conditional type để suy luận (trích xuất) kiểu của một tham số generic từ một kiểu phụ thuộc vào nó. Điều này cho phép bạn viết các định nghĩa kiểu linh hoạt và có thể tái sử dụng hơn.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```
