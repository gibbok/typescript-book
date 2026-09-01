---
title: การทำดัชนีชนิด
sidebar:
  order: 34
  label: 34. การทำดัชนีชนิด
---


การทำดัชนีชนิดหมายถึงความสามารถในการกำหนดชนิดที่สามารถเข้าถึงด้วยคีย์ซึ่งไม่ทราบล่วงหน้า โดยใช้ลายเซ็นดัชนีเพื่อระบุชนิดสำหรับพร็อพเพอร์ตีที่ไม่ได้ประกาศไว้อย่างชัดเจน

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

