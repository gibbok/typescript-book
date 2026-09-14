---
title: Zužování typů
sidebar:
  order: 21
  label: 21. Zužování typů
---


Zužování typů v TypeScriptu je proces zpřesňování typu proměnné uvnitř podmíněného bloku. To je užitečné při práci se sjednocenými typy, kdy proměnná může mít více než jeden typ.

TypeScript rozpoznává několik způsobů zužování typů:

### Typoví strážci typeof

Typový strážce typeof je konkrétní typový strážce v TypeScriptu, který kontroluje typ proměnné na základě jejího vestavěného typu v JavaScriptu.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Zužování podle pravdivostní hodnoty

Zužování podle pravdivostní hodnoty v TypeScriptu funguje tak, že kontroluje, zda se proměnná vyhodnocuje jako pravdivá (truthy), nebo nepravdivá (falsy), a podle toho zužuje její typ.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Zužování podle rovnosti

Zužování podle rovnosti v TypeScriptu funguje tak, že kontroluje, zda se proměnná rovná konkrétní hodnotě, či nikoli, a podle toho zužuje její typ.

Používá se ve spojení s příkazy `switch` a operátory rovnosti, jako jsou `===`, `!==`, `==` a `!=`, k zužování typů.

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

### Zužování pomocí operátoru in

Zužování pomocí operátoru `in` v TypeScriptu je způsob, jak zúžit typ proměnné na základě toho, zda v jejím typu existuje určitá vlastnost.

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

### Zužování pomocí instanceof

Zužování pomocí operátoru `instanceof` v TypeScriptu je způsob, jak zúžit typ proměnné na základě její konstruktorové funkce kontrolou, zda je objekt instancí určité třídy nebo rozhraní.

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

