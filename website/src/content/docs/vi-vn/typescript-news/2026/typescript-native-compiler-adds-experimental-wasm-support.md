---
title: "Trình biên dịch TypeScript gốc bổ sung hỗ trợ WebAssembly thử nghiệm"
description: "Một thay đổi TypeScript đã được hợp nhất bổ sung bản dựng WASI WebAssembly thử nghiệm cho CLI, máy chủ ngôn ngữ và API JavaScript trên trình duyệt."
lastUpdated: 2026-10-29
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-29'
---

**Ngày đăng:** 2026-10-29

Ngày 29 tháng 10 năm 2026, Microsoft đã hợp nhất hỗ trợ `wasip1/wasm` thử nghiệm vào trình biên dịch TypeScript gốc. Thay đổi này cho phép chạy trình biên dịch trong môi trường WASI và cung cấp phương thức truyền tải API JavaScript có thể dùng trong trình duyệt.

## Có gì thay đổi

* Cùng một `tsc.wasm` có thể chạy như lệnh WASI cho CLI hoặc máy chủ ngôn ngữ, hay như reactor cho các lệnh gọi API JavaScript đồng bộ và bất đồng bộ.
* Gói hiện vật mới `@typescript/typescript-wasip1-wasm` chứa trình biên dịch WebAssembly và các tệp thư viện. Host `typescript/wasm` cung cấp `instantiateWasm` và `instantiateWasmSync`; hai gói phải dùng chính xác cùng một phiên bản.
* Tiện ích VS Code for Web có thêm điểm vào chạy `tsc.wasm --lsp`. Thay đổi cũng bao gồm kiểm thử API trên Node.js và kiểm thử smoke trong trình duyệt Chromium.

## Tình trạng phát hành

Đây là thay đổi thử nghiệm đã được hợp nhất, không phải thông báo phát hành WebAssembly ổn định. Tệp nhị phân, cấu trúc gói và host `typescript/wasm` có thể thay đổi mà không báo trước.

## Nguồn

[Đọc pull request TypeScript đã hợp nhất](https://github.com/microsoft/TypeScript/pull/64174).
