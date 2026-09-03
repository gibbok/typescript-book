---
title: النوع Unknown
sidebar:
  order: 46
  label: 46. النوع Unknown
---


في TypeScript، يمثّل النوع `unknown` قيمةً من نوع مجهول. وعلى خلاف النوع `any` الذي يسمح بأي نوع من القيم، يتطلب `unknown` فحصًا للنوع أو توكيدًا له قبل أن يمكن استخدامه بطريقة محددة، ولذلك لا يُسمح بإجراء أي عمليات على قيمة من النوع `unknown` من دون توكيد نوع أكثر تحديدًا أو تضييق النوع إليه أولًا.

لا يمكن إسناد النوع `unknown` إلا إلى `any` وإلى `unknown` نفسه، وهو بديل آمن من ناحية الأنواع للنوع `any`.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

