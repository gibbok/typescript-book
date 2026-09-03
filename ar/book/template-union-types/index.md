# أنواع اتحادات القوالب



يمكن استخدام أنواع اتحادات القوالب لدمج النصوص ومعالجتها داخل نظام الأنواع، على سبيل المثال:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

