# مساحات الأسماء



في TypeScript، تُستخدم مساحات الأسماء لتنظيم الشيفرة في حاويات منطقية، ومنع تعارض الأسماء، وتوفير طريقة لتجميع الشيفرة المترابطة معًا.
يتيح استخدام الكلمة المفتاحية `export` الوصول إلى مساحة الاسم من خارج الوحدات.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

