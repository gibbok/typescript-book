---
title: "TypeScript 7.1 Beta bổ sung API dạng mô-đun và hỗ trợ ES2026"
description: "TypeScript 7.1 Beta thêm API native dạng mô-đun, ES2026, source import, content mapper và cải thiện hiệu năng."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Xuất bản:** 20 tháng 10 năm 2026

Microsoft phát hành TypeScript 7.1 Beta với các API trình biên dịch native mới và hỗ trợ tính năng JavaScript. Dùng lệnh sau để thử bản beta:

```shell
npm install -D typescript@beta
```

## Những thay đổi chính

* `--target es2026` và `--lib es2026` hiện được hỗ trợ như các tùy chọn ổn định, cùng các khai báo thư viện chuẩn đã cập nhật.
* Các điểm vào API mới gồm `typescript/sync`, `typescript/async`, `typescript/fs` và `typescript/ast`. Đối tượng `API` và `Program` phải được giải phóng, chẳng hạn bằng `using`.
* Source-phase import (`import source` và `import.source()`) hỗ trợ đối tượng nguồn mô-đun, kể cả trường hợp WebAssembly, với thiết lập `--module` và `esnext` phù hợp.
* Content mapper giúp TypeScript xử lý mã nhúng trong các tệp như `.vue` và `.svelte`. Chạy từ dòng lệnh cần `--runExternalCode`.
* Theo benchmark Microsoft công bố, quá trình build nhanh hơn và dùng ít bộ nhớ hơn TypeScript 7.0.

## Tình trạng phát hành

Đây là bản beta, chưa phải bản ổn định. Hãy kiểm tra khả năng tương thích của framework và công cụ trước khi nâng cấp. Hỗ trợ thuộc tính import trong ambient module đã được đề cập ở bài khác.

## Nguồn

Đọc thông báo chính thức: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
