---
title: النوع من الوحدة
sidebar:
  order: 37
  label: 37. النوع من الوحدة
---


يشير «النوع من الوحدة» إلى القدرة على استخدام القيم التي تصدّرها الوحدة لاستدلال أنواعها تلقائيًا. عندما تصدّر وحدة قيمة من نوع محدد، يمكن لـ TypeScript استخدام تلك المعلومات لاستدلال نوع تلك القيمة تلقائيًا عند استيرادها إلى وحدة أخرى.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

