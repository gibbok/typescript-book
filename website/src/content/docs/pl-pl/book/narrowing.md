---
title: Zawężanie typów
sidebar:
  order: 21
  label: 21. Zawężanie typów
---


Zawężanie typów w TypeScript to proces uściślania typu zmiennej wewnątrz bloku warunkowego. Jest to przydatne podczas pracy z typami unii, gdy zmienna może mieć więcej niż jeden typ.

TypeScript rozpoznaje kilka sposobów zawężania typu:

### Strażniki typów typeof

Strażnik typu `typeof` to szczególny strażnik typów w TypeScript, który sprawdza typ zmiennej na podstawie jej wbudowanego typu JavaScript.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Zawężanie na podstawie prawdziwości

Zawężanie na podstawie prawdziwości w TypeScript polega na sprawdzeniu, czy zmienna ma wartość prawdziwą (`truthy`) czy fałszywą (`falsy`), aby odpowiednio zawęzić jej typ.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Zawężanie na podstawie równości

Zawężanie na podstawie równości w TypeScript polega na sprawdzeniu, czy zmienna jest równa określonej wartości, aby odpowiednio zawęzić jej typ.

Jest używane w połączeniu z instrukcjami `switch` oraz operatorami równości, takimi jak `===`, `!==`, `==` i `!=`, w celu zawężania typów.

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

### Zawężanie za pomocą operatora in

Zawężanie za pomocą operatora `in` w TypeScript to sposób zawężania typu zmiennej na podstawie tego, czy właściwość istnieje w typie zmiennej.

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

### Zawężanie za pomocą instanceof

Zawężanie za pomocą operatora `instanceof` w TypeScript to sposób zawężania typu zmiennej na podstawie jej funkcji konstruktora poprzez sprawdzenie, czy obiekt jest instancją określonej klasy lub interfejsu.

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

