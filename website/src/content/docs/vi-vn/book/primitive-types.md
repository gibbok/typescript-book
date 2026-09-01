---
title: Các kiểu nguyên thủy
sidebar:
  order: 11
  label: 11. Các kiểu nguyên thủy
---


TypeScript hỗ trợ 7 kiểu nguyên thủy. Kiểu dữ liệu nguyên thủy là kiểu không phải đối tượng và không có phương thức nào gắn với nó. Trong TypeScript, mọi kiểu nguyên thủy đều bất biến, nghĩa là giá trị của chúng không thể thay đổi sau khi được gán.

### string

Kiểu nguyên thủy `string` lưu trữ dữ liệu văn bản và giá trị luôn được đặt trong dấu nháy kép hoặc nháy đơn.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Chuỗi có thể trải dài trên nhiều dòng nếu được bao quanh bởi ký tự backtick (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Kiểu dữ liệu `boolean` trong TypeScript lưu một giá trị nhị phân, hoặc `true` hoặc `false`.

```typescript
const isReady: boolean = true;
```

### number

Kiểu dữ liệu `number` trong TypeScript được biểu diễn bằng giá trị dấu phẩy động 64-bit. Kiểu `number` có thể biểu diễn số nguyên và số thập phân.
TypeScript cũng hỗ trợ hệ thập lục phân, nhị phân và bát phân, ví dụ:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

`bigint` biểu diễn các giá trị số nguyên có thể lớn hơn số nguyên an toàn tối đa được `number` hỗ trợ, là 2^53 - 1.

Có thể tạo `bigint` bằng cách gọi hàm tích hợp `BigInt()` hoặc thêm `n` vào cuối bất kỳ literal số nguyên nào:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Ghi chú:

* Giá trị `bigint` không thể trộn với `number` và không thể sử dụng với `Math` tích hợp; chúng phải được ép về cùng kiểu.
* Giá trị `bigint` chỉ khả dụng nếu cấu hình target là ES2020 trở lên.

### Symbol

Symbol là các định danh duy nhất có thể được sử dụng làm key thuộc tính trong đối tượng để ngăn xung đột tên.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null và undefined

Các kiểu `null` và `undefined` đều biểu diễn không có giá trị hoặc sự vắng mặt của bất kỳ giá trị nào.

Kiểu `undefined` có nghĩa giá trị chưa được gán hoặc khởi tạo, hoặc biểu thị sự vắng mặt ngoài ý muốn của một giá trị.

Kiểu `null` có nghĩa chúng ta biết trường đó không có giá trị, vì vậy giá trị không khả dụng, và nó biểu thị sự vắng mặt có chủ ý của một giá trị.

### Array

`array` là kiểu dữ liệu có thể lưu nhiều giá trị cùng kiểu hoặc khác kiểu. Có thể định nghĩa bằng cú pháp sau:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript hỗ trợ mảng readonly bằng cú pháp sau:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript hỗ trợ tuple và readonly tuple:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Kiểu dữ liệu `any` biểu diễn đúng nghĩa "bất kỳ" giá trị nào và là mặc định khi TypeScript không thể suy luận kiểu hoặc kiểu không được chỉ định.

Khi sử dụng `any`, trình biên dịch TypeScript bỏ qua kiểm tra kiểu, vì vậy không có an toàn kiểu khi `any` được dùng. Nói chung, đừng sử dụng `any` để làm im trình biên dịch khi xảy ra lỗi; thay vào đó, hãy tập trung sửa lỗi, vì dùng `any` có thể phá vỡ các hợp đồng và làm mất lợi ích của tính năng tự động hoàn thành của TypeScript.

Kiểu `any` có thể hữu ích trong quá trình chuyển đổi dần từ JavaScript sang TypeScript vì nó có thể làm im trình biên dịch.

Với dự án mới, hãy sử dụng cấu hình TypeScript `noImplicitAny`, cho phép TypeScript báo lỗi tại những nơi `any` được sử dụng hoặc suy luận.

Kiểu `any` thường là nguồn gây lỗi có thể che giấu các vấn đề thực sự với kiểu của bạn. Hãy tránh sử dụng nó nhiều nhất có thể.

