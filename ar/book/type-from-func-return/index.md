# النوع من القيمة المرجعة للدالة



يشير «النوع من القيمة المرجعة للدالة» إلى القدرة على استدلال نوع الإرجاع لدالة تلقائيًا استنادًا إلى تنفيذها. ويتيح ذلك لـ TypeScript تحديد نوع القيمة التي تُرجعها الدالة من دون تعليقات توضيحية صريحة للنوع.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

