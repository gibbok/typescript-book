# معدِّلات الأنواع المعيّنة



تتيح معدِّلات الأنواع المعيّنة في TypeScript تحويل الخصائص داخل نوع موجود:

* `readonly` أو `+readonly`: يجعل الخاصية في النوع المعيّن مخصّصة للقراءة فقط.
* `-readonly`: يجعل الخاصية في النوع المعيّن قابلة للتغيير.
* `?`: يجعل الخاصية في النوع المعيّن اختيارية.

أمثلة:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

