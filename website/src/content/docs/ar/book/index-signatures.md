---
title: تواقيع الفهرسة
sidebar:
  order: 15
  label: 15. تواقيع الفهرسة
---


في TypeScript، يمكننا استخدام `string` و`number` و`symbol` كتواقيع فهرسة:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

يرجى ملاحظة أن JavaScript يحوّل تلقائيًا فهرسًا من النوع `number` إلى فهرس من النوع `string`، ولذلك يُرجع `k[1]` أو `k["1"]` القيمة نفسها.

