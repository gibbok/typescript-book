# Trình biên dịch native TypeScript giảm sử dụng bộ nhớ nhờ tối ưu trình kiểm tra kiểu


**Đã xuất bản:** 14 tháng 10, 2026

Microsoft đã hợp nhất một số tối ưu bộ nhớ vào trình biên dịch native của TypeScript. Các thay đổi giảm bộ nhớ được giữ bởi cấu trúc dữ liệu nội bộ của trình kiểm tra kiểu mà không thay đổi cú pháp TypeScript.

## Thay đổi

* Các khối của arena có kiểu hiện nhắm tới khoảng 512 byte thay vì cố định 256 đối tượng. Trong benchmark VS Code của thay đổi này, heap được giữ giảm 8.54% và lượng quét của bộ thu gom rác giảm 10.44%, còn số lần cấp phát tăng 13.91%.
* Chữ ký tùy chọn, thông tin chỉ mục và bộ nhớ đệm của trình tạo nút được chuyển khỏi bản ghi `StructuredType`, giảm kích thước từ 144 xuống 88 byte.
* Nút kiểu đã phân giải và chữ ký sử dụng kho liên kết nút phân trang khi có ID nút ổn định, với map dự phòng cho các ID khác.

## Khả dụng

Các thay đổi được hợp nhất ngày 14 tháng 10 năm 2026. Các pull request nguồn không nêu phiên bản npm ổn định nào đã chứa chúng. Kết quả benchmark chỉ áp dụng cho thay đổi và khối lượng công việc được đo.

## Nguồn

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
