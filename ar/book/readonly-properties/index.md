# الخصائص المخصّصة للقراءة فقط



يمكن منع الكتابة إلى خاصية باستخدام المعدِّل `readonly`، الذي يضمن عدم إمكان إعادة كتابة الخاصية، لكنه لا يوفر أي ضمان بعدم قابلية التغيير الكاملة:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

