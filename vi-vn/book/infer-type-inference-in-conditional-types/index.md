# Suy luận kiểu infer trong Conditional Type



Từ khóa `infer` được sử dụng trong conditional type để suy luận (trích xuất) kiểu của một tham số generic từ một kiểu phụ thuộc vào nó. Điều này cho phép bạn viết các định nghĩa kiểu linh hoạt và có thể tái sử dụng hơn.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

