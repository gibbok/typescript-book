---
title: الأنواع الشرطية
sidebar:
  order: 40
  label: 40. الأنواع الشرطية
---


الأنواع الشرطية هي طريقة لإنشاء نوع يعتمد على شرط، حيث يُحدَّد النوع المراد إنشاؤه استنادًا إلى نتيجة الشرط. وتُعرَّف باستخدام الكلمة المفتاحية `extends` والمعامل الثلاثي للاختيار المشروط بين نوعين.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

