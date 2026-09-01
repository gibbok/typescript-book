# Modifier của Mapped Type



Mapped Type Modifier trong TypeScript cho phép biến đổi các thuộc tính trong một kiểu hiện có:

* `readonly` hoặc `+readonly`: Làm cho một thuộc tính trong mapped type chỉ đọc.
* `-readonly`: Cho phép một thuộc tính trong mapped type có thể thay đổi.
* `?`: Đánh dấu một thuộc tính trong mapped type là tùy chọn.

Ví dụ:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

