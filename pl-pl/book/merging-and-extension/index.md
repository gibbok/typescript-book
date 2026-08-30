# Scalanie i rozszerzanie



Scalanie i rozszerzanie odnoszą się do dwóch różnych koncepcji związanych z pracą z typami i interfejsami.

Scalanie pozwala połączyć wiele deklaracji o tej samej nazwie w jedną definicję, na przykład gdy wielokrotnie definiuje się interfejs o tej samej nazwie:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Rozszerzanie oznacza możliwość rozszerzania istniejących typów lub interfejsów albo dziedziczenia po nich w celu tworzenia nowych. Jest to mechanizm dodawania właściwości lub metod do istniejącego typu bez modyfikowania jego pierwotnej definicji. Przykład:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

