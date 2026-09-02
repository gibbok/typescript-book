# พร็อพเพอร์ตีแบบอ่านอย่างเดียว



สามารถป้องกันการเขียนลงในพร็อพเพอร์ตีได้โดยใช้ตัวแก้ไข `readonly` ซึ่งทำให้แน่ใจว่าจะไม่สามารถเขียนพร็อพเพอร์ตีนั้นซ้ำได้ แต่ไม่ได้รับประกันว่าจะเปลี่ยนแปลงไม่ได้ทั้งหมด:

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

