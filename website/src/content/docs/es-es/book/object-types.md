---
title: Tipos de objeto
sidebar:
  order: 27
  label: 27. Tipos de objeto
---


En TypeScript, los tipos de objeto describen la forma de un objeto. Especifican los nombres y tipos de sus propiedades, así como si son obligatorias u opcionales.

En TypeScript puedes definir tipos de objeto de dos formas principales:

Una interfaz define la forma de un objeto especificando los nombres, tipos y carácter opcional de sus propiedades.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Un alias de tipo, al igual que una interfaz, define la forma de un objeto. Sin embargo, también puede crear un tipo personalizado nuevo a partir de un tipo existente o de una combinación de tipos. Esto incluye tipos de unión, tipos de intersección y otros tipos complejos.

```typescript
type Point = {
    x: number;
    y: number;
};
```

También es posible definir un tipo de forma anónima:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

