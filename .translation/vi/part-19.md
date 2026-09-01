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
