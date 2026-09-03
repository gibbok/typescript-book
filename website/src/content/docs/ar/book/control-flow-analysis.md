---
title: تحليل تدفق التحكم
sidebar:
  order: 23
  label: 23. تحليل تدفق التحكم
---


تحليل تدفق التحكم في TypeScript هو طريقة لتحليل تدفق الشيفرة تحليلاً ساكنًا لاستدلال أنواع المتغيرات، ما يسمح للمصرّف بتضييق أنواع تلك المتغيرات حسب الحاجة استنادًا إلى نتائج التحليل.

قبل TypeScript 4.4، كان تحليل تدفق الشيفرة يُطبَّق فقط على الشيفرة داخل عبارة if، ولكن بدءًا من TypeScript 4.4، يمكن تطبيقه أيضًا على التعبيرات الشرطية والوصول إلى الخصائص المميِّزة المشار إليها بصورة غير مباشرة من خلال متغيرات const.

على سبيل المثال:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

بعض الأمثلة التي لا يحدث فيها التضييق:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

ملاحظات: يُحلَّل ما يصل إلى خمسة مستويات من الإحالة غير المباشرة في التعبيرات الشرطية.

