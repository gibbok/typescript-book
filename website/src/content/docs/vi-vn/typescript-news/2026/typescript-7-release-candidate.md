---
title: TypeScript 7.0 release candidate được công bố
description: TypeScript 7.0 release candidate giới thiệu trước compiler native, build song song, các thay đổi tương thích và hỗ trợ editor mở rộng.
lastUpdated: 2026-06-18
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Đã xuất bản:** June 18, 2026

Microsoft đã phát hành TypeScript 7.0 release candidate như bản preview cuối cùng trước bản phát hành TypeScript 7 ổn định.

## Nội dung thay đổi

Release candidate chuyển TypeScript sang compiler và language service mới dựa trên Go. Logic kiểm tra kiểu của nó được port từ TypeScript 6 để giữ nguyên semantics hiện có, đồng thời cải thiện hiệu năng thông qua native code và shared-memory parallelism.

TypeScript 7 thêm kiểm tra kiểu song song và build project-reference. Tùy chọn `--checkers` kiểm soát số worker kiểm tra kiểu, trong khi `--builders` kiểm soát số builder cho project-reference.

Tại thời điểm thông báo, release candidate có thể được cài đặt từ npm:

```shell
npm install --save-dev typescript@rc
```

## Tương thích

Release candidate không bao gồm API lập trình ổn định. Đội ngũ TypeScript cung cấp package tương thích `@typescript/typescript6` để các công cụ cần API TypeScript 6 có thể chạy cùng compiler mới.

Release candidate cũng áp dụng các mặc định của TypeScript 6 và xem các tùy chọn đã deprecated trong TypeScript 6 là lỗi. Các nhóm được khuyến nghị di chuyển sang TypeScript 6 trước khi đánh giá TypeScript 7.

## Nguồn

Đọc thông báo chính thức: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
