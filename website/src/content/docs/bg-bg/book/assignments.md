---
title: Присвоявания
sidebar:
  order: 22
  label: 22. Присвоявания
---


Свиването на типове в TypeScript чрез присвоявания е начин да се стесни типът на променлива въз основа на стойността, която ѝ е присвоена. Когато на променлива се присвои стойност, TypeScript извежда нейния тип въз основа на присвоената стойност и стеснява типа на променливата, за да съответства на изведения тип.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

