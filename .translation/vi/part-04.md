## Khám phá hệ thống kiểu

### Dịch vụ ngôn ngữ TypeScript

Dịch vụ ngôn ngữ TypeScript, còn được gọi là tsserver, cung cấp nhiều tính năng như báo lỗi, chẩn đoán, biên dịch khi lưu, đổi tên, đi đến định nghĩa, danh sách gợi ý hoàn thành, hỗ trợ chữ ký và nhiều tính năng khác. Dịch vụ này chủ yếu được các môi trường phát triển tích hợp (IDE) sử dụng để cung cấp hỗ trợ IntelliSense. Nó tích hợp liền mạch với Visual Studio Code và được các công cụ như Conquer of Completion (Coc) sử dụng.

Lập trình viên có thể tận dụng một API chuyên dụng và tạo các plugin dịch vụ ngôn ngữ tùy chỉnh của riêng mình để cải thiện trải nghiệm chỉnh sửa TypeScript. Điều này có thể đặc biệt hữu ích để triển khai các tính năng lint đặc thù hoặc bật tự động hoàn thành cho một ngôn ngữ template tùy chỉnh.

<!-- markdownlint-disable MD044 -->
Một ví dụ thực tế về plugin tùy chỉnh là "typescript-styled-plugin", cung cấp khả năng báo lỗi cú pháp và hỗ trợ IntelliSense cho các thuộc tính CSS trong styled components.
<!-- markdownlint-enable MD044 -->

Để biết thêm thông tin và xem các hướng dẫn bắt đầu nhanh, bạn có thể tham khảo TypeScript Wiki chính thức trên GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Kiểu cấu trúc

TypeScript dựa trên hệ thống kiểu cấu trúc. Điều này có nghĩa là tính tương thích và tương đương của các kiểu được xác định bởi cấu trúc hoặc định nghĩa thực tế của kiểu, thay vì tên hoặc nơi khai báo của nó như trong các hệ thống kiểu định danh như C# hoặc C.

Hệ thống kiểu cấu trúc của TypeScript được thiết kế dựa trên cách hệ thống duck typing động của JavaScript hoạt động tại thời gian chạy.

Ví dụ sau là mã TypeScript hợp lệ. Như bạn có thể thấy, "X" và "Y" có cùng thành viên "a", mặc dù chúng có tên khai báo khác nhau. Các kiểu được xác định bởi cấu trúc của chúng và trong trường hợp này, vì các cấu trúc giống nhau nên chúng tương thích và hợp lệ.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Các quy tắc so sánh cơ bản của TypeScript

Quá trình so sánh của TypeScript có tính đệ quy và được thực hiện trên các kiểu lồng nhau ở bất kỳ cấp độ nào.

Một kiểu "X" tương thích với "Y" nếu "Y" có ít nhất các thành viên giống như "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Các tham số hàm được so sánh theo kiểu, không theo tên:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Kiểu trả về của hàm phải giống nhau:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Kiểu trả về của hàm nguồn phải là kiểu con của kiểu trả về của hàm đích:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Việc bỏ qua tham số hàm được cho phép vì đây là cách làm phổ biến trong JavaScript, chẳng hạn khi sử dụng "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Do đó, các khai báo kiểu sau hoàn toàn hợp lệ:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Mọi tham số tùy chọn bổ sung của kiểu nguồn đều hợp lệ:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Mọi tham số tùy chọn của kiểu đích không có tham số tương ứng trong kiểu nguồn đều hợp lệ và không phải là lỗi:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Rest parameter được coi như một chuỗi vô hạn các tham số tùy chọn:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Các hàm có overload hợp lệ nếu chữ ký overload tương thích với chữ ký triển khai:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Việc so sánh tham số hàm thành công nếu các tham số nguồn và đích có thể gán cho kiểu cha hoặc kiểu con (bivariance).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Enum có thể so sánh và tương thích với số và ngược lại, nhưng việc so sánh các giá trị Enum từ các kiểu Enum khác nhau là không hợp lệ.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Các instance của một class phải trải qua kiểm tra tương thích đối với các thành viên private và protected của chúng:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

Kiểm tra so sánh không xét đến các cây phân cấp kế thừa khác nhau, ví dụ:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Generic được so sánh bằng cấu trúc dựa trên kiểu kết quả sau khi áp dụng tham số generic; chỉ kết quả cuối cùng được so sánh như một kiểu không generic.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Khi generic không chỉ định type argument, tất cả argument chưa được chỉ định được xem là kiểu "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Hãy nhớ:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Lưu ý rằng khi "strictNullChecks" được bật, "null" và "undefined" được xử lý tương tự "void"; nếu không, chúng tương tự "never".

### Kiểu dưới dạng tập hợp

Trong TypeScript, một kiểu là một tập hợp các giá trị có thể có. Tập hợp này còn được gọi là miền của kiểu. Mỗi giá trị của một kiểu có thể được xem là một phần tử trong tập hợp. Một kiểu thiết lập các ràng buộc mà mọi phần tử trong tập hợp phải thỏa mãn để được coi là thành viên của tập hợp đó.
Nhiệm vụ chính của TypeScript là kiểm tra và xác minh xem một tập hợp có phải là tập con của tập hợp khác hay không.

TypeScript hỗ trợ nhiều loại tập hợp:

| Thuật ngữ tập hợp   | TypeScript                      | Ghi chú                                                                                                              |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Tập rỗng            | never                           | "never" chứa mọi thứ ngoài chính nó                                                                                  |
| Tập một phần tử     | undefined / null / literal type |                                                                                                                      |
| Tập hữu hạn         | boolean / union                 |                                                                                                                      |
| Tập vô hạn          | string / number / object        |                                                                                                                      |
| Tập phổ quát        | any / unknown                   | Mọi phần tử là thành viên của "any" và mọi tập hợp là tập con của nó / "unknown" là đối ứng an toàn kiểu của "any" |

Dưới đây là một vài ví dụ:

| TypeScript            | Thuật ngữ tập hợp       | Ví dụ                                                                           |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (tập rỗng)            | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                         |
| Literal type          | Tập một phần tử         | type X = 'X';                                                                   |
|                       |                         | type Y = 7;                                                                     |
|                       |                         |
| Value assignable to T | Giá trị ∈ T (thành viên)| type XY = 'X' \| 'Y';                                                           |
|                       |                         | const x: XY = 'X';                                                              |
|                       |                         |
| T1 assignable to T2   | T1 ⊆ T2 (tập con của)   | type XY = 'X' \| 'Y';                                                           |
|                       |                         | const x: XY = 'X';                                                              |
|                       |                         | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                         |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (tập con của)   | type X = 'X' extends string ? true : false;                                     |
|                       |                         |
| T1 \| T2              | T1 ∪ T2 (hợp)           | type XY = 'X' \| 'Y';                                                           |
|                       |                         | type JK = 1 \| 2;                                                               |
|                       |                         |
| T1 & T2               | T1 ∩ T2 (giao)          | type X = \{ a: string \}                                                         |
|                       |                         | type Y = \{ b: string \}                                                         |
|                       |                         | type XY = X & Y                                                                 |
|                       |                         | const x: XY = \{ a: 'a', b: 'b' \}                                               |
|                       |                         |
| unknown               | Tập phổ quát            | const x: unknown = 1                                                            |

Một union, (T1 | T2), tạo ra một tập hợp rộng hơn (cả hai):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Một intersection, (T1 & T2), tạo ra một tập hợp hẹp hơn (chỉ phần chung):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

Trong ngữ cảnh này, từ khóa `extends` có thể được xem là "tập con của". Nó đặt một ràng buộc cho một kiểu. Khi `extends` được sử dụng với generic, nó giới hạn tham số kiểu generic thành một kiểu cụ thể hơn.

Lưu ý rằng `extends` ở đây không liên quan đến kế thừa class theo nghĩa OOP.

TypeScript làm việc với các kiểu cấu trúc và không có một hệ phân cấp định danh nghiêm ngặt. Thực tế, như trong ví dụ dưới đây, hai kiểu có thể chồng lấp mà không kiểu nào là kiểu con của kiểu kia, vì TypeScript xem xét cấu trúc, hay hình dạng, của đối tượng.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```
