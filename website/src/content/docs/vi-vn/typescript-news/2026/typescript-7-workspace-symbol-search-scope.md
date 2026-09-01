---
title: TypeScript 7 thêm phạm vi tìm kiếm workspace-symbol
description: Language service native thêm một thiết lập có thể giới hạn tìm kiếm workspace-symbol trong project hiện tại.
lastUpdated: 2026-08-07
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Đã xuất bản:** August 7, 2026

Microsoft đã merge một phạm vi tìm kiếm workspace-symbol cho language service native của TypeScript.

## Nội dung thay đổi

Preference `workspaceSymbols.scope` mới có hai giá trị. `allOpenProjects` là mặc định và tìm kiếm symbol trên mọi project đang mở. `currentProject` giới hạn tìm kiếm trong các project chứa document được cung cấp.

Extension VS Code native hiện thêm một document TypeScript hoặc JavaScript được hỗ trợ vào các request `workspace/symbol`. Nó ưu tiên document đang active và nếu không thì dùng một document được hỗ trợ đang mở. Language service chỉ dùng document đó khi `workspaceSymbols.scope` là `currentProject`; nếu không, nó giữ tìm kiếm trên mọi project đang mở.

## Vì sao điều này quan trọng

Trong một workspace chứa nhiều project có các symbol được đặt tên tương tự, `currentProject` có thể giới hạn tập kết quả vào project liên quan. Mặc định giữ nguyên hành vi hiện có, nên thay đổi này là opt-in.

## Tình trạng khả dụng

Thay đổi này đã được merge vào codebase TypeScript native sau TypeScript 7.0. Nguồn không chỉ rõ phiên bản npm ổn định nào bao gồm nó, vì vậy hãy kiểm tra release notes của phiên bản đã cài đặt trước khi dựa vào thiết lập này.
