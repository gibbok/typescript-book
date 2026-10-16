---
title: النوع never
sidebar:
  order: 26
  label: 26. النوع never
---


عندما يُضيَّق متغير إلى نوع لا يمكن أن يحتوي على أي قيم، يستنتج مصرّف TypeScript أن المتغير لا بد أن يكون من النوع `never`. ويرجع ذلك إلى أن النوع never يمثّل قيمة لا يمكن إنتاجها مطلقًا.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // نوع val هنا هو never لأنه لا يمكن أن يكون سوى سلسلة نصية أو عدد
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

