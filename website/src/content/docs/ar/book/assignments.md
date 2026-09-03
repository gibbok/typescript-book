---
title: الإسنادات
sidebar:
  order: 22
  label: 22. الإسنادات
---


تضييق الأنواع في TypeScript باستخدام الإسنادات هو طريقة لتضييق نوع متغير استنادًا إلى القيمة المسندة إليه. عندما تُسنَد قيمة إلى متغير، يستنتج TypeScript نوعه استنادًا إلى القيمة المسندة، ويضيّق نوع المتغير ليتطابق مع النوع المستنتج.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

