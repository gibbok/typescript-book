# TypeScript 7.0 hiện đã khả dụng


**Đã xuất bản:** July 8, 2026

Microsoft đã phát hành TypeScript 7.0, phiên bản ổn định đầu tiên được xây dựng trên codebase Go native mới của project.

## Nội dung thay đổi

TypeScript 7 dùng native code, đa luồng bộ nhớ chia sẻ và các tối ưu hóa bổ sung. Theo đội ngũ TypeScript, full build trong các benchmark đã công bố nhanh hơn TypeScript 6 từ 7,7 đến 11,9 lần.

Bản phát hành này cũng chuyển language service sang Language Server Protocol. Các editor được hỗ trợ có thể dùng cùng nền tảng native để tải project, diagnostics, completions và navigation nhanh hơn.

Cài đặt bản phát hành ổn định từ npm:

```shell
npm install --save-dev typescript
```

## Tương thích

TypeScript 7.0 không cung cấp API lập trình ổn định. Các công cụ embed TypeScript, bao gồm Astro, Vue, MDX, Svelte hiện tại và một số workflow Angular, có thể vẫn cần TypeScript 6 cho đến khi API mới khả dụng.

Đội ngũ TypeScript dự kiến giới thiệu API mới trong TypeScript 7.1. Các project nên kiểm tra hỗ trợ của framework và tooling trước khi nâng cấp.

## Nguồn

Đọc thông báo chính thức: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
