# การอนุมานชนิดด้วย infer ในชนิดแบบมีเงื่อนไข



คีย์เวิร์ด `infer` ใช้ในชนิดแบบมีเงื่อนไขเพื่ออนุมาน (แยก) ชนิดของพารามิเตอร์ generic จากชนิดที่ขึ้นอยู่กับพารามิเตอร์นั้น ทำให้คุณเขียนนิยามชนิดที่ยืดหยุ่นและนำกลับมาใช้ซ้ำได้มากขึ้น

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

