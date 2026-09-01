# strictNullChecks



`strictNullChecks` là một tùy chọn của trình biên dịch TypeScript thực thi việc kiểm tra null nghiêm ngặt. Khi tùy chọn này được bật, biến và tham số chỉ có thể được gán `null` hoặc `undefined` nếu chúng đã được khai báo tường minh là kiểu đó bằng union type `null` | `undefined`. Nếu biến hoặc tham số không được khai báo tường minh là nullable, TypeScript sẽ tạo lỗi để ngăn các lỗi thời gian chạy tiềm ẩn.

