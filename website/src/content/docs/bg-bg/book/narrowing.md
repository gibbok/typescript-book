---
title: Narrowing
sidebar:
  order: 21
  label: 21. Narrowing
---


TypeScript narrowing е процес на уточняване на типа на променлива в рамките на условен блок. Това е полезно при работа с union типове, където променлива може да има повече от един тип.

TypeScript поддържа няколко начина за стесняване на типа:

### Проверки за типа "typeof"

Проверката за типа "typeof" е специфична проверка в TypeScript, която проверява типа на променлива въз основа на нейния вграден тип в JavaScript.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x е число
    }
    return -1;
};
```

### Свиване на тип чрез truthiness

Свиването на тип чрез truthiness в TypeScript работи като проверява дали променлива е truthy или falsy, за да стесни съответно нейния тип.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Свиване на тип чрез равенство

Свиването на тип чрез равенство в TypeScript работи чрез проверка дали променлива е равна на конкретна стойност или не, за да се стесни съответно нейният тип.

Използва се в комбинация с `switch` изрази и оператори за равенство като `===`, `!==`, `==` и `!=`, за да се стесни типът.

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

### Свиване на тип чрез оператора "in"

Свиването на тип чрез оператора `in` в TypeScript е начин да се стесни типът на променлива, базирайки се на това дали дадено свойство съществува в типа на променливата.

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

### Свиване на тип чрез `instanceof`

Свиването на тип чрез оператора `instanceof` в TypeScript е начин да се стесни типът на променлива, базирайки се на нейната конструкторска функция, чрез проверка дали обектът е инстанция на определен клас или interface.

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

