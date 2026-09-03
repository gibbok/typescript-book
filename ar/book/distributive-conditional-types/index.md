# الأنواع الشرطية التوزيعية



الأنواع الشرطية التوزيعية هي ميزة تسمح بتوزيع نوع على اتحاد من الأنواع من خلال تطبيق تحويل على كل عضو في الاتحاد على حدة.
يمكن أن يكون هذا مفيدًا خصوصًا عند التعامل مع الأنواع المعيّنة أو الأنواع عالية الرتبة.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

