---
title: Разлики между Type и Interface
sidebar:
  order: 54
  label: 54. Разлики между Type и Interface
---


Declaration merging (augmentation):

Interfaces поддържат declaration merging, което означава, че можете да дефинирате множество interfaces със същото име и TypeScript ще ги обедини в един interface с комбинирани свойства и методи. От друга страна, types не поддържат declaration merging. Това е полезно, когато искате да добавите допълнителна функционалност или да разширите съществуващи типове, без да променяте оригиналните дефиниции или да поправяте липсващи или некоректни типове.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Разширяване на други типове/interfaces:

Както types, така и interfaces могат да разширяват други типове/interfaces, но синтаксисът е различен. При interfaces използвате ключовата дума `extends`, за да наследите свойства и методи от други interfaces. Въпреки това, interface не може да разширява сложен тип като union тип.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

При types използвате оператора `&`, за да комбинирате множество типове в един тип (intersection).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Union и Intersection типове:

Types са по-гъвкави при дефиниране на Union и Intersection типове. С ключовата дума `type` можете лесно да създавате union типове чрез оператора `|` и intersection типове чрез оператора `&`. Докато interfaces могат индиректно да представят union типове, те нямат вградена поддръжка за intersection типове.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Пример с interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union от interfaces
```

