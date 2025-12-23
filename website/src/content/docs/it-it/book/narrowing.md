---
title: Restringimento
sidebar:
  order: 20
  label: 20. Restringimento
---


Il restringimento di TypeScript è il processo di perfezionamento del tipo di una variabile all'interno di un blocco condizionale. Questo è utile quando si lavora con tipi union, in cui una variabile può avere più di un tipo.

TypeScript riconosce diversi modi per restringere il tipo:

### protezioni di tipo typeof

Il type guard typeof è uno specifico type guard in TypeScript che controlla il tipo di una variabile in base al suo tipo JavaScript predefinito.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x è un numero
    }
    return -1;
};
```

### Restringimento di veridicità

Il restringimento di veridicità in TypeScript funziona verificando se una variabile è vera o falsa, per restringerne di conseguenza il tipo.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Restringimento di uguaglianza

Il restringimento di uguaglianza in TypeScript funziona verificando se una variabile è uguale o meno a un valore specifico, per restringerne di conseguenza il tipo.

Viene utilizzato insieme alle istruzioni `switch` e agli operatori di uguaglianza come `===`, `!==`, `==` e `!=` per restringere i tipi.

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

### Restringimento dell'operatore `in`

Il restringimento dell'operatore `in` in TypeScript è un modo per restringere il tipo di una variabile in base all'esistenza di una proprietà all'interno del tipo della variabile.

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

### Restringimento instanceof

L'operatore di restringimento `instanceof` in TypeScript è un modo per restringere il tipo di una variabile in base alla sua funzione costruttore, verificando se un oggetto è un'istanza di una determinata classe o interfaccia.

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

