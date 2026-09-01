---
title: API native của TypeScript 7 thêm các phương thức emit
description: API TypeScript native thêm các phương thức emit ra hệ thống file và trong bộ nhớ cho toàn bộ program và các output JavaScript hoặc declaration được chọn.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Đã xuất bản:** July 24, 2026

Codebase TypeScript native đã thêm các API emit theo chương trình cho những công cụ cần tạo output JavaScript hoặc declaration.

## Nội dung thay đổi

API đã merge cung cấp bốn đường emit với hành vi output và lựa chọn khác nhau.

* `program.emit(emitOnly?: EmitOnly)` emit toàn bộ program ra hệ thống file, bao gồm hệ thống file ảo đã cấu hình, và tôn trọng các tùy chọn chặn emit như `noEmit` và `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` emit toàn bộ program thành kết quả string trong bộ nhớ và cũng tôn trọng các tùy chọn chặn emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` trả về output JavaScript trong bộ nhớ cho các file được chọn và bỏ qua các tùy chọn chặn emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` cung cấp output declaration tương ứng cho các file được chọn.

Điều này cho phép người dùng API có các lựa chọn riêng cho emit toàn bộ program thông thường và output trong bộ nhớ có mục tiêu.

## Tình trạng khả dụng

Thay đổi này đã được merge vào codebase TypeScript native vào ngày July 24, 2026. Nguồn không chỉ rõ phiên bản npm ổn định nào chứa các API này, vì vậy các công cụ nên xác minh hỗ trợ trong phiên bản TypeScript mà chúng sử dụng.

## Nguồn

Đọc pull request chính thức: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
