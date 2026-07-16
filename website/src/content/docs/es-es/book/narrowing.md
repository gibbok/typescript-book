---
title: Restricción
sidebar:
  order: 20
  label: 20. Restricción
---


La restricción de TypeScript es el proceso de precisar el tipo de una variable dentro de un bloque condicional. Resulta útil al trabajar con tipos de unión, donde una variable puede tener más de un tipo.

TypeScript reconoce varias formas de restringir el tipo:

### Guardas de tipo typeof

La guarda de tipo typeof es una guarda específica de TypeScript que comprueba el tipo de una variable a partir de su tipo integrado de JavaScript.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Restricción por veracidad

La restricción por veracidad de TypeScript comprueba si una variable se evalúa como verdadera o falsa para restringir su tipo en consecuencia.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Restricción por igualdad

La restricción por igualdad de TypeScript comprueba si una variable es igual o no a un valor concreto para restringir su tipo en consecuencia.

Se utiliza junto con sentencias `switch` y operadores de igualdad como `===`, `!==`, `==` y `!=` para restringir tipos.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### Restricción mediante el operador in

La restricción mediante el operador `in` permite restringir el tipo de una variable según exista o no una propiedad en dicho tipo.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### Restricción mediante instanceof

La restricción mediante el operador `instanceof` permite restringir el tipo de una variable según su función constructora, comprobando si un objeto es instancia de una clase o interfaz determinada.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

