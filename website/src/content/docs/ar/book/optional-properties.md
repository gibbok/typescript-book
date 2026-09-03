---
title: الخصائص الاختيارية
sidebar:
  order: 13
  label: 13. الخصائص الاختيارية
---


يمكن للكائن تحديد خصائص اختيارية بإضافة علامة استفهام `?` إلى نهاية اسم الخاصية:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

يمكن تحديد قيمة افتراضية عندما تكون الخاصية اختيارية:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

