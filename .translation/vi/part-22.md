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
