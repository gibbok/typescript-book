---
title: Sammanslagning och utökning
sidebar:
  order: 52
  label: 52. Sammanslagning och utökning
---


Sammanslagning och utökning avser två olika koncept relaterade till att arbeta med typer och interface.

Sammanslagning låter dig kombinera flera deklarationer med samma namn till en enda definition, till exempel när du definierar ett interface med samma namn flera gånger:

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

Utökning avser möjligheten att utöka eller ärva från befintliga typer eller interface för att skapa nya. Det är en mekanism för att lägga till ytterligare egenskaper eller metoder till en befintlig typ utan att ändra dess ursprungliga definition. Exempel:

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

