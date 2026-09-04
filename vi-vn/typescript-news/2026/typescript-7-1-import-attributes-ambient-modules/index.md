# TypeScript 7.1 thêm thuộc tính import cho ambient module


**Đã xuất bản:** 1 tháng 9, 2026

Trình biên dịch native của TypeScript giờ hỗ trợ kiểu thuộc tính import trong khai báo ambient module dạng mẫu. Nhờ đó, khai báo có thể phân biệt import bằng các thuộc tính như `type: 'css'` hoặc `type: 'text'`.

## Thay đổi

Khi một import có thuộc tính, TypeScript có thể phân giải nó tới ambient module dạng mẫu phù hợp. Việc khớp dùng tính gán được; nếu có nhiều khai báo phù hợp, TypeScript chọn khai báo có kiểu thuộc tính cụ thể nhất.

Hiện tại, kiểu thuộc tính trong các khai báo này chỉ được phép là thuộc tính thông thường có giá trị là kiểu literal chuỗi. Các khai báo có cùng mẫu và kiểu thuộc tính giống hệt nhau có thể hợp nhất; các kiểu khác nhau vẫn tách biệt.

## Tương thích

Thay đổi đã được merge cho milestone TypeScript 7.1.0 Beta. Nó không thêm sẵn khai báo import CSS hoặc văn bản vào thư viện chuẩn, vì vậy dự án và tooling vẫn cần tự định nghĩa các ambient module cần thiết.

## Nguồn

Đọc pull request TypeScript đã được merge: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
