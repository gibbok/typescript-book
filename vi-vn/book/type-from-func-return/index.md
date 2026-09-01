# Kiểu từ giá trị trả về của hàm



Type from Func Return nói đến khả năng tự động suy luận kiểu trả về của một hàm dựa trên phần triển khai. Điều này cho phép TypeScript xác định kiểu của giá trị được hàm trả về mà không cần chú thích kiểu tường minh.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

