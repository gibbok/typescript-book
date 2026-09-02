---
title: ตัวแก้ไข Mapped Type
sidebar:
  order: 39
  label: 39. ตัวแก้ไข Mapped Type
---


ตัวแก้ไข Mapped Type ใน TypeScript ช่วยให้แปลงพร็อพเพอร์ตีภายในชนิดที่มีอยู่ได้:

* `readonly` หรือ `+readonly`: ทำให้พร็อพเพอร์ตีใน mapped type เป็นแบบอ่านอย่างเดียว
* `-readonly`: ทำให้พร็อพเพอร์ตีใน mapped type สามารถแก้ไขได้
* `?`: กำหนดให้พร็อพเพอร์ตีใน mapped type เป็นแบบไม่บังคับ

ตัวอย่าง:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

