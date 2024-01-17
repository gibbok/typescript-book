---
title: 可区分联合
sidebar:
  order: 24
  label: 24. 可区分联合
---


TypeScript 中的可区分联合是一种联合类型，它使用称为判别式的公共属性来缩小联合的可能类型集。

```typescript
type Square = {
    kind: 'square'; // 判别式
    size: number;
};

type Circle = {
    kind: 'circle'; // 判别式
    radius: number;
};

type Shape = Square | Circle;

const area = (shape: Shape) => {
    switch (shape.kind) {
        case 'square':
            return Math.pow(shape.size, 2);
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
    }
};

const square: Square = { kind: 'square', size: 5 };
const circle: Circle = { kind: 'circle', radius: 2 };

console.log(area(square)); // 25
console.log(area(circle)); // 12.566370614359172
```

