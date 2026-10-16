---
title: Khám phá hệ thống kiểu
sidebar:
  order: 10
  label: 10. Khám phá hệ thống kiểu
---


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
const y: Y = x; // Hợp lệ
```

### Các quy tắc so sánh cơ bản của TypeScript

Quá trình so sánh của TypeScript có tính đệ quy và được thực hiện trên các kiểu lồng nhau ở bất kỳ cấp độ nào.

Một kiểu "X" tương thích với "Y" nếu "Y" có ít nhất các thành viên giống như "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Hợp lệ, vì có ít nhất các thành viên giống X
const r: X = y;
```

Các tham số hàm được so sánh theo kiểu, không theo tên:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Hợp lệ
x = y; // Hợp lệ
```

Kiểu trả về của hàm phải giống nhau:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Không hợp lệ
x = y; // Không hợp lệ
```

Kiểu trả về của hàm nguồn phải là kiểu con của kiểu trả về của hàm đích:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Hợp lệ
y = x; // Không hợp lệ, thiếu thành viên b
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
let y: Y = (a: number) => undefined; // Thiếu tham số b
y = x; // Hợp lệ
```

Mọi tham số tùy chọn bổ sung của kiểu nguồn đều hợp lệ:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Hợp lệ
x = y; //Hợp lệ
```

Mọi tham số tùy chọn của kiểu đích không có tham số tương ứng trong kiểu nguồn đều hợp lệ và không phải là lỗi:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Hợp lệ
x = y; // Hợp lệ
```

Rest parameter được coi như một chuỗi vô hạn các tham số tùy chọn:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //hợp lệ
```

Các hàm có overload hợp lệ nếu chữ ký overload tương thích với chữ ký triển khai:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Hợp lệ
x('a', 1); // Hợp lệ

function y(a: string): void; // Không hợp lệ, không tương thích với chữ ký triển khai
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Việc so sánh tham số hàm thành công nếu các tham số nguồn và đích có thể gán cho kiểu cha hoặc kiểu con (bivariance).

```typescript
// Kiểu cha
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Kiểu con
class Y extends X {}
// Kiểu con
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Tính song biến chấp nhận các kiểu cha
console.log(getA(new X('x'))); // Hợp lệ
console.log(getA(new Y('Y'))); // Hợp lệ
console.log(getA(new Z('z'))); // Hợp lệ
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
const xa: number = X.A; // Hợp lệ
const ya: Y = 0; // Hợp lệ
X.A === Y.A; // Không hợp lệ
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

let x: X = new Y('y'); // Không hợp lệ
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
x === y; // Hợp lệ
x === z; // Hợp lệ dù z thuộc một hệ thống phân cấp kế thừa khác
```

Generic được so sánh bằng cấu trúc dựa trên kiểu kết quả sau khi áp dụng tham số generic; chỉ kết quả cuối cùng được so sánh như một kiểu không generic.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Không hợp lệ vì đối số kiểu được dùng trong cấu trúc cuối cùng
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Hợp lệ vì đối số kiểu không được dùng trong cấu trúc cuối cùng
```

Khi generic không chỉ định type argument, tất cả argument chưa được chỉ định được xem là kiểu "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Hợp lệ
```

Hãy nhớ:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Hợp lệ, mọi kiểu đều có thể gán cho chính nó

let c: any;
c = 1; // Hợp lệ, mọi kiểu đều có thể gán cho any

let d: unknown;
d = 1; // Hợp lệ, mọi kiểu đều có thể gán cho unknown

let e: unknown;
let e1: unknown = e; // Hợp lệ, unknown chỉ có thể gán cho chính nó và any
let e2: any = e; // Hợp lệ
let e3: number = e; // Không hợp lệ

let f: never;
f = 1; // Không hợp lệ, không có gì có thể gán cho never

let g: void;
let g1: any;
g = 1; // Không hợp lệ, void không thể gán cho hoặc nhận giá trị từ bất cứ kiểu nào ngoại trừ any
g = g1; // Hợp lệ
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
const r: XY = { a: 'a', b: 'x' }; // Hợp lệ
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
const r: XY = { a: 'a' }; // Không hợp lệ
const j: XY = { a: 'a', b: 'b' }; // Hợp lệ
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

const r: Z1 = z; // Hợp lệ
```

### Gán kiểu: Khai báo kiểu và Type Assertion

Một kiểu có thể được gán theo nhiều cách khác nhau trong TypeScript:

#### Khai báo kiểu

Trong ví dụ sau, chúng ta sử dụng x: X (": Type") để khai báo kiểu cho biến x.

```typescript
type X = {
    a: string;
};

// Khai báo kiểu
const x: X = {
    a: 'a',
};
```

Nếu biến không có định dạng đã chỉ định, TypeScript sẽ báo lỗi. Ví dụ:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Lỗi: Đối tượng literal chỉ được chỉ định các thuộc tính đã biết
};
```

#### Type Assertion

Có thể thêm một assertion bằng từ khóa `as`. Điều này cho trình biên dịch biết rằng lập trình viên có nhiều thông tin hơn về một kiểu và bỏ qua mọi lỗi có thể xảy ra.

Ví dụ:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Trong ví dụ trên, đối tượng x được xác nhận là có kiểu X bằng từ khóa as. Điều này cho trình biên dịch TypeScript biết rằng đối tượng tuân theo kiểu đã chỉ định, mặc dù nó có thêm thuộc tính b không có trong định nghĩa kiểu.

Type assertion hữu ích trong những tình huống cần chỉ định một kiểu cụ thể hơn, đặc biệt khi làm việc với DOM. Ví dụ:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Ở đây, type assertion as HTMLInputElement được sử dụng để cho TypeScript biết kết quả của getElementById nên được xem như một HTMLInputElement.
Type assertion cũng có thể được dùng để ánh xạ lại các key, như trong ví dụ dưới đây với template literal:

```typescript
type J<Type> = {
    [
        Property in keyof Type as `prefix_${string & Property}`
    ]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

Trong ví dụ này, kiểu `J<Type>` sử dụng mapped type với template literal để ánh xạ lại các key của `Type`. Nó tạo các thuộc tính mới với "prefix_" được thêm vào mỗi key và các giá trị tương ứng là các hàm trả về giá trị thuộc tính ban đầu.

Cần lưu ý rằng khi sử dụng type assertion, TypeScript sẽ không thực hiện excess property checking. Vì vậy, nói chung nên sử dụng Khai báo kiểu khi cấu trúc của đối tượng đã được biết trước.

#### Khai báo ambient

Khai báo ambient là các tệp mô tả kiểu cho mã JavaScript, chúng có định dạng tên tệp là `.d.ts`. Chúng thường được import và dùng để chú thích các thư viện JavaScript hiện có hoặc thêm kiểu vào các tệp JS hiện có trong dự án của bạn.

Có thể tìm thấy kiểu cho nhiều thư viện phổ biến tại:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

và có thể cài đặt bằng:

```shell
npm install --save-dev @types/library-name
```

Với các Khai báo ambient do bạn định nghĩa, bạn có thể import bằng tham chiếu "triple-slash":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Bạn có thể sử dụng Khai báo ambient ngay cả trong các tệp JavaScript bằng `// @ts-check`.

Từ khóa `declare` cho phép định nghĩa kiểu cho mã JavaScript hiện có mà không cần import nó, đóng vai trò như placeholder cho các kiểu từ tệp khác hoặc từ phạm vi global.

### Kiểm tra thuộc tính và kiểm tra thuộc tính dư thừa

TypeScript dựa trên hệ thống kiểu cấu trúc nhưng excess property checking là một đặc tính của TypeScript cho phép kiểm tra liệu một đối tượng có đúng các thuộc tính được chỉ định trong kiểu hay không.

Excess Property Checking được thực hiện khi gán object literal cho biến hoặc khi truyền chúng làm đối số cho tham số của hàm, chẳng hạn.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Hợp lệ nhờ hệ thống kiểu cấu trúc
const w: X = { a: 'a', b: 'b' }; // Không hợp lệ do kiểm tra thuộc tính dư thừa
```

### Kiểu yếu

Một kiểu được coi là yếu khi nó không chứa gì ngoài một tập hợp toàn các thuộc tính tùy chọn:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript coi việc gán bất kỳ thứ gì vào một kiểu yếu là lỗi khi không có phần chồng lấp; ví dụ, đoạn sau gây lỗi:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Không hợp lệ
```

Mặc dù không được khuyến nghị, nếu cần, có thể bỏ qua kiểm tra này bằng type assertion:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Hợp lệ
```

Hoặc bằng cách thêm `unknown` vào index signature của kiểu yếu:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Hợp lệ
```

### Kiểm tra nghiêm ngặt object literal (Freshness)

Kiểm tra nghiêm ngặt object literal, đôi khi được gọi là "freshness", là một tính năng trong TypeScript giúp phát hiện các thuộc tính dư thừa hoặc viết sai chính tả mà nếu không sẽ không bị nhận ra trong các kiểm tra kiểu cấu trúc thông thường.

Khi tạo một object literal, trình biên dịch TypeScript xem nó là "fresh". Nếu object literal được gán cho một biến hoặc truyền làm tham số, TypeScript sẽ báo lỗi nếu object literal chỉ định các thuộc tính không tồn tại trong kiểu đích.

Tuy nhiên, "freshness" biến mất khi object literal được widening hoặc khi sử dụng type assertion.

Dưới đây là một số ví dụ minh họa:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Kiểm tra freshness: Phép gán không hợp lệ
var y: Y;
y = { a: 'a', bx: 'bx' }; // Kiểm tra freshness: Phép gán không hợp lệ

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Mở rộng kiểu: Không có lỗi, kiểu tương thích về cấu trúc

fn({ a: 'a', bx: 'b' }); // Kiểm tra freshness: Đối số không hợp lệ

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Mở rộng kiểu: Không kiểm tra freshness
```

### Suy luận kiểu

TypeScript có thể suy luận kiểu khi không có chú thích được cung cấp trong:

* Khởi tạo biến.
* Khởi tạo thành viên.
* Đặt giá trị mặc định cho tham số.
* Kiểu trả về của hàm.

Ví dụ:

```typescript
let x = 'x'; // Kiểu được suy luận là string
```

Trình biên dịch TypeScript phân tích giá trị hoặc biểu thức và xác định kiểu của nó dựa trên thông tin có sẵn.

### Suy luận nâng cao hơn

Khi nhiều biểu thức được sử dụng trong suy luận kiểu, TypeScript tìm kiếm "kiểu chung tốt nhất". Ví dụ:

```typescript
let x = [1, 'x', 1, null]; // Kiểu được suy luận là: (string | number | null)[]
```

Nếu trình biên dịch không thể tìm thấy kiểu chung tốt nhất, nó trả về một union type. Ví dụ:

```typescript
let x = [new RegExp('x'), new Date()]; // Kiểu được suy luận là: (RegExp | Date)[]
```

TypeScript sử dụng "contextual typing" dựa trên vị trí của biến để suy luận kiểu. Trong ví dụ sau, trình biên dịch biết rằng `e` có kiểu `MouseEvent` nhờ kiểu sự kiện `click` được định nghĩa trong tệp lib.d.ts, chứa các khai báo ambient cho nhiều cấu trúc JavaScript phổ biến và DOM:

```typescript
window.addEventListener('click', function (e) {}); // Kiểu được suy luận của e là MouseEvent
```

### Type Widening

Type widening là quá trình TypeScript gán một kiểu cho biến được khởi tạo mà không có chú thích kiểu. Nó cho phép chuyển từ kiểu hẹp sang kiểu rộng hơn nhưng không theo chiều ngược lại.
Trong ví dụ sau:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript suy luận thành string, một kiểu rộng
let y: 'y' | 'x' = 'y'; // kiểu của y là union của các kiểu literal
y = x; // Không hợp lệ, kiểu 'string' không thể gán cho kiểu '"x" | "y"'.
```

TypeScript gán `string` cho `x` dựa trên giá trị duy nhất được cung cấp khi khởi tạo (`x`); đây là một ví dụ về widening.

TypeScript cung cấp các cách để kiểm soát quá trình widening, chẳng hạn sử dụng "const".

### Const

Sử dụng từ khóa `const` khi khai báo biến dẫn đến suy luận kiểu hẹp hơn trong TypeScript.

Ví dụ:

```typescript
const x = 'x'; // TypeScript suy luận kiểu của x là 'x', một kiểu hẹp hơn
let y: 'y' | 'x' = 'y';
y = x; // Hợp lệ: Kiểu của x được suy luận là 'x'
```

Bằng cách dùng `const` để khai báo biến x, kiểu của nó được thu hẹp thành giá trị literal cụ thể 'x'. Vì kiểu của x được thu hẹp, nó có thể được gán cho biến y mà không có lỗi.
Lý do kiểu có thể được suy luận như vậy là vì biến `const` không thể được gán lại, nên kiểu của nó có thể được thu hẹp xuống một literal type cụ thể, trong trường hợp này là literal type 'x'.

#### Modifier Const trên tham số kiểu

Từ TypeScript phiên bản 5.0, có thể chỉ định thuộc tính `const` trên một tham số kiểu generic. Điều này cho phép suy luận kiểu chính xác nhất có thể. Hãy xem một ví dụ không sử dụng `const`:

```typescript
function identity<T>(value: T) {
    // Không có const ở đây
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Kiểu được suy luận là: { a: string; b: string; }
```

Như bạn có thể thấy, các thuộc tính `a` và `b` được suy luận có kiểu `string`.

Bây giờ, hãy xem sự khác biệt với phiên bản `const`:

```typescript
function identity<const T>(value: T) {
    // Dùng từ khóa bổ nghĩa const trên tham số kiểu
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Kiểu được suy luận là: { a: "a"; b: "b"; }
```

Bây giờ chúng ta có thể thấy các thuộc tính `a` và `b` được suy luận là các string literal thay vì chỉ là kiểu `string`.

#### Const assertion

Tính năng này cho phép bạn khai báo một biến với literal type chính xác hơn dựa trên giá trị khởi tạo của nó, cho trình biên dịch biết rằng giá trị nên được xem như một literal bất biến. Dưới đây là một vài ví dụ:

Trên một thuộc tính:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Trên toàn bộ đối tượng:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Điều này có thể đặc biệt hữu ích khi định nghĩa kiểu cho tuple:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple readonly [1, 2, 3]
```

### Chú thích kiểu tường minh

Chúng ta có thể chỉ định cụ thể và truyền một kiểu. Trong ví dụ sau, thuộc tính `x` có kiểu `number`:

```typescript
const v = {
    x: 1, // Kiểu được suy luận: number (mở rộng kiểu)
};
v.x = 3; // Hợp lệ
```

Chúng ta có thể làm cho chú thích kiểu cụ thể hơn bằng cách sử dụng một union của các literal type:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x hiện là union của các kiểu literal: 1 | 2 | 3
};
v.x = 3; // Hợp lệ
v.x = 100; // Không hợp lệ
```

### Thu hẹp kiểu

Type Narrowing là quá trình trong TypeScript mà một kiểu tổng quát được thu hẹp xuống một kiểu cụ thể hơn. Điều này xảy ra khi TypeScript phân tích mã và xác định rằng một số điều kiện hoặc thao tác có thể tinh chỉnh thông tin kiểu.

Việc thu hẹp kiểu có thể xảy ra theo nhiều cách, bao gồm:

#### Điều kiện

Bằng cách sử dụng các câu lệnh điều kiện như `if` hoặc `switch`, TypeScript có thể thu hẹp kiểu dựa trên kết quả của điều kiện. Ví dụ:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // Kiểu là number, đã được thu hẹp bởi điều kiện
}
```

#### Throw hoặc return

Việc throw một lỗi hoặc return sớm khỏi một nhánh có thể được dùng để giúp TypeScript thu hẹp kiểu. Ví dụ:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Các cách khác để thu hẹp kiểu trong TypeScript bao gồm:

* Toán tử `instanceof`: Dùng để kiểm tra một đối tượng có phải là instance của một class cụ thể hay không.
* Toán tử `in`: Dùng để kiểm tra một thuộc tính có tồn tại trong một đối tượng hay không.
* Toán tử `typeof`: Dùng để kiểm tra kiểu của một giá trị tại thời gian chạy.
* Các hàm tích hợp như `Array.isArray()`: Dùng để kiểm tra một giá trị có phải là mảng hay không.

#### Discriminated Union

Sử dụng "Discriminated Union" là một pattern trong TypeScript, trong đó một "tag" tường minh được thêm vào các đối tượng để phân biệt các kiểu khác nhau trong một union. Pattern này còn được gọi là "tagged union". Trong ví dụ sau, "tag" được biểu diễn bởi thuộc tính "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // kiểu là A
        case 'type_b':
            return input.value + 'extra'; // kiểu là B
    }
};
```

#### Type Guard do người dùng định nghĩa

Trong những trường hợp TypeScript không thể xác định một kiểu, có thể viết một hàm trợ giúp được gọi là "user-defined type guard". Trong ví dụ sau, chúng ta sẽ sử dụng Type Predicate để thu hẹp kiểu sau khi áp dụng một số bước lọc:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // Kiểu là (string | null)[], TypeScript không thể suy luận kiểu chính xác

const isValid = (item: string | null): item is string => item !== null; // Bộ kiểm tra kiểu tùy chỉnh

const r2 = data.filter(isValid); // Kiểu hiện đã đúng là string[], nhờ dùng bộ kiểm tra kiểu vị từ để thu hẹp kiểu
```

#### Thu hẹp bằng switch-true

TypeScript 5.3 bổ sung switch-true narrowing, cho phép bạn thay các chuỗi if/else rối rắm bằng switch (true) sử dụng các điều kiện boolean. Cách này cải thiện khả năng đọc mà vẫn thu hẹp kiểu. Nó tương tự pattern matching nhưng đơn giản hơn.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

