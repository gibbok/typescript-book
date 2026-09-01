# Type Predicate



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

