### Gán kiểu: Khai báo kiểu và Type Assertion

Một kiểu có thể được gán theo nhiều cách khác nhau trong TypeScript:

#### Khai báo kiểu

Trong ví dụ sau, chúng ta sử dụng x: X (": Type") để khai báo kiểu cho biến x.

```typescript
type X = {
    a: string;
};

// Type declaration
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
    b: 'b', // Error: Object literal may only specify known properties
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
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

Trong ví dụ này, kiểu `J<Type>` sử dụng mapped type với template literal để ánh xạ lại các key của Type. Nó tạo các thuộc tính mới với "prefix_" được thêm vào mỗi key và các giá trị tương ứng là các hàm trả về giá trị thuộc tính ban đầu.

Cần lưu ý rằng khi sử dụng type assertion, TypeScript sẽ không thực hiện excess property checking. Vì vậy, nói chung nên sử dụng Khai báo kiểu khi cấu trúc của đối tượng đã được biết trước.

#### Khai báo ambient

Khai báo ambient là các tệp mô tả kiểu cho mã JavaScript, chúng có định dạng tên tệp là `.d.ts.`. Chúng thường được import và dùng để chú thích các thư viện JavaScript hiện có hoặc thêm kiểu vào các tệp JS hiện có trong dự án của bạn.

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

Excess Property Checking được thực hiện khi gán object literal cho biến hoặc khi truyền chúng làm đối số cho thuộc tính dư thừa của hàm, chẳng hạn.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
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

fn({ c: 'c' }); // Invalid
```

Mặc dù không được khuyến nghị, nếu cần, có thể bỏ qua kiểm tra này bằng type assertion:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Hoặc bằng cách thêm `unknown` vào index signature của kiểu yếu:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
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
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Suy luận kiểu

TypeScript có thể suy luận kiểu khi không có chú thích được cung cấp trong:

* Khởi tạo biến.
* Khởi tạo thành viên.
* Đặt giá trị mặc định cho tham số.
* Kiểu trả về của hàm.

Ví dụ:

```typescript
let x = 'x'; // The type inferred is string
```

Trình biên dịch TypeScript phân tích giá trị hoặc biểu thức và xác định kiểu của nó dựa trên thông tin có sẵn.

### Suy luận nâng cao hơn

Khi nhiều biểu thức được sử dụng trong suy luận kiểu, TypeScript tìm kiếm "kiểu chung tốt nhất". Ví dụ:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Nếu trình biên dịch không thể tìm thấy kiểu chung tốt nhất, nó trả về một union type. Ví dụ:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript sử dụng "contextual typing" dựa trên vị trí của biến để suy luận kiểu. Trong ví dụ sau, trình biên dịch biết rằng `e` có kiểu `MouseEvent` nhờ kiểu sự kiện `click` được định nghĩa trong tệp lib.d.ts, chứa các khai báo ambient cho nhiều cấu trúc JavaScript phổ biến và DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Type Widening

Type widening là quá trình TypeScript gán một kiểu cho biến được khởi tạo mà không có chú thích kiểu. Nó cho phép chuyển từ kiểu hẹp sang kiểu rộng hơn nhưng không theo chiều ngược lại.
Trong ví dụ sau:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript gán `string` cho `x` dựa trên giá trị duy nhất được cung cấp khi khởi tạo (`x`); đây là một ví dụ về widening.

TypeScript cung cấp các cách để kiểm soát quá trình widening, chẳng hạn sử dụng "const".

### Const

Sử dụng từ khóa `const` khi khai báo biến dẫn đến suy luận kiểu hẹp hơn trong TypeScript.

Ví dụ:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Bằng cách dùng `const` để khai báo biến x, kiểu của nó được thu hẹp thành giá trị literal cụ thể 'x'. Vì kiểu của x được thu hẹp, nó có thể được gán cho biến y mà không có lỗi.
Lý do kiểu có thể được suy luận như vậy là vì biến `const` không thể được gán lại, nên kiểu của chúng có thể được thu hẹp xuống một literal type cụ thể, trong trường hợp này là literal type 'x'.

#### Modifier Const trên tham số kiểu

Từ TypeScript phiên bản 5.0, có thể chỉ định thuộc tính `const` trên một tham số kiểu generic. Điều này cho phép suy luận kiểu chính xác nhất có thể. Hãy xem một ví dụ không sử dụng `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Như bạn có thể thấy, các thuộc tính `a` và `b` được suy luận có kiểu `string`   .

Bây giờ, hãy xem sự khác biệt với phiên bản `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
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
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Chú thích kiểu tường minh

Chúng ta có thể chỉ định cụ thể và truyền một kiểu. Trong ví dụ sau, thuộc tính `x` có kiểu `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Chúng ta có thể làm cho chú thích kiểu cụ thể hơn bằng cách sử dụng một union của các literal type:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Thu hẹp kiểu

Type Narrowing là quá trình trong TypeScript mà một kiểu tổng quát được thu hẹp xuống một kiểu cụ thể hơn. Điều này xảy ra khi TypeScript phân tích mã và xác định rằng một số điều kiện hoặc thao tác có thể tinh chỉnh thông tin kiểu.

Việc thu hẹp kiểu có thể xảy ra theo nhiều cách, bao gồm:

#### Điều kiện

Bằng cách sử dụng các câu lệnh điều kiện như `if` hoặc `switch`, TypeScript có thể thu hẹp kiểu dựa trên kết quả của điều kiện. Ví dụ:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
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
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Type Guard do người dùng định nghĩa

Trong những trường hợp TypeScript không thể xác định một kiểu, có thể viết một hàm trợ giúp được gọi là "user-defined type guard". Trong ví dụ sau, chúng ta sẽ sử dụng Type Predicate để thu hẹp kiểu sau khi áp dụng một số bước lọc:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
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
