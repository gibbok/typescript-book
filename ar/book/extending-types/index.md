# توسعة الأنواع



يمكن توسيع `interface` (بنسخ الأعضاء من نوع آخر):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

يمكن أيضًا التوسيع من أنواع متعددة:

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

تعمل الكلمة المفتاحية `extends` فقط مع الواجهات والفئات، أما الأنواع فتستخدم التقاطع:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

يمكن توسيع نوع باستخدام واجهة، ولكن ليس العكس:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

