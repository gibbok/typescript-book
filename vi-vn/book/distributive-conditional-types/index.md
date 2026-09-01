# Distributive Conditional Type



Distributive Conditional Type là một tính năng cho phép một kiểu được phân phối trên một union các kiểu bằng cách áp dụng một phép biến đổi riêng cho từng thành viên của union.
Điều này có thể đặc biệt hữu ích khi làm việc với mapped type hoặc higher-order type.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

