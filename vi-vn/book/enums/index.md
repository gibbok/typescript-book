# Enum



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

