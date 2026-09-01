# Suy luận literal



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

