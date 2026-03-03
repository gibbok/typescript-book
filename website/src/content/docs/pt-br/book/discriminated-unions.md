---
title: Uniões Discriminadas
sidebar:
  order: 24
  label: 24. Uniões Discriminadas
---


Uniões discriminadas em TypeScript são um tipo de tipo union onde cada tipo tem uma propriedade comum, chamada "discriminant", que o TypeScript pode usar para estreitar o tipo da união.

Exemplo:

```typescript
type Dog = { type: 'dog'; bark: () => void };
type Cat = { type: 'cat'; meow: () => void };

const makeSound = (pet: Dog | Cat) => {
    if (pet.type === 'dog') {
        // TypeScript sabe que pet é Dog aqui
        pet.bark();
    } else {
        // TypeScript sabe que pet é Cat aqui
        pet.meow();
    }
};
```

