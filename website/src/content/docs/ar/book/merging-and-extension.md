---
title: الدمج والتوسيع
sidebar:
  order: 53
  label: 53. الدمج والتوسيع
---


يشير الدمج والتوسيع إلى مفهومين مختلفين يتعلقان بالتعامل مع الأنواع والواجهات.

يتيح لك الدمج ضم عدة تصريحات تحمل الاسم نفسه في تعريف واحد، على سبيل المثال، عندما تعرّف واجهة بالاسم نفسه عدة مرات:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

يشير التوسيع إلى القدرة على توسيع الأنواع أو الواجهات الموجودة أو الوراثة منها لإنشاء أنواع أو واجهات جديدة. وهو آلية لإضافة خصائص أو أساليب إضافية إلى نوع موجود من دون تعديل تعريفه الأصلي. مثال:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

