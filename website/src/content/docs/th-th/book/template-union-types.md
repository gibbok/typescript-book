---
title: ชนิดยูเนียนเทมเพลต
sidebar:
  order: 44
  label: 44. ชนิดยูเนียนเทมเพลต
---


ชนิดยูเนียนเทมเพลตสามารถใช้รวมและจัดการข้อความภายในระบบชนิดได้ ตัวอย่างเช่น:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

