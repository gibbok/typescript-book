## Các kiểu nguyên thủy

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

## Chú thích kiểu

Trên các biến được khai báo bằng `var`, `let` và `const`, có thể tùy chọn thêm một kiểu:

```typescript
const x: number = 1;
```

TypeScript làm tốt việc suy luận kiểu, đặc biệt với các kiểu đơn giản, nên các khai báo này không cần thiết trong hầu hết trường hợp.

Trên hàm, có thể thêm chú thích kiểu cho tham số:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Sau đây là ví dụ sử dụng hàm ẩn danh (còn gọi là lambda function):

```typescript
const sum = (a: number, b: number) => a + b;
```

Có thể tránh các chú thích này khi tham số có giá trị mặc định:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Có thể thêm chú thích kiểu trả về cho hàm:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Điều này đặc biệt hữu ích với các hàm phức tạp hơn, vì viết kiểu trả về trước phần triển khai có thể giúp bạn suy nghĩ rõ hơn về hàm.

Nói chung, hãy cân nhắc chú thích chữ ký kiểu, nhưng không cần chú thích các biến cục bộ trong thân hàm, và luôn thêm kiểu cho object literal.

## Thuộc tính tùy chọn

Một đối tượng có thể chỉ định Thuộc tính tùy chọn bằng cách thêm dấu hỏi `?` vào cuối tên thuộc tính:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Có thể chỉ định giá trị mặc định khi một thuộc tính là tùy chọn:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

## Thuộc tính readonly

Có thể ngăn việc ghi vào một thuộc tính bằng modifier `readonly`, bảo đảm thuộc tính không thể được ghi lại nhưng không cung cấp bảo đảm về tính bất biến hoàn toàn:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

## Index Signature

Trong TypeScript, chúng ta có thể sử dụng `string`, `number` và `symbol` làm index signature:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Lưu ý rằng JavaScript tự động chuyển một index kiểu `number` thành index kiểu `string`, vì vậy `k[1]` hoặc `k["1"]` trả về cùng một giá trị.

## Mở rộng kiểu

Có thể mở rộng một `interface` (sao chép các thành viên từ một kiểu khác):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Cũng có thể mở rộng từ nhiều kiểu:

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

Từ khóa `extends` chỉ hoạt động trên interface và class; với type, hãy dùng intersection:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Có thể mở rộng một type bằng interface nhưng không thể làm ngược lại:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

## Literal Type

Literal Type là một tập hợp một phần tử trong một kiểu tập hợp; nó định nghĩa một giá trị rất chính xác là primitive của JavaScript.

Literal Type trong TypeScript là số, chuỗi và boolean.

Ví dụ về literal:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

String, Numeric và Boolean Literal Type được dùng trong union, type guard và type alias.
Trong ví dụ sau, bạn có thể thấy một union type alias. `O` chỉ gồm các giá trị đã chỉ định, không có chuỗi nào khác hợp lệ:

```typescript
type O = 'a' | 'b' | 'c';
```

## Suy luận literal

Literal Inference là một tính năng trong TypeScript cho phép suy luận kiểu của biến hoặc tham số dựa trên giá trị của nó.

Trong ví dụ sau, chúng ta có thể thấy TypeScript coi `x` là literal type vì giá trị không thể thay đổi về sau, trong khi `y` được suy luận là string vì nó có thể được sửa đổi bất kỳ lúc nào sau đó.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

Trong ví dụ sau, chúng ta có thể thấy `o.x` được suy luận là `string` (không phải literal của `a`) vì TypeScript cho rằng giá trị có thể thay đổi bất kỳ lúc nào sau đó.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

Như bạn có thể thấy, mã gây lỗi khi truyền `o.x` vào `fn` vì X là kiểu hẹp hơn.

Chúng ta có thể giải quyết vấn đề này bằng type assertion với `const` hoặc kiểu `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

hoặc:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

## strictNullChecks

`strictNullChecks` là một tùy chọn của trình biên dịch TypeScript thực thi việc kiểm tra null nghiêm ngặt. Khi tùy chọn này được bật, biến và tham số chỉ có thể được gán `null` hoặc `undefined` nếu chúng đã được khai báo tường minh là kiểu đó bằng union type `null` | `undefined`. Nếu biến hoặc tham số không được khai báo tường minh là nullable, TypeScript sẽ tạo lỗi để ngăn các lỗi thời gian chạy tiềm ẩn.
