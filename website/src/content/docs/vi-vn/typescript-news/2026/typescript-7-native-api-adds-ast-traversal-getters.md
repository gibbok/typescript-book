---
title: API native của TypeScript 7 thêm getter cho nút con và token của AST
description: API native của TypeScript thêm các phương thức Node để duyệt nút con và token, thu hẹp khác biệt với API JavaScript cho công cụ cây cú pháp.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Đã xuất bản:** 3 tháng 9, 2026

API native của TypeScript hiện cung cấp năm helper `Node` để duyệt các nút con và token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` và `getLastToken()`.

## Điều gì thay đổi

PR #63893 bổ sung các getter cho nút con và token còn thiếu nhưng đã có trong API TypeScript dựa trên JavaScript. Thay đổi này hoàn thiện phần nút con/token của API native `Node` sau khi các getter vị trí và văn bản đã được thêm trước đó.

## Vì sao điều này quan trọng

Các phương thức này hữu ích cho người dùng API cần duyệt cây cú pháp, bao gồm các công cụ phải kiểm tra cả token lẫn nút con. API native giờ có thể dùng cùng các helper duyệt `Node` cho những trường hợp này.

## Nguồn

Xem [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) và [issue theo dõi](https://github.com/microsoft/TypeScript/issues/63892).
