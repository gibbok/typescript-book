# TypeScript tăng tốc biên dịch tăng dần bằng kiểm tra song song


Thay đổi đã được hợp nhất vào trình biên dịch cho phép kiểm tra song song chữ ký của các tệp bị ảnh hưởng khi sửa mô-đun được nhập rộng rãi. Trước đây bước này chạy tuần tự.

## Điều gì thay đổi

Trong phép đo của tác giả, lần biên dịch sau khi chỉ sửa chú thích giảm từ **3,4 xuống 1,5 giây** trên Linux 32 lõi. Với một gói n8n, trường hợp tương tự giảm từ **5,4 xuống 4,5 giây**. Đây là kết quả theo từng khối lượng công việc.

## Hiệu năng và giới hạn

Công việc được giới hạn bởi `GOMAXPROCS`; lợi ích phụ thuộc vào số bộ kiểm tra và quan hệ phụ thuộc. Không có lợi ích cho `isolatedModules` vì không duyệt các tệp tham chiếu.

## Nguồn

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
