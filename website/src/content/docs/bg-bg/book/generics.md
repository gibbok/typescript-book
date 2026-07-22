---
title: Generics
sidebar:
  order: 56
  label: 56. Generics
---


Generics позволяват да създавате преизползваеми компоненти и функции, които могат да работят с множество типове. С generics можете да параметризирате типове, функции и interfaces, позволявайки им да работят с различни типове без да ги указвате изрично предварително.

Generics правят кода по-гъвкав и преизползваем.

### Generic тип

За да дефинирате generic тип, използвате ъглови скоби (`<>`), в които посочвате type параметрите, например:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generic класове

Generics могат да се прилагат и към класове, като по този начин те могат да работят с множество типове чрез използване на type параметри. Това е полезно за създаване на преизползваеми класове, които работят с различни типове данни, като същевременно запазват type безопасността.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Ограничения при generics

Generic параметрите могат да бъдат ограничени чрез ключовата дума `extends`, последвана от тип или interface, който type параметърът трябва да удовлетворява.

В следния пример T трябва да съдържа свойство `length`, за да бъде валиден:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Невалидно
```

Интересна функционалност на generics, въведена във версия 3.4 RC, е Higher order function type inference, която въвежда пропагирани generic type аргументи:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Тази функционалност позволява по-лесно type-safe pointfree стил на програмиране, който е често срещан във функционалното програмиране.

### Контекстуално стесняване при generics

Контекстуалното стесняване при generics е механизъм в TypeScript, който позволява на компилатора да стеснява типа на generic параметър въз основа на контекста, в който се използва. Това е полезно при работа с generic типове в условни конструкции:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Стесняване до тип 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Стесняване до тип 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

