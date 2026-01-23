---
title: Mesclagem e Extensão
sidebar:
  order: 52
  label: 52. Mesclagem e Extensão
---


Mesclagem e extensão referem-se a dois conceitos diferentes relacionados ao trabalho com tipos e interfaces.

Mesclagem permite que você combine múltiplas declarações do mesmo nome em uma única definição, por exemplo, quando você define uma interface com o mesmo nome múltiplas vezes:

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

Extensão refere-se à capacidade de estender ou herdar de tipos ou interfaces existentes para criar novos. É um mecanismo para adicionar propriedades ou métodos adicionais a um tipo existente sem modificar sua definição original. Exemplo:

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

