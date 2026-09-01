# TypeScript 7 sửa khả năng truy cập setter trong union và intersection


**Đã xuất bản:** August 24, 2026

Microsoft đã merge một bản sửa cho bộ kiểm tra TypeScript native, giữ khả năng truy cập đọc và ghi tách biệt đối với các thuộc tính được tổng hợp từ union và intersection.

## Nội dung thay đổi

Trước đây, khả năng truy cập setter có thể bị bỏ qua đối với các thuộc tính tổng hợp này vì việc kiểm tra thực tế dùng khả năng truy cập của getter. Do đó, một getter public đi kèm setter protected có thể cho phép ghi không hợp lệ thông qua union hoặc intersection.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

Bộ kiểm tra hiện ghi nhận khả năng truy cập ghi một cách riêng biệt. Việc đọc `foo` vẫn hợp lệ, trong khi việc gán giá trị cho nó báo lỗi khả năng truy cập đúng như mong đợi.

## Vì sao điều này quan trọng

Class có thể cố ý cho phép đọc công khai trong khi hạn chế ghi. Bản sửa này giữ đúng ranh giới đó khi TypeScript kết hợp các object type thành union hoặc intersection, thay vì vô tình mở rộng quyền ghi.

## Tình trạng khả dụng

Thay đổi này đã được merge vào codebase TypeScript native sau TypeScript 7.0. Nguồn không chỉ rõ phiên bản npm ổn định nào bao gồm thay đổi này, vì vậy hãy kiểm tra release notes của phiên bản đã cài đặt trước khi dựa vào hành vi này.

## Nguồn

Đọc pull request TypeScript đã merge: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
