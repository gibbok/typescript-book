---
title: Discriminated Unions
sidebar:
  order: 25
  label: 25. Discriminated Unions
---


Discriminated Unions в TypeScript са тип на обединение, който използва общо свойство, известно като дискриминант, за да стесни набора от възможни типове за обединението.

```typescript
type Square = {
    kind: 'square'; // Дискриминант
    size: number;
};

type Circle = {
    kind: 'circle'; // Дискриминант
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

