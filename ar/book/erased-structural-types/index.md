# الأنواع البنيوية الممحوة



في TypeScript، لا يلزم أن تتطابق الكائنات مع نوع محدد ودقيق. على سبيل المثال، إذا أنشأنا كائنًا يستوفي متطلبات واجهة، فيمكننا استخدام ذلك الكائن في المواضع التي تتطلب هذه الواجهة، حتى لو لم توجد أي صلة صريحة بينهما.
مثال:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

