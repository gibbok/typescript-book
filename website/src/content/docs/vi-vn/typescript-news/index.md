---
title: Tin tức TypeScript
description: Các bản tóm tắt ngắn gọn về những bản phát hành, thông báo và thay đổi chính thức mới nhất của TypeScript dành cho lập trình viên TypeScript.
sidebar:
    hidden: true
---

Theo dõi các bản phát hành và cập nhật quan trọng của TypeScript qua những bản tóm tắt ngắn gọn dựa trên các nguồn TypeScript chính thức.

## Tin mới nhất

### [TypeScript 7.1 thêm thuộc tính import cho ambient module](./2026/typescript-7-1-import-attributes-ambient-modules/)

**Đã xuất bản:** 1 tháng 9, 2026

Ambient module dạng mẫu giờ có thể khai báo kiểu cho thuộc tính import, giúp TypeScript chọn kiểu dựa trên thuộc tính của import.

### [TypeScript 7 sửa khả năng truy cập setter trong union và intersection](./2026/typescript-7-fixes-setter-accessibility/)

**Đã xuất bản:** August 24, 2026

Bộ kiểm tra native hiện tôn trọng khả năng truy cập setter tách biệt với khả năng truy cập getter trên các thuộc tính của union và intersection.

### [TypeScript 7 thêm phạm vi tìm kiếm workspace-symbol](./2026/typescript-7-workspace-symbol-search-scope/)

**Đã xuất bản:** August 7, 2026

Language service native thêm một thiết lập có thể giới hạn việc tìm kiếm workspace-symbol trong project hiện tại thay vì mọi project đang mở.

### [TypeScript 7 cải thiện mức sử dụng bộ nhớ của Go to Implementation](./2026/typescript-7-go-to-implementation-memory-fix/)

**Đã xuất bản:** July 30, 2026

Language service native hiện tránh tăng trưởng bộ nhớ bậc hai khi tìm nhiều implementation trong các project lớn có kiểu phức tạp sâu.

### [TypeScript 7 làm mới diagnostics cấu hình sau khi file thay đổi](./2026/typescript-7-refreshes-config-diagnostics/)

**Đã xuất bản:** July 30, 2026

Language service native hiện đăng lại lỗi `tsconfig.json` và `jsconfig.json` sau khi các file cấu hình được theo dõi thay đổi.

### [Công cụ native của TypeScript 7 đang được hợp nhất](./2026/typescript-7-native-tooling-consolidates/)

**Đã xuất bản:** July 27, 2026

Các maintainer làm rõ rằng tên `tsgo` sẽ không còn được dùng, codebase native sẽ quay lại repository TypeScript chính, và extension VS Code native sẽ được bundle.

### [API native của TypeScript 7 thêm các phương thức emit](./2026/typescript-7-native-api-adds-emit-methods/)

**Đã xuất bản:** July 24, 2026

API TypeScript native thêm các phương thức emit ra hệ thống file và trong bộ nhớ cho toàn bộ program và các output JavaScript hoặc declaration được chọn.

### [TypeScript 7.0 hiện đã khả dụng](./2026/typescript-7-released/)

**Đã xuất bản:** July 8, 2026

TypeScript 7 giới thiệu compiler và language service mới dựa trên Go, với tốc độ build và thao tác editor nhanh hơn đáng kể.

### [TypeScript 7.0 release candidate được công bố](./2026/typescript-7-release-candidate/)

**Đã xuất bản:** June 18, 2026

Đội ngũ TypeScript đã phát hành bản preview cuối cùng của TypeScript 7, bao gồm kiểm tra kiểu song song, build project và hỗ trợ editor mở rộng.
