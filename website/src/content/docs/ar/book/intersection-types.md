---
title: أنواع التقاطع
sidebar:
  order: 33
  label: 33. أنواع التقاطع
---


نوع التقاطع هو نوع يمثّل قيمة تمتلك جميع خصائص نوعين أو أكثر. ويُعبَّر عن أنواع التقاطع باستخدام الرمز `&` بين كل نوع.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

