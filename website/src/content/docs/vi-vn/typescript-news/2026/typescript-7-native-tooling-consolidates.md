---
title: Công cụ native của TypeScript 7 đang được hợp nhất
description: Các maintainer TypeScript làm rõ rằng tên tsgo sẽ không còn được dùng, codebase native sẽ quay lại repository TypeScript chính, và extension VS Code native sẽ được bundle.
lastUpdated: 2026-07-27
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-27'
---

**Đã xuất bản:** July 27, 2026

Các maintainer TypeScript đã làm rõ cách công cụ TypeScript 7 native sẽ được hợp nhất sau bản phát hành ổn định.

## Nội dung thay đổi

Ryan Cavanaugh xác nhận rằng tên `tsgo` về cơ bản sẽ không còn được dùng. Codebase native dự kiến sẽ được chuyển trở lại repository `microsoft/TypeScript` chính để project có thể quay lại một backlog issue thống nhất.

Jake Bailey cũng làm rõ rằng extension VS Code native không được lên kế hoạch ngừng hỗ trợ. Thay vào đó, extension này dự kiến sẽ được bundle trong tương lai gần, tương tự extension JavaScript debugger.

Đối với lập trình viên, điều này có nghĩa là các tên preview và repository riêng là những phần chuyển tiếp của quá trình di chuyển sang TypeScript 7, không phải cấu trúc project dài hạn được dự định.

## Nguồn

Đọc thảo luận của maintainer: [Now that TypeScript 7.0 has been released, what will happen to typescript-go?](https://github.com/microsoft/typescript-go/discussions/4576).
