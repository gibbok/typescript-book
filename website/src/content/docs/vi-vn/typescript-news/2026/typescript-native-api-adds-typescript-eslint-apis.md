---
title: API native của TypeScript bổ sung các API mà typescript-eslint cần
description: API native của TypeScript bổ sung các API về bộ kiểm tra và kiểu mà typescript-eslint cần, giảm khoảng trống tương thích cho công cụ.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Xuất bản:** 14 tháng 9, 2026

API native của TypeScript hiện cung cấp thêm các API về bộ kiểm tra và kiểu mà `typescript-eslint` cần, giúp giảm khoảng trống tương thích cho các công cụ phụ thuộc vào API lập trình của TypeScript.

## Những thay đổi

Thay đổi bổ sung các API như `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` và `getExportSymbolOfSymbol`. Kiểu interface và class cũng có thêm `getThisType()`, còn `IndexKind` được xuất để truy vấn kiểu chỉ mục.

Cả bề mặt API native đồng bộ và bất đồng bộ đều được cập nhật.

## Vì sao điều này quan trọng

Pull request TypeScript này được tạo riêng để bổ sung các API mà `typescript-eslint` xác định là còn thiếu. Nhờ đó, các tích hợp có thể truy cập thêm thông tin về bộ kiểm tra và kiểu mà chúng vốn mong đợi từ API TypeScript hiện có.

## Nguồn

Đọc pull request TypeScript chính thức: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
