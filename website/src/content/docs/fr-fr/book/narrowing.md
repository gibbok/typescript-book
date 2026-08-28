---
title: Réduction de type
sidebar:
  order: 21
  label: 21. Réduction de type
---


La réduction de type dans TypeScript est le processus qui consiste à affiner le type d’une variable au sein d’un bloc conditionnel. Elle est utile lorsque vous travaillez avec des types union, où une variable peut avoir plusieurs types.

TypeScript reconnaît plusieurs façons de réduire le type :

### Gardes de type typeof

La garde de type typeof est une garde de type spécifique à TypeScript qui vérifie le type d’une variable à partir de son type JavaScript intégré.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Réduction par véracité

Dans TypeScript, la réduction par véracité consiste à vérifier si une variable est évaluée comme vraie ou fausse afin de réduire son type en conséquence.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Réduction par égalité

Dans TypeScript, la réduction par égalité consiste à vérifier si une variable est égale ou non à une valeur spécifique afin de réduire son type en conséquence.

Elle est utilisée conjointement avec les instructions `switch` et les opérateurs d’égalité tels que `===`, `!==`, `==` et `!=` pour réduire les types.

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

### Réduction avec l'opérateur in

Dans TypeScript, la réduction avec l’opérateur `in` permet de réduire le type d’une variable selon qu’une propriété existe ou non dans le type de la variable.

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

### Réduction avec instanceof

Dans TypeScript, la réduction avec l’opérateur `instanceof` permet de réduire le type d’une variable à partir de sa fonction constructeur, en vérifiant si un objet est une instance d’une certaine classe ou interface.

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

