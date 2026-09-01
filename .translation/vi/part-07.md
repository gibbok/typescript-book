## Enum

Trong TypeScript, `enum` là một tập hợp các giá trị hằng được đặt tên.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enum có thể được định nghĩa theo nhiều cách:

### Enum số

Trong TypeScript, Numeric Enum là một Enum mà mỗi hằng được gán một giá trị số, mặc định bắt đầu từ 0.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Có thể chỉ định các giá trị tùy chỉnh bằng cách gán chúng tường minh:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enum chuỗi

Trong TypeScript, String enum là một Enum mà mỗi hằng được gán một giá trị chuỗi.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Lưu ý: TypeScript cho phép sử dụng Enum không đồng nhất, trong đó thành viên chuỗi và số có thể cùng tồn tại.

### Const enum

Const enum trong TypeScript là một kiểu Enum đặc biệt, trong đó tất cả giá trị đều được biết tại thời điểm biên dịch và được inline tại mọi nơi enum được sử dụng, tạo ra mã hiệu quả hơn.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Sẽ được biên dịch thành:

```typescript
console.log('EN' /* Language.English */);
```

Ghi chú:
Const Enum có các giá trị được mã hóa trực tiếp, xóa Enum khỏi đầu ra, điều này có thể hiệu quả hơn trong các thư viện khép kín nhưng nhìn chung không được mong muốn. Ngoài ra, Const enum không thể có computed member.

### Ánh xạ ngược

Trong TypeScript, reverse mapping trong Enum nói đến khả năng truy xuất tên thành viên Enum từ giá trị của nó. Theo mặc định, các thành viên Enum có ánh xạ xuôi từ tên sang giá trị, nhưng có thể tạo ánh xạ ngược bằng cách đặt tường minh giá trị cho từng thành viên. Ánh xạ ngược hữu ích khi cần tra cứu một thành viên Enum theo giá trị của nó hoặc khi cần lặp qua tất cả thành viên Enum. Lưu ý rằng chỉ các thành viên enum số mới tạo ánh xạ ngược, còn các thành viên enum chuỗi hoàn toàn không được tạo ánh xạ ngược.

Enum sau:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Được biên dịch thành:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Do đó, ánh xạ giá trị về key hoạt động với thành viên enum số nhưng không hoạt động với thành viên enum chuỗi:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Ambient enum

Ambient enum trong TypeScript là một kiểu Enum được định nghĩa trong tệp khai báo (*.d.ts) mà không có phần triển khai đi kèm. Nó cho phép bạn định nghĩa một tập hợp các hằng được đặt tên có thể sử dụng theo cách an toàn kiểu trên nhiều tệp khác nhau mà không cần import chi tiết triển khai trong từng tệp.

### Thành viên computed và constant

Trong TypeScript, computed member là thành viên của Enum có giá trị được tính tại thời gian chạy, còn constant member là thành viên có giá trị được đặt tại thời điểm biên dịch và không thể thay đổi trong thời gian chạy. Computed member được phép trong Enum thông thường, còn constant member được phép trong cả Enum thông thường và const enum.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Enum được biểu diễn bằng các union gồm kiểu của các thành viên. Giá trị của mỗi thành viên có thể được xác định thông qua biểu thức hằng hoặc không hằng, trong đó các thành viên có giá trị hằng được gán literal type. Để minh họa, hãy xem khai báo kiểu E và các kiểu con E.A, E.B và E.C. Trong trường hợp này, E biểu diễn union E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

## Narrowing

Narrowing trong TypeScript là quá trình tinh chỉnh kiểu của một biến bên trong một khối điều kiện. Điều này hữu ích khi làm việc với union type, nơi một biến có thể có nhiều hơn một kiểu.

TypeScript nhận biết một số cách để thu hẹp kiểu:

### Type guard typeof

Type guard typeof là một type guard cụ thể trong TypeScript kiểm tra kiểu của biến dựa trên kiểu JavaScript tích hợp của nó.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Thu hẹp theo truthiness

Truthiness narrowing trong TypeScript hoạt động bằng cách kiểm tra một biến là truthy hay falsy để thu hẹp kiểu tương ứng.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Thu hẹp theo phép so sánh bằng

Equality narrowing trong TypeScript hoạt động bằng cách kiểm tra một biến có bằng một giá trị cụ thể hay không để thu hẹp kiểu tương ứng.

Nó được sử dụng cùng các câu lệnh `switch` và các toán tử so sánh bằng như `===`, `!==`, `==` và `!=` để thu hẹp kiểu.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### Thu hẹp bằng toán tử In

Thu hẹp bằng toán tử `in` trong TypeScript là cách thu hẹp kiểu của một biến dựa trên việc một thuộc tính có tồn tại trong kiểu của biến hay không.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### Thu hẹp bằng instanceof

Thu hẹp bằng toán tử `instanceof` trong TypeScript là cách thu hẹp kiểu của biến dựa trên hàm constructor của nó, bằng cách kiểm tra xem một đối tượng có phải là instance của một class hoặc interface nhất định hay không.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

## Phép gán

Thu hẹp TypeScript bằng phép gán là cách thu hẹp kiểu của một biến dựa trên giá trị được gán cho nó. Khi một biến được gán giá trị, TypeScript suy luận kiểu của nó dựa trên giá trị đã gán và thu hẹp kiểu của biến để khớp với kiểu được suy luận.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

## Phân tích luồng điều khiển

Control Flow Analysis trong TypeScript là cách phân tích tĩnh luồng mã để suy luận kiểu của biến, cho phép trình biên dịch thu hẹp kiểu của các biến đó khi cần, dựa trên kết quả phân tích.

Trước TypeScript 4.4, phân tích luồng mã chỉ được áp dụng cho mã bên trong câu lệnh if, nhưng kể từ TypeScript 4.4, nó cũng có thể được áp dụng cho các biểu thức điều kiện và truy cập thuộc tính discriminant được tham chiếu gián tiếp thông qua biến const.

Ví dụ:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Một số ví dụ mà việc thu hẹp không xảy ra:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

Ghi chú: Tối đa năm cấp độ gián tiếp được phân tích trong biểu thức điều kiện.

## Type Predicate

Type Predicate trong TypeScript là các hàm trả về giá trị boolean và được dùng để thu hẹp kiểu của một biến thành kiểu cụ thể hơn.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 tự động suy luận type predicate (như `x is T`) trong các hàm như `.filter`, nhờ đó nó biết khi các giá trị như undefined đã bị loại bỏ, tạo ra kiểu chính xác hơn và ít lỗi hơn; điều này hoạt động với các kiểm tra rõ ràng (ví dụ `x !== undefined`) nhưng không với các kiểm tra mơ hồ như `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```
