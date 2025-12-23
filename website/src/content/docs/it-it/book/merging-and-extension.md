---
title: Unione ed estensione
sidebar:
  order: 52
  label: 52. Unione ed estensione
---


Merging ed estensione si riferiscono a due concetti diversi relativi all'utilizzo di tipi e interfacce.

Merging consente di combinare più dichiarazioni con lo stesso nome in un'unica definizione, ad esempio quando si definisce un'interfaccia con lo stesso nome più volte:

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

L'estensione si riferisce alla possibilità di estendere o ereditare da tipi o interfacce esistenti per crearne di nuovi. È un meccanismo per aggiungere proprietà o metodi aggiuntivi a un tipo esistente senza modificarne la definizione originale. Esempio:

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

