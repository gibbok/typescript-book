# Thuộc tính tùy chọn



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

