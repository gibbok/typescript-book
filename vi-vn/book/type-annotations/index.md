# Chú thích kiểu



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

