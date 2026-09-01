---
title: Giới thiệu về TypeScript
sidebar:
  order: 8
  label: 8. Giới thiệu về TypeScript
---


### TypeScript là gì?

TypeScript là một ngôn ngữ lập trình có hệ thống kiểu mạnh, được xây dựng dựa trên JavaScript. Ban đầu ngôn ngữ này do Anders Hejlsberg thiết kế vào năm 2012 và hiện được Microsoft phát triển và duy trì như một dự án mã nguồn mở.

TypeScript được biên dịch thành JavaScript và có thể chạy trong bất kỳ môi trường thực thi JavaScript nào (ví dụ: trình duyệt hoặc Node.js trên máy chủ).

Ngôn ngữ này hỗ trợ nhiều mô hình lập trình như lập trình hàm, generic, mệnh lệnh và hướng đối tượng, đồng thời là một ngôn ngữ được biên dịch (chuyển dịch) sang JavaScript trước khi thực thi.

### Tại sao dùng TypeScript?

TypeScript là một ngôn ngữ có hệ thống kiểu mạnh, giúp ngăn ngừa các lỗi lập trình phổ biến và tránh một số loại lỗi thời gian chạy trước khi chương trình được thực thi.

Một ngôn ngữ có hệ thống kiểu mạnh cho phép lập trình viên chỉ định nhiều ràng buộc và hành vi của chương trình trong các định nghĩa kiểu dữ liệu, nhờ đó dễ dàng xác minh tính đúng đắn của phần mềm và ngăn ngừa lỗi. Điều này đặc biệt có giá trị trong các ứng dụng quy mô lớn.

Một số lợi ích của TypeScript:

* Kiểu tĩnh, có thể sử dụng hệ thống kiểu mạnh
* Suy luận kiểu
* Truy cập các tính năng ES6 và ES7
* Tương thích đa nền tảng và đa trình duyệt
* Hỗ trợ công cụ với IntelliSense

### TypeScript và JavaScript

TypeScript được viết trong các tệp `.ts` hoặc `.tsx`, trong khi các tệp JavaScript được viết trong `.js` hoặc `.jsx`.

Các tệp có phần mở rộng `.tsx` hoặc `.jsx` có thể chứa JavaScript Syntax Extension JSX, được sử dụng trong React để phát triển giao diện người dùng.

Về cú pháp, TypeScript là một tập cha có kiểu của JavaScript (ECMAScript 2015). Mọi mã JavaScript đều là mã TypeScript hợp lệ, nhưng chiều ngược lại không phải lúc nào cũng đúng.

Ví dụ, hãy xem một hàm trong tệp JavaScript có phần mở rộng `.js`, như sau:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Có thể chuyển đổi và sử dụng hàm này trong TypeScript bằng cách đổi phần mở rộng tệp thành `.ts`. Tuy nhiên, nếu cùng hàm đó được chú thích bằng các kiểu TypeScript, nó không thể chạy trong bất kỳ môi trường thực thi JavaScript nào nếu chưa được biên dịch. Mã TypeScript sau sẽ gây lỗi cú pháp nếu không được biên dịch:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript được thiết kế để phát hiện các lỗi thời gian chạy tiềm ẩn ngay tại thời điểm biên dịch bằng cách cho phép lập trình viên biểu đạt ý định thông qua chú thích kiểu. Ngoài ra, nhờ suy luận kiểu, TypeScript cũng có thể phát hiện một số vấn đề ngay cả khi không có chú thích kiểu tường minh. Ví dụ, đoạn mã sau không chỉ định bất kỳ kiểu TypeScript nào:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

Trong trường hợp này, TypeScript phát hiện lỗi và báo:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Hệ thống kiểu của TypeScript chịu ảnh hưởng lớn từ hành vi thời gian chạy của JavaScript. Ví dụ, toán tử cộng (+), trong JavaScript có thể thực hiện nối chuỗi hoặc cộng số, cũng được mô hình hóa tương tự trong TypeScript:

```typescript
const result = '1' + 1; // Result is of type string
```

Nhóm phát triển TypeScript đã chủ động quyết định đánh dấu các cách sử dụng JavaScript bất thường là lỗi. Ví dụ, hãy xem đoạn mã JavaScript hợp lệ sau:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

Tuy nhiên, TypeScript báo lỗi:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Lỗi này xảy ra vì TypeScript thực thi nghiêm ngặt tính tương thích kiểu và trong trường hợp này xác định phép toán giữa một số và một giá trị boolean là không hợp lệ.

### Sinh mã TypeScript

Trình biên dịch TypeScript có hai trách nhiệm chính: kiểm tra lỗi kiểu và biên dịch sang JavaScript. Hai quá trình này độc lập với nhau. Kiểu không ảnh hưởng đến việc thực thi mã trong môi trường JavaScript vì chúng bị xóa hoàn toàn trong quá trình biên dịch. TypeScript vẫn có thể xuất JavaScript ngay cả khi có lỗi kiểu.
Dưới đây là ví dụ về mã TypeScript có lỗi kiểu:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Tuy nhiên, nó vẫn có thể tạo ra đầu ra JavaScript có thể thực thi:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Không thể kiểm tra các kiểu TypeScript tại thời gian chạy. Ví dụ:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Vì các kiểu bị xóa sau khi biên dịch, không có cách nào chạy đoạn mã này trong JavaScript. Để nhận biết kiểu tại thời gian chạy, chúng ta cần sử dụng một cơ chế khác. TypeScript cung cấp một số lựa chọn, trong đó cách phổ biến là "tagged union". Ví dụ:

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

Thuộc tính "kind" là một giá trị có thể được sử dụng tại thời gian chạy để phân biệt các đối tượng trong JavaScript.

Một giá trị tại thời gian chạy cũng có thể có kiểu khác với kiểu được khai báo trong phần khai báo kiểu. Ví dụ, điều này có thể xảy ra nếu lập trình viên hiểu sai kiểu của một API và chú thích nó không chính xác.

TypeScript là một tập cha của JavaScript, vì vậy từ khóa "class" có thể được sử dụng vừa như một kiểu vừa như một giá trị tại thời gian chạy.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

Trong JavaScript, một "class" có thuộc tính "prototype", và toán tử "instanceof" có thể được dùng để kiểm tra xem thuộc tính prototype của một constructor có xuất hiện ở bất kỳ đâu trong chuỗi prototype của một đối tượng hay không.

TypeScript không ảnh hưởng đến hiệu năng thời gian chạy vì mọi kiểu đều bị xóa. Tuy nhiên, TypeScript có tạo thêm một phần chi phí ở thời gian build.

### JavaScript hiện đại ngay bây giờ (Downleveling)

TypeScript có thể biên dịch mã sang bất kỳ phiên bản JavaScript đã phát hành nào kể từ ECMAScript 3 (1999). Điều này có nghĩa TypeScript có thể chuyển dịch mã sử dụng các tính năng JavaScript mới nhất sang các phiên bản cũ hơn, một quá trình được gọi là Downleveling. Nhờ đó, có thể sử dụng JavaScript hiện đại trong khi vẫn duy trì mức tương thích tối đa với các môi trường thực thi cũ hơn.

Điều quan trọng cần lưu ý là khi chuyển dịch sang một phiên bản JavaScript cũ hơn, TypeScript có thể tạo ra mã phát sinh chi phí hiệu năng so với các triển khai native.

Dưới đây là một số tính năng JavaScript hiện đại có thể sử dụng trong TypeScript:

* ECMAScript modules thay cho các callback "define" kiểu AMD hoặc các câu lệnh "require" của CommonJS.
* Class thay cho prototype.
* Khai báo biến bằng "let" hoặc "const" thay cho "var".
* Vòng lặp "for-of" hoặc ".forEach" thay cho vòng lặp "for" truyền thống.
* Arrow function thay cho function expression.
* Destructuring assignment.
* Tên thuộc tính/phương thức rút gọn và tên thuộc tính được tính toán.
* Tham số hàm mặc định.

Bằng cách tận dụng các tính năng JavaScript hiện đại này, lập trình viên có thể viết mã TypeScript biểu đạt rõ ràng và ngắn gọn hơn.

