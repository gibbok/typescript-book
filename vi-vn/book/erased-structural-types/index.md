# Kiểu cấu trúc bị xóa



Trong TypeScript, đối tượng không cần phải khớp với một kiểu cụ thể, chính xác. Ví dụ, nếu chúng ta tạo một đối tượng đáp ứng các yêu cầu của một interface, chúng ta có thể sử dụng đối tượng đó ở những nơi cần interface ấy, ngay cả khi giữa chúng không có liên kết tường minh.
Ví dụ:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

