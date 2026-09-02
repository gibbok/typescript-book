# ชนิดแบบมีเงื่อนไขที่แจกแจงได้



ชนิดแบบมีเงื่อนไขที่แจกแจงได้เป็นความสามารถที่ช่วยให้แจกแจงชนิดไปยังชนิดต่าง ๆ ในยูเนียน โดยใช้การแปลงกับสมาชิกแต่ละตัวของยูเนียนแยกกัน
สิ่งนี้มีประโยชน์อย่างยิ่งเมื่อทำงานกับ mapped type หรือชนิดลำดับสูง

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

