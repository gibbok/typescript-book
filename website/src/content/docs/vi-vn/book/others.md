---
title: Khác
sidebar:
  order: 62
  label: 62. Khác
---


### Lỗi và xử lý ngoại lệ

TypeScript cho phép bạn bắt và xử lý lỗi bằng các cơ chế xử lý lỗi JavaScript tiêu chuẩn:

Khối Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Bạn cũng có thể xử lý các loại lỗi khác nhau:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

Kiểu lỗi tùy chỉnh:

Có thể chỉ định các lỗi cụ thể hơn bằng cách mở rộng `class` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin class

Mixin class cho phép bạn kết hợp và tổng hợp hành vi từ nhiều class vào một class duy nhất. Chúng cung cấp cách tái sử dụng và mở rộng chức năng mà không cần các chuỗi kế thừa sâu.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Các tính năng ngôn ngữ bất đồng bộ

Vì TypeScript là tập cha của JavaScript, nó có các tính năng ngôn ngữ bất đồng bộ tích hợp của JavaScript như:

Promise:

Promise là cách xử lý các thao tác bất đồng bộ và kết quả của chúng bằng các phương thức như `.then()` và `.catch()` để xử lý điều kiện thành công và lỗi.

Tìm hiểu thêm: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Các từ khóa Async/await cung cấp cú pháp trông đồng bộ hơn khi làm việc với Promise. Từ khóa `async` được dùng để định nghĩa một hàm bất đồng bộ và từ khóa `await` được dùng bên trong hàm async để tạm dừng thực thi cho đến khi Promise được resolve hoặc reject.

Tìm hiểu thêm:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Các API sau được TypeScript hỗ trợ tốt:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iterator và Generator

Cả Iterator và Generator đều được TypeScript hỗ trợ tốt.

Iterator là các đối tượng triển khai iterator protocol, cung cấp cách truy cập từng phần tử của một collection hoặc sequence. Nó là một cấu trúc chứa con trỏ đến phần tử tiếp theo trong quá trình lặp. Chúng có phương thức `next()` trả về giá trị tiếp theo trong sequence cùng một giá trị boolean cho biết sequence đã `done` hay chưa.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Generator là các hàm đặc biệt được định nghĩa bằng cú pháp `function*` giúp đơn giản hóa việc tạo iterator. Chúng sử dụng từ khóa `yield` để định nghĩa chuỗi giá trị và tự động tạm dừng rồi tiếp tục thực thi khi giá trị được yêu cầu.

Generator giúp tạo iterator dễ dàng hơn và đặc biệt hữu ích khi làm việc với sequence lớn hoặc vô hạn.

Ví dụ:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript cũng hỗ trợ async iterator và async Generator.

Tìm hiểu thêm:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Tham khảo TsDocs JSDoc

Khi làm việc với codebase JavaScript, có thể giúp TypeScript suy luận đúng kiểu bằng cách sử dụng comment JSDoc với annotation bổ sung để cung cấp thông tin kiểu.

Ví dụ:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Tài liệu đầy đủ có tại liên kết này:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Từ phiên bản 3.7, có thể tạo định nghĩa kiểu .d.ts từ cú pháp JavaScript JSDoc.
Bạn có thể tìm thêm thông tin tại đây:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Các package thuộc tổ chức @types sử dụng quy ước đặt tên package đặc biệt để cung cấp định nghĩa kiểu cho các thư viện hoặc module JavaScript hiện có. Ví dụ, sử dụng:

```shell
npm install --save-dev @types/lodash
```

sẽ cài đặt các định nghĩa kiểu của `lodash` vào dự án hiện tại của bạn.

Để đóng góp cho các định nghĩa kiểu của một package `@types`, hãy gửi pull request tới [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) là một phần mở rộng cú pháp của ngôn ngữ JavaScript cho phép bạn viết mã giống HTML trong các tệp JavaScript hoặc TypeScript. Nó thường được dùng trong React để định nghĩa cấu trúc HTML.

TypeScript mở rộng khả năng của JSX bằng cách cung cấp kiểm tra kiểu và phân tích tĩnh.

Để sử dụng JSX, bạn cần đặt tùy chọn trình biên dịch `jsx` trong tệp `tsconfig.json`. Hai tùy chọn cấu hình phổ biến:

* "preserve": emit tệp .jsx với JSX không thay đổi. Tùy chọn này yêu cầu TypeScript giữ nguyên cú pháp JSX và không biến đổi nó trong quá trình biên dịch. Bạn có thể dùng tùy chọn này nếu có công cụ riêng như Babel xử lý việc biến đổi.
* "react": bật phép biến đổi JSX tích hợp của TypeScript. React.createElement sẽ được sử dụng.

Tất cả tùy chọn có tại đây:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 Module

TypeScript hỗ trợ ES6 (ECMAScript 2015) và nhiều phiên bản tiếp theo. Điều này có nghĩa bạn có thể sử dụng cú pháp ES6 như arrow function, template literal, class, module, destructuring và nhiều tính năng khác.

Để bật các tính năng ES6 trong dự án, bạn có thể chỉ định thuộc tính `target` trong tsconfig.json.

Ví dụ cấu hình:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Toán tử lũy thừa ES7

Toán tử lũy thừa (`**`) tính giá trị bằng cách nâng toán hạng thứ nhất lên lũy thừa của toán hạng thứ hai. Nó hoạt động tương tự `Math.pow()` nhưng có thêm khả năng chấp nhận BigInt làm toán hạng.
TypeScript hỗ trợ đầy đủ toán tử này bằng cách đặt `target` trong tệp tsconfig.json thành `es2016` hoặc cao hơn.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Câu lệnh for-await-of

Đây là một tính năng JavaScript được TypeScript hỗ trợ đầy đủ, cho phép bạn lặp qua các đối tượng iterable bất đồng bộ với phiên bản target `es2018`.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Meta-property new target

Bạn có thể dùng meta-property `new.target` trong TypeScript, cho phép xác định một hàm hoặc constructor có được gọi bằng toán tử new hay không. Nó cho phép phát hiện liệu một đối tượng có được tạo ra do lời gọi constructor hay không.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Biểu thức Dynamic Import

Có thể tải module có điều kiện hoặc lazy-load chúng theo nhu cầu bằng đề xuất ECMAScript cho dynamic import, được TypeScript hỗ trợ.

Cú pháp cho biểu thức dynamic import trong TypeScript như sau:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Lệnh này khởi động trình biên dịch TypeScript với tham số `--watch`, có khả năng tự động biên dịch lại các tệp TypeScript mỗi khi chúng được sửa đổi.

```shell
tsc --watch
```

Bắt đầu từ TypeScript phiên bản 4.9, việc theo dõi tệp chủ yếu dựa vào sự kiện hệ thống tệp và tự động chuyển sang polling nếu không thể thiết lập watcher dựa trên sự kiện.

### Toán tử Non-null Assertion

Toán tử non-null assertion (postfix !), còn gọi là definite assignment assertion, là một tính năng TypeScript cho phép bạn assertion rằng một biến hoặc thuộc tính không phải null hoặc undefined, ngay cả khi phân tích kiểu tĩnh của TypeScript cho rằng nó có thể như vậy. Với tính năng này, có thể loại bỏ mọi kiểm tra tường minh.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Khai báo có giá trị mặc định

Defaulted declaration được dùng khi một biến hoặc tham số được gán giá trị mặc định. Điều này có nghĩa nếu không cung cấp giá trị cho biến hoặc tham số đó, giá trị mặc định sẽ được dùng thay thế.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Optional Chaining

Toán tử optional chaining `?.` hoạt động giống toán tử dấu chấm thông thường (`.`) để truy cập thuộc tính hoặc phương thức. Tuy nhiên, nó xử lý null hoặc undefined một cách an toàn bằng cách kết thúc biểu thức và trả về `undefined` thay vì throw lỗi.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Toán tử Nullish Coalescing

Toán tử nullish coalescing `??` trả về giá trị bên phải nếu giá trị bên trái là `null` hoặc `undefined`; nếu không, nó trả về giá trị bên trái.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Template Literal Type

Template Literal Type cho phép bạn thao tác giá trị chuỗi ở cấp độ kiểu và tạo các string type mới dựa trên các kiểu hiện có. Chúng hữu ích để tạo các kiểu biểu đạt và chính xác hơn từ các thao tác dựa trên chuỗi.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Function overloading

Function overloading cho phép bạn định nghĩa nhiều chữ ký hàm cho cùng một tên hàm, mỗi chữ ký có kiểu tham số và kiểu trả về khác nhau.
Khi bạn gọi một hàm được overload, TypeScript sử dụng các đối số được cung cấp để xác định chữ ký hàm đúng:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

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

### Covariance và Contravariance trong TypeScript

Covariance và contravariance mô tả cách các quan hệ kiểu hoạt động trong generic type.

Trong TypeScript:

* Array là **covariant**, nhưng điều này không hoàn toàn an toàn kiểu.
* Kiểu tham số hàm là:
  * **contravariant** khi `strictFunctionTypes` được bật
  * **bivariant** trong trường hợp khác

Covariance có nghĩa quan hệ được giữ nguyên: nếu kiểu A là kiểu con của kiểu B thì `F<A>` cũng là kiểu con của `F<B>`. Trong TypeScript, điều này thường xuất hiện trong kiểu trả về và trong array (mặc dù covariance của array không hoàn toàn an toàn kiểu).

Contravariance có nghĩa quan hệ bị đảo ngược: nếu kiểu A là kiểu con của kiểu B thì `F<B>` là kiểu con của `F<A>`. Trong TypeScript, kiểu tham số hàm được thiết kế để contravariant, nghĩa là một hàm chấp nhận kiểu rộng hơn có thể được dùng ở nơi mong đợi kiểu hẹp hơn.

Tuy nhiên, trên thực tế, TypeScript thường cho phép bivariance đối với tham số hàm (trừ khi `strictFunctionTypes` được bật), nghĩa là cả hai hướng có thể được chấp nhận ngay cả khi không hoàn toàn an toàn kiểu.

Ví dụ: Hãy tưởng tượng một không gian cho tất cả động vật và một không gian riêng chỉ cho chó.

* **Covariance**:  
  Bạn có thể dùng một “không gian cho chó” ở nơi mong đợi một “không gian cho động vật”, vì mọi con chó đều là động vật.  
  Nhưng bạn không thể dùng một “không gian cho động vật” ở nơi mong đợi một “không gian cho chó”, vì nó có thể chứa động vật không phải chó.

* **Contravariance** (hãy nghĩ theo hàm):  
  Nếu bạn có thứ gì đó có thể xử lý **bất kỳ động vật nào**, bạn có thể dùng nó ở nơi mong đợi thứ chỉ xử lý **chó**.  
  Nhưng không thể làm ngược lại.

Ví dụ covariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

Ví dụ contravariance:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Variance Annotation tùy chọn cho tham số kiểu

Kể từ TypeScript 4.7.0, chúng ta có thể sử dụng các từ khóa `out` và `in` để chỉ định variance annotation.

Với covariance, dùng từ khóa `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Và với Contravariant, dùng từ khóa `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Template String Pattern Index Signature

Template string pattern index signature cho phép chúng ta định nghĩa index signature linh hoạt bằng template string pattern. Tính năng này cho phép tạo đối tượng có thể được index bằng các pattern cụ thể của string key, mang lại nhiều kiểm soát và tính cụ thể hơn khi truy cập và thao tác thuộc tính.

Từ phiên bản 4.4, TypeScript cho phép index signature cho symbol và template string pattern.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Toán tử satisfies

Toán tử `satisfies` cho phép bạn kiểm tra một kiểu đã cho có thỏa mãn một interface hoặc điều kiện cụ thể hay không. Nói cách khác, nó bảo đảm một kiểu có tất cả thuộc tính và phương thức bắt buộc của một interface cụ thể. Đây là cách để bảo đảm một biến phù hợp với định nghĩa của một kiểu.
Dưới đây là một ví dụ:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Import và Export chỉ dành cho Type

Type-Only Import và Export cho phép bạn import hoặc export type mà không import hoặc export các giá trị hay hàm gắn với các type đó. Điều này có thể hữu ích để giảm kích thước bundle.

Để sử dụng type-only import, bạn có thể dùng từ khóa `import type`.

TypeScript cho phép sử dụng cả phần mở rộng tệp khai báo và triển khai (.ts, .mts, .cts và .tsx) trong type-only import, bất kể thiết lập `allowImportingTsExtensions`.

Ví dụ:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Các dạng sau được hỗ trợ:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Khai báo using và Explicit Resource Management

Khai báo `using` là một binding bất biến có phạm vi block, tương tự `const`, được dùng để quản lý các resource có thể dispose. Khi được khởi tạo bằng một giá trị, phương thức `Symbol.dispose` của giá trị đó được ghi lại và sau đó được thực thi khi thoát khỏi block scope bao quanh.

Điều này dựa trên tính năng Resource Management của ECMAScript, hữu ích để thực hiện các tác vụ cleanup thiết yếu sau khi tạo đối tượng, chẳng hạn đóng connection, xóa tệp và giải phóng bộ nhớ.

Ghi chú:

* Do mới được giới thiệu trong TypeScript phiên bản 5.2, hầu hết runtime chưa hỗ trợ native. Bạn sẽ cần polyfill cho: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Ngoài ra, bạn cần cấu hình tsconfig.json như sau:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Ví dụ:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

Mã sẽ ghi ra:

```shell
1
2
disposed
3
```

Một resource đủ điều kiện để dispose phải tuân theo interface `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Khai báo `using` ghi các thao tác dispose resource vào một stack, bảo đảm chúng được dispose theo thứ tự ngược với thứ tự khai báo:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Resource được bảo đảm sẽ được dispose ngay cả khi mã tiếp theo hoặc exception xảy ra. Điều này có thể dẫn đến việc dispose phát sinh exception và có khả năng suppress một exception khác. Để giữ lại thông tin về các lỗi bị suppress, một native exception mới, `SuppressedError`, được giới thiệu.

#### Khai báo await using

Khai báo `await using` xử lý một resource được dispose bất đồng bộ. Giá trị phải có phương thức `Symbol.asyncDispose`, phương thức này sẽ được await ở cuối block.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Với resource được dispose bất đồng bộ, nó phải tuân theo interface `Disposable` hoặc `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

Mã ghi ra:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Các khai báo `using` và `await using` được phép trong các câu lệnh: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Import Attribute

Import Attribute của TypeScript 5.3 (nhãn cho import) cho runtime biết cách xử lý module (JSON, v.v.). Điều này cải thiện bảo mật bằng cách bảo đảm import rõ ràng và phù hợp với Content Security Policy (CSP) để tải resource an toàn hơn. TypeScript bảo đảm chúng hợp lệ nhưng để runtime xử lý cách diễn giải cho việc xử lý module cụ thể.

Ví dụ:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

với dynamic import:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Kiểm tra cú pháp Regular Expression

Kể từ TypeScript 5.5.4, TypeScript kiểm tra regex literal để phát hiện các lỗi phổ biến tại thời điểm biên dịch (ví dụ cú pháp không hợp lệ, backreference sai, tính năng không được hỗ trợ cho phiên bản JS target). Điều này giúp phát hiện bug sớm hơn nhưng không kiểm tra chuỗi new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` cho phép bạn tải một module nhưng trì hoãn việc thực thi cho đến khi thực sự sử dụng thứ gì đó từ module. Điều này giúp tránh công việc và side effect không cần thiết.

* Chỉ hoạt động với: `import defer * as name from "module"`
* Mã chỉ chạy khi bạn truy cập một export
