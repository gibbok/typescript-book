---
title: استدلال الأنواع الحرفية
sidebar:
  order: 18
  label: 18. استدلال الأنواع الحرفية
---


استدلال الأنواع الحرفية ميزة في TypeScript تسمح باستدلال نوع متغير أو معامل استنادًا إلى قيمته.

في المثال الآتي، يمكننا أن نرى أن TypeScript يعدّ `x` نوعًا حرفيًا لأن القيمة لا يمكن تغييرها في أي وقت لاحق، بينما يُستنتج `y` بوصفه من النوع string لأنه يمكن تعديله في أي وقت لاحق.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

في المثال الآتي، يمكننا أن نرى أن `o.x` استُنتج بوصفه `string` (لا قيمة حرفية من `a`) لأن TypeScript يعتبر أن القيمة يمكن تغييرها في أي وقت لاحق.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

كما ترى، تطرح الشيفرة خطأ عند تمرير `o.x` إلى `fn` لأن X نوع أضيق.

يمكننا حل هذه المشكلة باستخدام توكيد نوع مع `const` أو النوع `X`:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

أو:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

