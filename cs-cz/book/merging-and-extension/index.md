# Slučování a rozšiřování



Slučování a rozšiřování označují dva různé koncepty související s prací s typy a rozhraními.

Slučování umožňuje spojit více deklarací se stejným názvem do jediné definice, například když několikrát definujete rozhraní se stejným názvem:

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

Rozšiřování označuje možnost rozšířit existující typy či rozhraní nebo z nich dědit a vytvořit tak nové. Jde o mechanismus přidávání dalších vlastností nebo metod k existujícímu typu bez úpravy jeho původní definice. Příklad:

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

