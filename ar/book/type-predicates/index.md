# مسندات الأنواع



مسندات الأنواع في TypeScript هي دوال تُرجع قيمة منطقية وتُستخدم لتضييق نوع متغير إلى نوع أكثر تحديدًا.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

يستنتج TypeScript 5.5 مسندات الأنواع تلقائيًا (مثل `x is T`) في دوال مثل `.filter`، ولذلك يعرف متى تُزال قيم مثل undefined، ما يوفر أنواعًا أدق وأخطاء أقل. ويعمل هذا مع عمليات التحقق الواضحة (مثل `x !== undefined`) ولكن ليس مع العمليات الملتبسة مثل `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

