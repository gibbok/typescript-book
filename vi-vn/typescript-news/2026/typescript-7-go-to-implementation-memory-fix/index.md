# TypeScript 7 cải thiện mức sử dụng bộ nhớ của Go to Implementation


**Đã xuất bản:** July 30, 2026

Microsoft đã merge một bản sửa về khả năng mở rộng bộ nhớ cho Go to Implementation trong language service native của TypeScript.

## Nội dung thay đổi

Language service dùng một worklist duyệt theo chiều rộng để tìm implementation. Với một member của interface có nhiều implementation, các lượt tìm kiếm lặp lại trên toàn program có thể trả về cùng các reference nhiều lần. Các reference được giữ lại, công việc trong hàng đợi và nhóm kết quả vì thế có thể tăng theo bậc hai và làm cạn bộ nhớ trong các project lớn có kiểu phức tạp sâu.

Bản sửa loại bỏ trùng lặp các node reference trước khi thêm chúng vào hàng đợi công việc và tránh giữ lại các định nghĩa symbol trùng lặp. Một regression test kiểm tra rằng khi số lượng implementation tăng gấp đôi, mức tăng trưởng xấp xỉ tuyến tính thay vì bậc hai.

## Vì sao điều này quan trọng

Go to Implementation hiện có thể xử lý mẫu này mà không giữ đi giữ lại cùng các reference nội bộ. Phản hồi cuối cùng của editor vốn đã được loại bỏ trùng lặp, nên thay đổi này nhắm vào phần bộ nhớ và công việc ẩn cần thiết để tạo ra phản hồi đó.

## Tình trạng khả dụng

Thay đổi này đã được merge vào codebase TypeScript native sau bản phát hành TypeScript 7.0. Nguồn không chỉ rõ phiên bản npm ổn định nào chứa bản sửa này, vì vậy người dùng nên kiểm tra release notes của phiên bản đã cài đặt trước khi dựa vào nó.

## Nguồn

Đọc thay đổi chính thức: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
