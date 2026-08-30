# Narrowing



TypeScript-Narrowing ist der Prozess, bei dem der Typ einer Variablen innerhalb eines bedingten Blocks präzisiert wird. Dies ist bei der Arbeit mit Union-Typen nützlich, bei denen eine Variable mehr als einen Typ haben kann.

TypeScript erkennt mehrere Möglichkeiten, einen Typ einzugrenzen:

### typeof Type Guards

Der typeof-Type-Guard ist ein bestimmter Type Guard in TypeScript, der den Typ einer Variablen anhand ihres integrierten JavaScript-Typs prüft.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Truthiness-Narrowing

Truthiness-Narrowing funktioniert in TypeScript, indem geprüft wird, ob eine Variable truthy oder falsy ist, um ihren Typ entsprechend einzugrenzen.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Equality-Narrowing

Equality-Narrowing funktioniert in TypeScript, indem geprüft wird, ob eine Variable einem bestimmten Wert entspricht, um ihren Typ entsprechend einzugrenzen.

Es wird zusammen mit `switch`-Anweisungen und Gleichheitsoperatoren wie `===`, `!==`, `==` und `!=` verwendet, um Typen einzugrenzen.

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

### Narrowing mit dem in-Operator

Das Narrowing mit dem `in`-Operator ist in TypeScript eine Möglichkeit, den Typ einer Variablen danach einzugrenzen, ob in ihrem Typ eine Eigenschaft vorhanden ist.

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

### Narrowing mit instanceof

Das Narrowing mit dem `instanceof`-Operator ist in TypeScript eine Möglichkeit, den Typ einer Variablen anhand ihrer Konstruktorfunktion einzugrenzen, indem geprüft wird, ob ein Objekt eine Instanz einer bestimmten Klasse oder eines bestimmten Interfaces ist.

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

