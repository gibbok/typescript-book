# Kiểu any



Kiểu `any` là một kiểu đặc biệt (universal supertype) có thể được dùng để biểu diễn bất kỳ kiểu giá trị nào (primitive, object, array, function, error, symbol). Nó thường được sử dụng trong những tình huống kiểu của một giá trị không được biết tại thời điểm biên dịch hoặc khi làm việc với giá trị từ API hoặc thư viện bên ngoài không có TypeScript typing.

Khi sử dụng kiểu `any`, bạn cho trình biên dịch TypeScript biết rằng các giá trị nên được biểu diễn mà không có bất kỳ giới hạn nào. Để tối đa hóa an toàn kiểu trong mã, hãy cân nhắc:

* Giới hạn việc sử dụng `any` cho các trường hợp cụ thể khi kiểu thực sự chưa biết.
* Không trả về kiểu `any` từ một hàm, vì điều này làm suy yếu an toàn kiểu trong mã sử dụng nó.
* Thay vì `any`, hãy dùng `@ts-ignore` nếu bạn cần làm im trình biên dịch.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

