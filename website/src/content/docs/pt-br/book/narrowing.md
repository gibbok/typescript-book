---
title: Narrowing
sidebar:
  order: 20
  label: 20. Narrowing
---


Narrowing do TypeScript é o processo de refinar o tipo de uma variável dentro de um bloco condicional. Isso é útil ao trabalhar com tipos union, onde uma variável pode ter mais de um tipo.

O TypeScript reconhece várias maneiras de estreitar o tipo:

### Type guards typeof

O type guard typeof é um type guard específico no TypeScript que verifica o tipo de uma variável com base em seu tipo JavaScript integrado.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x é number
    }
    return -1;
};
```

### Narrowing por veracidade

O narrowing por veracidade no TypeScript funciona verificando se uma variável é truthy ou falsy para estreitar seu tipo de acordo.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Narrowing por igualdade

O narrowing por igualdade no TypeScript funciona verificando se uma variável é igual a um valor específico ou não, para estreitar seu tipo de acordo.

É usado em conjunto com instruções `switch` e operadores de igualdade como `===`, `!==`, `==` e `!=` para estreitar tipos.

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

### Narrowing com operador in

O narrowing com operador `in` no TypeScript é uma maneira de estreitar o tipo de uma variável com base em se uma propriedade existe dentro do tipo da variável.

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

### Narrowing com instanceof

O narrowing com operador `instanceof` no TypeScript é uma maneira de estreitar o tipo de uma variável com base em sua função construtora, verificando se um objeto é uma instância de uma determinada classe ou interface.

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

