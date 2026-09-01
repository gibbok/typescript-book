---
title: TypeScript 7 làm mới diagnostics cấu hình sau khi file thay đổi
description: Language service native hiện đăng lại lỗi `tsconfig.json` và `jsconfig.json` sau khi các file cấu hình được theo dõi thay đổi.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Đã xuất bản:** July 30, 2026

Microsoft đã merge một bản sửa làm mới diagnostics của file cấu hình trong language service native của TypeScript sau khi một file `tsconfig.json` hoặc `jsconfig.json` được theo dõi thay đổi.

## Nội dung thay đổi

Diagnostics của file cấu hình được phát hành trong quá trình cập nhật snapshot của language service. Trước đây, một thay đổi ở file cấu hình được theo dõi sẽ lên lịch làm mới diagnostics nhưng không lên lịch cập nhật snapshot. Vì vậy, lỗi cấu hình mới có thể bị stale cho đến khi editor gửi một yêu cầu khác làm cập nhật snapshot.

Language service hiện phát hiện thay đổi ở các file cấu hình được theo dõi và lên lịch cập nhật snapshot có debounce. Điều này đăng lại pushed diagnostics mà không phụ thuộc vào một yêu cầu tiếp theo từ editor.

## Vì sao điều này quan trọng

Khi editor hoặc công cụ bên ngoài thay đổi một file `tsconfig.json` hoặc `jsconfig.json` được theo dõi, language service native có thể báo cáo lỗi cấu hình đã cập nhật chỉ từ sự kiện file-watcher. Một regression test xác minh hành vi này với giá trị `target` không hợp lệ.

## Tình trạng khả dụng

Thay đổi này đã được merge vào codebase TypeScript native sau bản phát hành TypeScript 7.0. Nguồn không chỉ rõ phiên bản npm ổn định nào bao gồm nó, vì vậy hãy kiểm tra release notes của phiên bản đã cài đặt trước khi dựa vào bản sửa này.

## Nguồn

Đọc thay đổi chính thức: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
