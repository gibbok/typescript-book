---
title: Diskriminerade unioner
sidebar:
  order: 24
  label: 24. Diskriminerade unioner
---


Diskriminerade unioner i TypeScript är en typ av unionstyp som använder en gemensam egenskap, känd som diskriminanten, för att avsmalma uppsättningen av möjliga typer för unionen.

```typescript
type Square = {
    kind: 'square'; // Discriminant
    size: number;
};

type Circle = {
    kind: 'circle'; // Discriminant
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

