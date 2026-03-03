---
title: Narrowing
sidebar:
  order: 20
  label: 20. Narrowing
---


Narrowing é o processo de refinar tipos para um tipo mais específico. Por exemplo, você pode ter um tipo union `string | number` e deseja especificar se algo é uma string ou um number.

### Type guards typeof

Verificar se um determinado valor é do tipo primitivo usando o operador typeof é uma forma de type guards, narrowing e proteção. O TypeScript reconhece o uso do operador `typeof` e pode estreitar em certas branches.

```typescript
const fn = (x: string | number) => {
    if (typeof x === 'number') {
        return x + 1; // x é number
    }
    return x + 'b'; // x é string
};
```

### Narrowing de veracidade

Veracidade pode estreitar em qualquer valor que pode ser coagido em um boolean, por exemplo, `if` statements, `&&`, `||`, instruções condicionais, `!` e mais.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Narrowing de igualdade

O TypeScript pode estreitar tipos comparando diretamente valores usando ===, !==, ==, e != para estreitar tipos.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    if (status === 'success') {
        // status é 'success'
    }
};
```

### Narrowing do operador In

O operador `in` no JavaScript é um método para determinar se um objeto tem uma propriedade com um nome específico, o TypeScript pode usar para estreitar os tipos possíveis.

```typescript
type Dog = { bark: () => void };
type Cat = { meow: () => void };

const talk = (pet: Dog | Cat) => {
    if ('bark' in pet) {
        pet.bark(); // pet é Dog
    } else {
        pet.meow(); // pet é Cat
    }
};
```

### Narrowing instanceof

O operador instanceof em JavaScript verifica se o protótipo de um construtor aparece em qualquer lugar na cadeia de protótipos de um objeto. O TypeScript pode usar para estreitar tipos:

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
        return shape.width * shape.width; // shape é Square
    } else {
        return shape.width * shape.height; // shape é Rectangle
    }
}
```

