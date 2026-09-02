# ชนิดจากค่า



ชนิดจากค่าใน TypeScript หมายถึงการอนุมานชนิดจากค่าหรือนิพจน์โดยอัตโนมัติผ่านกลไกการอนุมานชนิด

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

