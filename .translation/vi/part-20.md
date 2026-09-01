### Kiểu đệ quy

Recursive Type là một kiểu có thể tham chiếu đến chính nó. Điều này hữu ích để định nghĩa các cấu trúc dữ liệu có cấu trúc phân cấp hoặc đệ quy (có khả năng lồng vô hạn), chẳng hạn linked list, tree và graph.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Recursive Conditional Type

Có thể định nghĩa các quan hệ kiểu phức tạp bằng logic và đệ quy trong TypeScript.
Hãy phân tích theo cách đơn giản:

Conditional Type cho phép bạn định nghĩa kiểu dựa trên điều kiện boolean:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Đệ quy nghĩa là một định nghĩa kiểu tham chiếu đến chính nó trong định nghĩa của mình:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Recursive Conditional Type kết hợp cả logic điều kiện và đệ quy. Điều này có nghĩa một định nghĩa kiểu có thể phụ thuộc vào chính nó thông qua logic điều kiện, tạo ra các quan hệ kiểu phức tạp và linh hoạt.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Hỗ trợ ECMAScript Module trong Node

Node.js bổ sung hỗ trợ ECMAScript Module bắt đầu từ phiên bản 15.3.0 và TypeScript đã hỗ trợ ECMAScript Module cho Node.js kể từ phiên bản 4.7. Có thể bật hỗ trợ này bằng cách sử dụng thuộc tính `module` với giá trị `nodenext` trong tệp tsconfig.json. Dưới đây là một ví dụ:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js hỗ trợ hai phần mở rộng tệp cho module: `.mjs` cho ES module và `.cjs` cho CommonJS module. Các phần mở rộng tệp tương ứng trong TypeScript là `.mts` cho ES module và `.cts` cho CommonJS module. Khi trình biên dịch TypeScript chuyển dịch các tệp này sang JavaScript, nó sẽ tạo các tệp `.mjs` và `.cjs`.

Nếu muốn sử dụng ES module trong dự án, bạn có thể đặt thuộc tính `type` thành "module" trong tệp package.json. Điều này yêu cầu Node.js xử lý dự án như một dự án ES module.

Ngoài ra, TypeScript cũng hỗ trợ khai báo kiểu trong các tệp .d.ts. Các tệp khai báo này cung cấp thông tin kiểu cho thư viện hoặc module viết bằng TypeScript, cho phép các lập trình viên khác sử dụng chúng với tính năng kiểm tra kiểu và tự động hoàn thành của TypeScript.

### Assertion Function

Trong TypeScript, assertion function là các hàm biểu thị việc xác minh một điều kiện cụ thể dựa trên giá trị trả về của chúng. Ở dạng đơn giản nhất, một hàm assert kiểm tra predicate được cung cấp và phát sinh lỗi khi predicate được đánh giá là false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Hoặc có thể được khai báo như một function expression:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Assertion function có điểm tương đồng với type guard. Type guard ban đầu được giới thiệu để thực hiện kiểm tra thời gian chạy và bảo đảm kiểu của một giá trị trong một phạm vi cụ thể.
Cụ thể, type guard là một hàm đánh giá type predicate và trả về giá trị boolean cho biết predicate là true hay false. Điều này hơi khác assertion function, trong đó mục đích là throw lỗi thay vì trả về false khi predicate không được thỏa mãn.

Ví dụ về type guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Variadic Tuple Type

Variadic Tuple Type là một tính năng được giới thiệu trong TypeScript phiên bản 4.0, vì vậy trước tiên hãy nhắc lại tuple là gì:

Tuple type là một mảng có độ dài được định nghĩa và kiểu của từng phần tử đã biết:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Thuật ngữ "variadic" có nghĩa là arity không xác định (chấp nhận số lượng đối số thay đổi).

Variadic tuple là một tuple type có tất cả thuộc tính như trước nhưng hình dạng chính xác chưa được định nghĩa:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Trong đoạn mã trước, chúng ta có thể thấy hình dạng tuple được định nghĩa bởi generic `T` được truyền vào.

Variadic tuple có thể chấp nhận nhiều generic, giúp chúng rất linh hoạt:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Với variadic tuple mới, chúng ta có thể sử dụng:

* Spread trong cú pháp tuple type giờ có thể là generic, nhờ đó chúng ta có thể biểu diễn các thao tác higher-order trên tuple và array ngay cả khi chưa biết các kiểu thực tế đang thao tác.
* Rest element có thể xuất hiện ở bất kỳ đâu trong tuple.

Ví dụ:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Boxed type

Boxed type nói đến các wrapper object được dùng để biểu diễn primitive type dưới dạng object. Các wrapper object này cung cấp chức năng và phương thức bổ sung không có trực tiếp trên các giá trị primitive.

Khi bạn truy cập một phương thức như `charAt` hoặc `normalize` trên primitive `string`, JavaScript bọc nó trong một đối tượng `String`, gọi phương thức rồi loại bỏ đối tượng.

Minh họa:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript biểu diễn sự khác biệt này bằng cách cung cấp các kiểu riêng cho primitive và object wrapper tương ứng:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Boxed type thường không cần thiết. Tránh sử dụng boxed type và thay vào đó sử dụng primitive type, chẳng hạn `string` thay vì `String`.
