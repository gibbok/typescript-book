# Namespace



ใน TypeScript namespace ใช้จัดระเบียบโค้ดให้อยู่ในคอนเทนเนอร์เชิงตรรกะ ป้องกันชื่อซ้ำกัน และเป็นวิธีจัดกลุ่มโค้ดที่เกี่ยวข้องไว้ด้วยกัน
การใช้คีย์เวิร์ด `export` ทำให้สามารถเข้าถึง namespace ได้จากภายนอกโมดูล

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

