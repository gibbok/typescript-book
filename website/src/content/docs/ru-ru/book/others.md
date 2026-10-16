---
title: Прочее
sidebar:
  order: 62
  label: 62. Прочее
---


### Ошибки и обработка исключений

TypeScript позволяет перехватывать и обрабатывать ошибки с помощью стандартных механизмов обработки ошибок JavaScript:

Блоки Try-Catch-Finally:

```typescript
try {
    // Код, который может вызвать исключение
} catch (error) {
    // Обработка ошибки
} finally {
    // Код, который выполняется всегда; блок finally необязателен
}
```

Также можно обрабатывать ошибки разных типов:

```typescript
try {
    // Код, который может вызывать ошибки разных типов
} catch (error) {
    if (error instanceof TypeError) {
        // Обработка TypeError
    } else if (error instanceof RangeError) {
        // Обработка RangeError
    } else {
        // Обработка других ошибок
    }
}
```

Пользовательские типы ошибок:

Более конкретные ошибки можно определять, расширяя класс Error с помощью `class`:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Классы-примеси

Классы-примеси позволяют объединять и компоновать поведение нескольких классов в одном классе. Они дают возможность повторно использовать и расширять функциональность без необходимости создавать глубокие цепочки наследования.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Расширить MyClass, включив поведение Identifiable и Selectable
interface MyClass extends Identifiable, Selectable {}

// Функция для применения примесей к классу
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Применить примеси к MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Асинхронные возможности языка

Поскольку TypeScript является надмножеством JavaScript, он имеет встроенные асинхронные возможности JavaScript, такие как:

Промисы:

Промисы позволяют обрабатывать асинхронные операции и их результаты с помощью таких методов, как `.then()` и `.catch()`, для обработки успешного выполнения и ошибок.

Подробнее: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Ключевые слова async/await предоставляют синтаксис для работы с Promise, внешне напоминающий синхронный код. Ключевое слово `async` используется для определения асинхронной функции, а `await` — внутри асинхронной функции, чтобы приостановить выполнение до успешного завершения или отклонения Promise.

Подробнее:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

В TypeScript хорошо поддерживаются следующие API:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Итераторы и генераторы

И итераторы, и генераторы хорошо поддерживаются в TypeScript.

Итераторы — это объекты, реализующие протокол итератора и предоставляющие доступ к элементам коллекции или последовательности по одному. Итератор представляет собой структуру, содержащую указатель на следующий элемент итерации. У итераторов есть метод `next()`, который возвращает следующее значение последовательности вместе с логическим значением `done`, указывающим, завершена ли последовательность.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Генераторы — это специальные функции, определяемые с помощью синтаксиса `function*`, который упрощает создание итераторов. Они используют ключевое слово `yield` для определения последовательности значений и автоматически приостанавливают и возобновляют выполнение при запросе значений.

Генераторы упрощают создание итераторов и особенно полезны при работе с большими или бесконечными последовательностями.

Пример:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript также поддерживает асинхронные итераторы и асинхронные генераторы.

Подробнее:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Справочник по TsDocs JSDoc

При работе с кодовой базой JavaScript можно помочь TypeScript вывести правильный тип с помощью комментариев JSDoc с дополнительной аннотацией, предоставляющей информацию о типах.

Пример:

```typescript
/**
 * Вычисляет степень заданного числа
 * @constructor
 * @param {number} base – Основание выражения
 * @param {number} exponent – Показатель степени выражения
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Полная документация доступна по этой ссылке:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Начиная с версии 3.7, определения типов из файлов `.d.ts` можно генерировать из синтаксиса JSDoc в JavaScript.
Дополнительная информация доступна здесь:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Для пакетов в организации @types используется специальное соглашение об именовании, предназначенное для предоставления определений типов существующих библиотек или модулей JavaScript. Например, команда:

```shell
npm install --save-dev @types/lodash
```

установит определения типов для `lodash` в текущий проект.

Чтобы внести вклад в определения типов пакета `@types`, отправьте пул-реквест в репозиторий [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) — это расширение синтаксиса языка JavaScript, позволяющее писать HTML-подобный код в файлах JavaScript или TypeScript. Обычно оно используется в React для определения структуры HTML.

TypeScript расширяет возможности JSX, предоставляя проверку типов и статический анализ.

Чтобы использовать JSX, необходимо задать параметр компилятора `jsx` в файле `tsconfig.json`. Два распространённых варианта конфигурации:

* "preserve": создаёт файлы .jsx, оставляя JSX без изменений. Этот вариант предписывает TypeScript сохранять синтаксис JSX как есть и не преобразовывать его в процессе компиляции. Его можно использовать, если у вас есть отдельный инструмент, например Babel, который выполняет преобразование.
* "react": включает встроенное в TypeScript преобразование JSX. Будет использоваться React.createElement.

Все варианты доступны здесь:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Модули ES6

TypeScript поддерживает ES6 (ECMAScript 2015) и многие последующие версии. Это означает, что вы можете использовать синтаксис ES6, включая стрелочные функции, шаблонные литералы, классы, модули, деструктуризацию и многое другое.

Чтобы включить возможности ES6 в проекте, можно указать свойство `target` в tsconfig.json.

Пример конфигурации:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Оператор возведения в степень ES7

Оператор возведения в степень (`**`) вычисляет значение, полученное возведением первого операнда в степень второго операнда. Он работает аналогично `Math.pow()`, но дополнительно может принимать BigInt в качестве операндов.
TypeScript полностью поддерживает этот оператор, если в файле tsconfig.json параметру `target` задано значение `es2016` или более поздней версии.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Инструкция for-await-of

Это полностью поддерживаемая в TypeScript возможность JavaScript, которая позволяет перебирать асинхронные итерируемые объекты при целевой версии `es2018`.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Новое метасвойство target

В TypeScript можно использовать метасвойство `new.target`, которое позволяет определить, использовался ли оператор new при вызове функции или конструктора. Оно позволяет выяснить, был ли объект создан в результате вызова конструктора.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Выводит функцию-конструктор, использованную для создания экземпляра
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Динамические выражения импорта

Модули можно загружать условно или отложенно по требованию с помощью предложения ECMAScript о динамическом импорте, которое поддерживается в TypeScript.

Синтаксис динамических выражений импорта в TypeScript выглядит следующим образом:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Динамический импорт
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Эта команда запускает компилятор TypeScript с параметром `--watch`, обеспечивая автоматическую перекомпиляцию файлов TypeScript при каждом их изменении.

```shell
tsc --watch
```

Начиная с TypeScript версии 4.9, отслеживание файлов в основном опирается на события файловой системы и автоматически переключается на опрос, если установить наблюдатель на основе событий невозможно.

### Оператор утверждения о ненулевом значении

Оператор утверждения о ненулевом значении (постфиксный !), также называемый утверждением об определённом присваивании, — это возможность TypeScript, позволяющая утверждать, что переменная или свойство не имеют значения null или undefined, даже если статический анализ типов TypeScript предполагает обратное. С помощью этой возможности можно исключить любые явные проверки.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Объявления со значениями по умолчанию

Объявления со значениями по умолчанию используются, когда переменной или параметру присваивается значение по умолчанию. Это означает, что, если значение для этой переменной или параметра не указано, будет использовано значение по умолчанию.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Опциональная цепочка

Оператор опциональной цепочки `?.` работает подобно обычному оператору точки (`.`), используемому для доступа к свойствам или методам. Однако он корректно обрабатывает значения null и undefined: прекращает вычисление выражения и возвращает `undefined` вместо выброса ошибки.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Оператор объединения с null

Оператор объединения с null `??` возвращает значение справа, если значение слева равно `null` или `undefined`; в противном случае он возвращает значение слева.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Типы шаблонных литералов

Типы шаблонных литералов позволяют манипулировать строковыми значениями на уровне типов и создавать новые строковые типы на основе существующих. Они полезны для создания более выразительных и точных типов на основе строковых операций.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Перегрузка функций

Перегрузка функций позволяет определить несколько сигнатур для одного имени функции, каждая с разными типами параметров и возвращаемыми типами.
При вызове перегруженной функции TypeScript использует переданные аргументы, чтобы определить подходящую сигнатуру функции:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Рекурсивные типы

Рекурсивный тип — это тип, который может ссылаться на самого себя. Это полезно для определения структур данных с иерархической или рекурсивной структурой (с потенциально бесконечной вложенностью), таких как связные списки, деревья и графы.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Рекурсивные условные типы

В TypeScript можно определять сложные отношения между типами с помощью логики и рекурсии.
Разберём это простыми словами:

Условные типы позволяют определять типы на основе логических условий:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Рекурсия означает, что определение типа ссылается на самого себя внутри собственного определения:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Рекурсивные условные типы объединяют условную логику и рекурсию. Это означает, что определение типа может зависеть от самого себя через условную логику, создавая сложные и гибкие отношения между типами.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Поддержка модулей ECMAScript в Node

Node.js добавил поддержку модулей ECMAScript начиная с версии 15.3.0, а TypeScript поддерживает модули ECMAScript в Node.js с версии 4.7. Эту поддержку можно включить, присвоив свойству `module` значение `nodenext` в файле tsconfig.json. Пример:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js поддерживает два расширения файлов модулей: `.mjs` для модулей ES и `.cjs` для модулей CommonJS. Соответствующие расширения файлов в TypeScript — `.mts` для модулей ES и `.cts` для модулей CommonJS. Когда компилятор TypeScript транспилирует эти файлы в JavaScript, он создаёт файлы `.mjs` и `.cjs`.

Если вы хотите использовать модули ES в своём проекте, можно присвоить свойству `type` значение "module" в файле package.json. Это указывает Node.js рассматривать проект как проект с модулями ES.

Кроме того, TypeScript поддерживает объявления типов в файлах `.d.ts`. Эти файлы объявлений предоставляют информацию о типах для библиотек или модулей, написанных на TypeScript, позволяя другим разработчикам использовать их вместе с проверкой типов и автодополнением TypeScript.

### Функции утверждения

В TypeScript функции утверждения — это функции, которые указывают на проверку определённого условия на основе своего возвращаемого значения. В простейшей форме функция утверждения проверяет переданный предикат и выбрасывает ошибку, если предикат имеет значение false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Или её можно объявить как функциональное выражение:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Функции утверждения похожи на защитники типов. Изначально защитники типов были введены для выполнения проверок во время выполнения и гарантии типа значения в определённой области видимости.
В частности, защитник типа — это функция, которая вычисляет предикат типа и возвращает логическое значение, указывающее, является ли предикат истинным или ложным. Это немного отличается от функций утверждения, предназначенных для выброса ошибки вместо возврата false, когда предикат не выполняется.

Пример защитника типа:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Вариативные кортежные типы

Вариативные кортежные типы — это возможность, представленная в TypeScript версии 4.0, поэтому для начала вспомним, что такое кортеж:

Кортежный тип — это массив с определённой длиной, тип каждого элемента которого известен:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Термин «вариативный» означает неопределённую арность (приём переменного количества аргументов).

Вариативный кортеж — это кортежный тип, обладающий всеми прежними свойствами, но его точная форма ещё не определена:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

В предыдущем коде видно, что форма кортежа определяется переданным обобщённым типом `T`.

Вариативные кортежи могут принимать несколько обобщённых типов, что делает их очень гибкими:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Новые вариативные кортежи позволяют использовать:

* Операторы расширения в синтаксисе кортежных типов теперь могут быть обобщёнными, поэтому мы можем представлять операции высшего порядка над кортежами и массивами, даже если не знаем фактических типов, с которыми работаем.
* Остаточные элементы могут находиться в любом месте кортежа.

Пример:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Объектные типы-обёртки

Объектные типы-обёртки — это объекты-обёртки, которые используются для представления примитивных типов в виде объектов. Эти объекты-обёртки предоставляют дополнительные возможности и методы, недоступные непосредственно для примитивных значений.

Когда вы обращаетесь к методу вроде `charAt` или `normalize` у примитивного значения `string`, JavaScript оборачивает его в объект `String`, вызывает метод, а затем отбрасывает объект.

Демонстрация:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript представляет это различие, предоставляя отдельные типы для примитивов и соответствующих им объектов-обёрток:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Объектные типы-обёртки обычно не нужны. Избегайте их использования и вместо них применяйте примитивные типы, например `string` вместо `String`.

### Ковариантность и контравариантность в TypeScript

Ковариантность и контравариантность описывают отношения типов внутри обобщённых типов. `Dog` является `Animal`, но не каждый `Animal` является `Dog`.

**Ковариантность (возврат значений):** функция, возвращающая `Dog`, может заменить функцию, возвращающую `Animal`. Любая собака — животное, но функция, возвращающая произвольное животное, может вернуть кошку.

<!-- skip -->
```typescript
class Animal {
    name = '';
}

class Dog extends Animal {
    breed = '';
}

type Producer<T> = () => T;

declare let produceAnimal: Producer<Animal>;
declare let produceDog: Producer<Dog>;

produceAnimal = produceDog; // Допустимо
produceDog = produceAnimal; // Ошибка
```

**Контравариантность (приём значений):** функция, принимающая любой `Animal`, может заменить функцию, принимающую `Dog`. Она обработает и собаку; функция только для собак не может безопасно обработать любое животное.

<!-- skip -->
```typescript
type Consumer<T> = (value: T) => void;

declare let consumeAnimal: Consumer<Animal>;
declare let consumeDog: Consumer<Dog>;

consumeDog = consumeAnimal; // Допустимо
consumeAnimal = consumeDog; // Ошибка при включённом strictFunctionTypes
```

Стрелки показывают направление безопасного присваивания:

* Dog -> Animal
* Producer\<Dog> -> Producer\<Animal> (covariance)
* Consumer\<Animal> -> Consumer\<Dog> (contravariance)

**Изменяемые массивы:** TypeScript также разрешает присвоить `Dog[]` переменной типа `Animal[]`. Обе переменные ссылаются на один массив; через более общий тип можно добавить `Animal`, который не является собакой.

<!-- skip -->
```typescript
const dogs: Dog[] = [new Dog()];
const animals: Animal[] = dogs;

animals.push(new Animal()); // Разрешено, но небезопасно
// Теперь dogs содержит Animal, который не является Dog.
```

**Настройка компилятора:** при `strictFunctionTypes` параметры обычных функций проверяются контравариантно. Без этого параметра TypeScript может допускать оба направления (бивариантность), даже если это небезопасно. Параметры объявлений методов и конструкторов — исключение.

#### Необязательные аннотации вариантности для параметров типов

Начиная с TypeScript 4.7, `out` обозначает ковариантность, `in` — контравариантность, а `in out` — инвариантность. Обычно TypeScript выводит вариантность сам. Аннотации должны соответствовать использованию обобщённого параметра, а не произвольно менять его поведение.

```typescript
type Producer<out T> = () => T;
type Consumer<in T> = (value: T) => void;
type Transformer<in out T> = (value: T) => T;
```

### Индексные сигнатуры с шаблонами строковых литералов

Индексные сигнатуры с шаблонами строковых литералов позволяют определять гибкие индексные сигнатуры с помощью шаблонов строковых литералов. Эта возможность позволяет создавать объекты, к которым можно обращаться по строковым ключам, соответствующим определённым шаблонам, обеспечивая более точный контроль при доступе к свойствам и манипуляциях с ними.

Начиная с версии 4.4, TypeScript позволяет использовать индексные сигнатуры для символов и шаблонов строковых литералов.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Ключ уникального символа
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Оператор satisfies

Оператор `satisfies` позволяет проверить, удовлетворяет ли заданный тип определённому интерфейсу или условию. Другими словами, он гарантирует, что у типа есть все необходимые свойства и методы определённого интерфейса. Это способ убедиться, что переменная соответствует определению типа.
Пример:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Аннотация типа с использованием `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// В следующих строках TypeScript не сможет правильно вывести типы
user.attributes?.map(console.log); // Свойство 'map' не существует в типе 'string | string[]'. Свойство 'map' не существует в типе 'string'.
user.nickName; // string | string[] | undefined

// Утверждение типа с использованием `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Здесь TypeScript тоже не сможет правильно вывести типы
user2.attributes?.map(console.log); // Свойство 'map' не существует в типе 'string | string[]'. Свойство 'map' не существует в типе 'string'.
user2.nickName; // string | string[] | undefined

// С оператором `satisfies` теперь можно правильно вывести типы
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript правильно выводит тип: string[]
user3.nickName; // TypeScript правильно выводит тип: undefined
```

### Импорт и экспорт только типов

Импорт и экспорт только типов позволяют импортировать или экспортировать типы, не импортируя и не экспортируя связанные с ними значения или функции. Это может быть полезно для уменьшения размера сборки.

Для импорта только типов можно использовать конструкцию `import type`.

TypeScript разрешает использовать в импорте только типов расширения как файлов объявлений, так и файлов реализации (.ts, .mts, .cts и .tsx) независимо от настроек `allowImportingTsExtensions`.

Пример:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Поддерживаются следующие формы:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Объявление using и явное управление ресурсами

Объявление `using` — это неизменяемая привязка с блочной областью видимости, подобная `const`, которая используется для управления освобождаемыми ресурсами. При инициализации значением метод `Symbol.dispose` этого значения регистрируется, а затем выполняется при выходе из охватывающей блочной области видимости.

Эта возможность основана на управлении ресурсами в ECMAScript, которое полезно для выполнения необходимых задач очистки после создания объекта, таких как закрытие соединений, удаление файлов и освобождение памяти.

Примечания:

* Поскольку эта возможность появилась только в TypeScript версии 5.2, большинство сред выполнения не поддерживают её нативно. Вам понадобятся полифилы для: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Кроме того, потребуется настроить tsconfig.json следующим образом:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Пример:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Простой полифил

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Ресурс объявлен
    console.log(2);
} // Ресурс освобождён (например, выполняется `work[Symbol.dispose]()`)

console.log(3);
```

Код выведет:

```shell
1
2
disposed
3
```

Ресурс, который можно освободить, должен соответствовать интерфейсу `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Объявления `using` записывают операции освобождения ресурсов в стек, гарантируя их освобождение в порядке, обратном порядку объявления:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // освобождает `C`, затем `B`, затем `A`.
```

Освобождение ресурсов гарантируется даже при выполнении последующего кода или возникновении исключений. При этом операция освобождения потенциально может выбросить исключение и, возможно, подавить другое. Для сохранения информации о подавленных ошибках введено новое встроенное исключение `SuppressedError`.

#### Объявление await using

Объявление `await using` обрабатывает асинхронно освобождаемый ресурс. Значение должно иметь метод `Symbol.asyncDispose`, выполнение которого будет ожидаться в конце блока.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Ресурс объявлен
} // Ресурс освобождён (например, выполняется `await work[Symbol.asyncDispose]()`)
```

Асинхронно освобождаемый ресурс должен соответствовать интерфейсу `Disposable` или `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Простой полифил

class DatabaseConnection implements AsyncDisposable {
    // Метод, вызываемый при асинхронном освобождении объекта
    [Symbol.asyncDispose]() {
        // Закрыть соединение и вернуть промис
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Создать соединение и асинхронно освободить его при выходе из области видимости
    await using connection = new DatabaseConnection(); //  Ресурс объявлен
    console.log('Doing some work...');
} // Ресурс освобождён (например, выполняется `await connection[Symbol.asyncDispose]()`)

doWork();
```

Код выводит:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Объявления `using` и `await using` разрешены в инструкциях: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Атрибуты импорта

Атрибуты импорта в TypeScript 5.3 (метки для импортов) сообщают среде выполнения, как обрабатывать модули (JSON и т. д.). Это повышает безопасность, обеспечивая явный импорт, и согласуется с политикой безопасности контента (CSP), делая загрузку ресурсов безопаснее. TypeScript проверяет их допустимость, но интерпретацию для обработки конкретных модулей оставляет среде выполнения.

Пример:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

с динамическим импортом:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Проверка синтаксиса регулярных выражений

Начиная с TypeScript 5.5.4, на этапе компиляции выполняется проверка литералов регулярных выражений на распространённые ошибки (например, недопустимый синтаксис, неверные обратные ссылки и возможности, не поддерживаемые целевой версией JS). Это помогает раньше обнаруживать ошибки, но строки `new RegExp("...")` не проверяются.

<!-- skip -->
```typescript
let r = /(a)\2/; // Ошибка: эта обратная ссылка ссылается на несуществующую группу.
```

### import defer

`import defer` позволяет загрузить модуль, но отложить его выполнение до фактического использования чего-либо из него. Это помогает избежать ненужной работы и побочных эффектов.

* Работает только с: `import defer * as name from "module"`
* Код выполняется только при обращении к экспортируемому значению
