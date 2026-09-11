---
title: API TypeScript native bổ sung hệ thống tệp ảo phân lớp
description: API TypeScript native có thể cập nhật snapshot bằng hệ thống tệp ảo trong bộ nhớ hoặc phân lớp, gồm thêm, thay đổi, xóa tệp và fallback về host.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Đã xuất bản:** 9 tháng 9, 2026

API TypeScript native giờ có thể tạo và cập nhật snapshot bằng dữ liệu hệ thống tệp ảo tường minh. Công cụ có thể mô hình hóa việc thêm, sửa và xóa tệp mà không cần dựng lại toàn bộ đầu vào của hệ thống tệp.

## Thay đổi

Các helper mới `createFileSystem`, `createFileSystemWithLib` và `createFileSystemLayer` tạo đối tượng VFS mà API snapshot chấp nhận. `Snapshot.update` có thể áp dụng một lớp cache mới lên snapshot hiện có.

VFS `full` nằm hoàn toàn trong bộ nhớ và không fallback về callback hệ thống tệp của host hoặc session. VFS `layer` fallback về host khi cache miss và có thể dùng `removedPaths` để ẩn tệp hoặc thư mục tồn tại trên host. Cả hai dạng đều hỗ trợ symbolic link bên trong hệ thống tệp ảo và tới đường dẫn trên host.

## Giới hạn hiện tại

Snapshot dựa trên VFS vẫn được tính là snapshot thực, vì vậy API native giữ giới hạn hiện tại là chỉ một snapshot thực tại một thời điểm. Do đó các thao tác snapshot hiện vẫn chạy tuần tự.

## Nguồn

Đọc pull request TypeScript đã được merge: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
