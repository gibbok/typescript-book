---
title: Unioni Discriminate
sidebar:
  order: 24
  label: 24. Unioni Discriminate
---


Le unioni Discriminate in TypeScript sono un tipo di unione che utilizza una proprietà comune, nota come discriminante, per restringere l'insieme dei tipi possibili per l'unione.

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

