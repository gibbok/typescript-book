---
title: Verificação de exaustividade
sidebar:
  order: 26
  label: 26. Verificação de exaustividade
---


Verificação de exaustividade é uma técnica no TypeScript para garantir que todos os casos possíveis foram tratados em um bloco de código. Ela é usada frequentemente em conjunto com uniões discriminadas e instruções switch.

Exemplo:

<!-- skip -->
```typescript
type Shape = Circle | Square | Triangle;

const getArea = (shape: Shape) => {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        case 'triangle':
            return (shape.base * shape.height) / 2;
        default:
            // Se todos os casos forem tratados, shape terá tipo never aqui
            const _exhaustiveCheck: never = shape;
            throw new Error('Unhandled shape');
    }
};
```

