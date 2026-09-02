# การขยายชนิด



สามารถขยาย `interface` ได้ (คัดลอกสมาชิกจากชนิดอื่น):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

นอกจากนี้ยังสามารถขยายจากหลายชนิดได้:

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

คีย์เวิร์ด `extends` ใช้ได้เฉพาะกับอินเทอร์เฟซและคลาส ส่วน type ให้ใช้ intersection:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

สามารถขยาย type โดยใช้อินเทอร์เฟซได้ แต่ไม่สามารถทำในทางกลับกันได้:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

