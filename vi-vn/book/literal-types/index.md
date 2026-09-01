# Literal Type



Literal Type là một tập hợp một phần tử trong một kiểu tập hợp; nó định nghĩa một giá trị rất chính xác là primitive của JavaScript.

Literal Type trong TypeScript là số, chuỗi và boolean.

Ví dụ về literal:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

String, Numeric và Boolean Literal Type được dùng trong union, type guard và type alias.
Trong ví dụ sau, bạn có thể thấy một union type alias. `O` chỉ gồm các giá trị đã chỉ định, không có chuỗi nào khác hợp lệ:

```typescript
type O = 'a' | 'b' | 'c';
```

