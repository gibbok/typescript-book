---
title: Avsmalning
sidebar:
  order: 20
  label: 20. Avsmalning
---


TypeScript-avsmalning är processen att förfina typen av en variabel inom ett villkorsblock. Detta är användbart när man arbetar med unionstyper, där en variabel kan ha mer än en typ.

TypeScript känner igen flera sätt att avsmalna typen:

### typeof-typvakter

typeof-typvakten är en specifik typvakt i TypeScript som kontrollerar typen av en variabel baserat på dess inbyggda JavaScript-typ.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x är nummer
    }
    return -1;
};
```

### Sanningsvärdesavsmalning

Sanningsvärdesavsmalning i TypeScript fungerar genom att kontrollera om en variabel är sann eller falsk för att avsmalna dess typ därefter.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Likhetsavsmalning

Likhetsavsmalning i TypeScript fungerar genom att kontrollera om en variabel är lika med ett specifikt värde eller inte, för att avsmalma dess typ därefter.

Den används tillsammans med `switch`-satser och likhetsoperatorer som `===`, `!==`, `==` och `!=` för att avsmalma typer.

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

### In-operatoravsmalning

`in`-operatoravsmalning i TypeScript är ett sätt att avsmalma typen av en variabel baserat på om en egenskap finns inom variabelns typ.

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

### instanceof-avsmalning

`instanceof`-operatoravsmalning i TypeScript är ett sätt att avsmalma typen av en variabel baserat på dess konstruktorfunktion, genom att kontrollera om ett objekt är en instans av en viss klass eller gränssnitt.

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

