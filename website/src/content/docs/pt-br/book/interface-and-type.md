---
title: Interface e Type
sidebar:
  order: 48
  label: 48. Interface e Type
---


No TypeScript, tanto `interface` quanto `type` podem ser usados para definir a forma de objetos e contratos de função. Embora compartilhem similaridades, existem diferenças em seus recursos e casos de uso.

### Sintaxe Comum

<!-- skip -->
```typescript
// Interface
interface Person {
    name: string;
    age: number;
}

// Type
type Person = {
    name: string;
    age: number;
};
```

### Tipos Básicos

Ambos podem descrever tipos básicos:

<!-- skip -->
```typescript
interface Point {
    x: number;
    y: number;
}

type Point = {
    x: number;
    y: number;
};
```

### Objetos e Interfaces

Para objetos, tanto interfaces quanto types podem ser usados de forma intercambiável na maioria dos casos.

<!-- skip -->
```typescript
interface User {
    name: string;
    age: number;
}

type User = {
    name: string;
    age: number;
};
```

### Tipos Union e Intersection

Types suportam uniões e intersecções, enquanto interfaces não:

<!-- skip -->
```typescript
type Status = 'success' | 'error';
type Response = SuccessResponse | ErrorResponse;
type Combined = TypeA & TypeB;
```

