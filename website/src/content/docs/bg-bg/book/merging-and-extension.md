---
title: Merging и Extension
sidebar:
  order: 53
  label: 53. Merging и Extension
---


Merging и extension се отнасят до две различни концепции, свързани с работа с типове и interfaces.

Merging позволява да комбинирате множество декларации със същото име в една дефиниция, например когато дефинирате interface със същото име повече от веднъж:

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

Extension се отнася до възможността да разширявате или наследявате съществуващи типове или interfaces, за да създавате нови. Това е механизъм за добавяне на допълнителни свойства или методи към съществуващ тип, без да се променя оригиналната му дефиниция. Пример:

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

