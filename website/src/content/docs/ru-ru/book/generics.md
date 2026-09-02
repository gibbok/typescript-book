---
title: Обобщения
sidebar:
  order: 56
  label: 56. Обобщения
---


Обобщения позволяют создавать переиспользуемые компоненты и функции, способные работать с несколькими типами. С помощью обобщений можно параметризовать типы, функции и интерфейсы, позволяя им работать с разными типами без их предварительного явного указания.

Обобщения делают код более гибким и пригодным для повторного использования.

### Обобщённый тип

Чтобы определить обобщённый тип, параметры типа указывают в угловых скобках (`<>`), например:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Обобщённые классы

Обобщения также можно применять к классам, чтобы с помощью параметров типа они могли работать с несколькими типами. Это полезно для создания переиспользуемых определений классов, способных работать с различными типами данных и при этом сохранять типобезопасность.

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

### Ограничения обобщений

Обобщённые параметры можно ограничивать с помощью ключевого слова `extends`, за которым следует тип или интерфейс, требованиям которого должен соответствовать параметр типа.

В следующем примере для допустимости `T` должен иметь свойство `length` с корректно заданным типом:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

Примечательная возможность обобщений, появившаяся в версии 3.4 RC, — вывод типов для функций высшего порядка, который распространяет аргументы обобщённых типов:

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

Эта возможность упрощает типобезопасное программирование в бесточечном стиле, распространённом в функциональном программировании.

### Контекстное сужение обобщённых типов

Контекстное сужение обобщённых типов — это механизм TypeScript, позволяющий компилятору сужать тип обобщённого параметра на основе контекста его использования. Он полезен при работе с обобщёнными типами в условных операторах:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

