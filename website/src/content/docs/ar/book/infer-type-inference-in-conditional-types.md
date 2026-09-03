---
title: استدلال النوع باستخدام infer في الأنواع الشرطية
sidebar:
  order: 42
  label: 42. استدلال النوع باستخدام infer في الأنواع الشرطية
---


تُستخدم الكلمة المفتاحية `infer` في الأنواع الشرطية لاستدلال (استخراج) نوع معامل عام من نوع يعتمد عليه. ويتيح لك ذلك كتابة تعريفات أنواع أكثر مرونة وقابلية لإعادة الاستخدام.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

