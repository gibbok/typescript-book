---
title: Combinación y extensión
sidebar:
  order: 55
  label: 55. Combinación y extensión
---


La combinación y la extensión son dos conceptos distintos relacionados con los tipos y las interfaces.

La combinación permite reunir varias declaraciones con el mismo nombre en una única definición; por ejemplo, al definir varias veces una interfaz con el mismo nombre:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

La extensión permite extender o heredar tipos o interfaces existentes para crear otros nuevos. Es un mecanismo para añadir propiedades o métodos sin modificar la definición original. Ejemplo:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

