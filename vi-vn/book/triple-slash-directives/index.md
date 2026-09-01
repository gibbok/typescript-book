# Triple-Slash Directive



Triple-slash directive là các comment đặc biệt cung cấp chỉ dẫn cho trình biên dịch về cách xử lý một tệp. Các directive này bắt đầu bằng ba dấu gạch chéo liên tiếp (`///`), thường được đặt ở đầu tệp TypeScript và không ảnh hưởng đến hành vi thời gian chạy.

Triple-slash directive được dùng để tham chiếu dependency bên ngoài, chỉ định hành vi tải module, bật hoặc tắt một số tính năng của trình biên dịch và nhiều mục đích khác. Một vài ví dụ:

Tham chiếu một tệp khai báo:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Chỉ định định dạng module:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Bật các tùy chọn trình biên dịch, trong ví dụ sau là strict mode:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

