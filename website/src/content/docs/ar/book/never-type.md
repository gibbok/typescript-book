---
title: نوع Never
sidebar:
  order: 48
  label: 48. نوع Never
---


يمثّل النوع `never` القيم التي لا تحدث مطلقًا. ويُستخدم للدلالة على الدوال أو التعبيرات التي لا تعود مطلقًا أو ترمي خطأً.

على سبيل المثال، حلقة لا نهائية:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

رمي خطأ:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

النوع `never` مفيد في ضمان أمان الأنواع واكتشاف الأخطاء المحتملة في شيفرتك. فهو يساعد TypeScript على تحليل أنواع أكثر دقة واستدلالها عند استخدامه مع أنواع أخرى وتعليمات تدفق التحكم، على سبيل المثال:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

