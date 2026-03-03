---
title: Tipos Estruturais Apagados
sidebar:
  order: 56
  label: 56. Tipos Estruturais Apagados
---


No TypeScript, objetos não precisam corresponder a um tipo específico e exato. Por exemplo, se criarmos um objeto que satisfaz os requisitos de uma interface, podemos utilizar esse objeto em lugares onde essa interface é necessária, mesmo que não houvesse conexão explícita entre eles.

```typescript
interface Point {
    x: number;
    y: number;
}

function printPoint(point: Point) {
    console.log(`${point.x}, ${point.y}`);
}

const point = { x: 1, y: 2, z: 3 };
printPoint(point); // Válido, mesmo tendo z extra
```

