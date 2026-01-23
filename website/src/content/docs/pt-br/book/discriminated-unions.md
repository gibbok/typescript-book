---
title: Uniões Discriminadas
sidebar:
  order: 24
  label: 24. Uniões Discriminadas
---


Uniões Discriminadas no TypeScript são um tipo de tipo union que usa uma propriedade comum, conhecida como discriminante, para estreitar o conjunto de tipos possíveis para a união.

```typescript
type Square = {
    kind: 'square'; // Discriminante
    size: number;
};

type Circle = {
    kind: 'circle'; // Discriminante
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

