# Estreitamento de Tipos (Narrowing)



O estreitamento de tipos (narrowing) no TypeScript é o processo de refinar o tipo de uma variável dentro de um bloco condicional. Isso é útil ao trabalhar com tipos de união, em que uma variável pode ter mais de um tipo.

O TypeScript reconhece várias maneiras de estreitar o tipo:

### Guardas de tipo typeof

A guarda de tipo (type guard) `typeof` é uma guarda de tipo específica no TypeScript que verifica o tipo de uma variável com base em seu tipo integrado do JavaScript.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x é number
    }
    return -1;
};
```

### Estreitamento por valor de verdade (Truthiness narrowing)

O estreitamento por valor de verdade (truthiness narrowing) no TypeScript funciona verificando se o valor de uma variável é considerado verdadeiro (truthy) ou falso (falsy) para estreitar seu tipo adequadamente.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Estreitamento por igualdade (Equality narrowing)

O estreitamento por igualdade (equality narrowing) no TypeScript funciona verificando se uma variável é igual a um valor específico ou não, para estreitar seu tipo adequadamente.

É usado em conjunto com instruções `switch` e operadores de igualdade como `===`, `!==`, `==` e `!=` para estreitar os tipos.

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

### Estreitamento com o operador in

O estreitamento com o operador `in` no TypeScript é uma forma de estreitar o tipo de uma variável com base na existência de uma propriedade dentro do tipo da variável.

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

### Estreitamento com instanceof

O estreitamento com o operador `instanceof` no TypeScript é uma forma de estreitar o tipo de uma variável com base em sua função construtora, verificando se um objeto é uma instância de uma determinada classe ou interface.

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

