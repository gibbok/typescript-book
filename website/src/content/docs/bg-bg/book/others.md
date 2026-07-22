---
title: Други
sidebar:
  order: 62
  label: 62. Други
---


### Грешки и обработка на изключения

TypeScript позволява да прихващате и обработвате грешки, използвайки стандартните механизми на JavaScript:

Try-Catch-Finally блокове:

```typescript
try {
    // Код, който може да хвърли грешка
} catch (error) {
    // Обработка на грешката
} finally {
    // Код, който винаги се изпълнява, finally е по избор
}
```

Можете също така да обработвате различни типове грешки:

```typescript
try {
    // Код, който може да хвърли различни типове грешки
} catch (error) {
    if (error instanceof TypeError) {
        // Обработка на TypeError
    } else if (error instanceof RangeError) {
        // Обработка на RangeError
    } else {
        // Обработка на други грешки
    }
}
```

Потребителски типове грешки:

Възможно е да дефинирате по-специфични грешки чрез разширяване на класа Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin класове

Mixin класовете позволяват комбиниране и композиция на поведение от множество класове в един клас. Те предоставят начин за преизползване и разширяване на функционалност без нужда от дълбоки вериги на наследяване.

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

// Разширяване на MyClass с поведението на Identifiable и Selectable
interface MyClass extends Identifiable, Selectable {}

// Функция за прилагане на mixins към клас
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

// Прилагане на mixins към MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Асинхронни функционалности

Тъй като TypeScript е надмножество на JavaScript, той поддържа вградените асинхронни функционалности на JavaScript, като:

Promises:

Promises са начин за обработка на асинхронни операции и техните резултати чрез методи като `.then()` и `.catch()` за обработка на успешни и неуспешни състояния.

За повече информация: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Ключовите думи async/await предоставят по-синхронно изглеждащ синтаксис за работа с Promises. Ключовата дума `async` се използва за дефиниране на асинхронна функция, а `await` се използва в рамките на такава функция, за да спре изпълнението, докато Promise бъде изпълнен или отхвърлен.

За повече информация:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Следните API-та са добре поддържани в TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Итератори и генератори

Както итераторите, така и генераторите са добре поддържани в TypeScript.

Итераторите са обекти, които имплементират iterator протокола, предоставяйки начин за достъп до елементите на колекция или последователност един по един. Те представляват структура, която съдържа указател към следващия елемент в итерацията. Имат метод `next()`, който връща следващата стойност в последователността заедно с boolean стойност, указваща дали последователността е `done`.

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

Генераторите са специални функции, дефинирани със синтаксиса `function*`, които улесняват създаването на итератори. Те използват ключовата дума `yield`, за да дефинират последователността от стойности и автоматично спират и възобновяват изпълнението, когато се изискват стойности.

Генераторите улесняват създаването на итератори и са особено полезни при работа с големи или безкрайни последователности.

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

TypeScript също така поддържа async итератори и async генератори.

За повече информация:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs JSDoc Reference

Когато работите с JavaScript кодова база, е възможно да помогнете на TypeScript да извлече правилния тип, използвайки JSDoc коментари с допълнителни анотации за предоставяне на типова информация.

Пример:

```typescript
/**
 * Изчислява степента на дадено число
 * @constructor
 * @param {number} base – Основната стойност на израза
 * @param {number} exponent – Степента на израза
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Full documentation is provided to this link:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

От версия 3.7 е възможно да се генерират `.d.ts` type definitions от JavaScript JSDoc синтаксис.
Повече информация може да бъде намерена тук:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Пакетите под организацията @types са специална naming convention, използвана за предоставяне на type definitions за съществуващи JavaScript библиотеки или модули. Например:

```shell
npm install --save-dev @types/lodash
```

ще инсталира type definitions за `lodash` във вашия проект.

За да допринесете към type definitions на @types пакет, изпратете pull request към: [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) е разширение на синтаксиса на JavaScript, което позволява да пишете HTML-подобен код директно в JavaScript или TypeScript файлове. Често се използва в React за дефиниране на HTML структура.

TypeScript разширява възможностите на JSX чрез type checking и static analysis.

За да използвате JSX, трябва да зададете `jsx` опцията в `tsconfig.json`. Две често използвани конфигурации:

* "preserve": генерира .jsx файлове без промяна на JSX. TypeScript запазва JSX синтаксиса и не го трансформира. Подходящо, ако използвате инструмент като Babel.
* "react": активира вградената JSX трансформация в TypeScript. Използва се React.createElement.

Всички опции:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 Modules

TypeScript поддържа ES6 (ECMAScript 2015) и следващи версии. Това означава, че можете да използвате arrow functions, template literals, класове, модули, destructuring и други.

За да активирате ES6 функционалности, задайте `target` в tsconfig.json.

Пример:

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

### ES7 Exponentiation Operator

Операторът за повдигане в степен (`**`) изчислява стойността, получена при повдигането на първия операнд в степен на втория операнд. Той работи по подобен начин като `Math.pow()`, но с допълнителната възможност да приема BigInts като операнди.
TypeScript поддържа напълно този оператор, ако използвате `target` в файла tsconfig.json и сте задали `es2016` или по-нова версия.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### The for-await-of Statement

Това е JavaScript функционалност, напълно поддържана в TypeScript, която позволява итериране върху асинхронни iterable обекти (от es2018).

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

### New target meta-property

В TypeScript можете да използвате метасвойството `new.target`, което ви позволява да установите дали дадена функция или конструктор е бил извикан чрез оператора `new`. То ви позволява да установите дали даден обект е бил създаден в резултат на извикване на конструктор.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
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

### Dynamic Import Expressions

Възможно е модулите да се зареждат условно или да се зареждат при поискване чрез предложението на ECMAScript за динамичен импорт, което се поддържа в TypeScript.

Синтаксисът за динамични import изрази в TypeScript е следният:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Тази команда стартира компилатора на TypeScript с параметъра `--watch`, който позволява автоматично прекомпилиране на файловете в TypeScript при всяка промяна в тях.

```shell
tsc --watch
```

От версия 4.9 на TypeScript, наблюдението на файлове основно разчита на събития от файловата система, автоматично преминавайки към polling, ако не може да се установи наблюдател, базиран на събития.

### Non-null Assertion Operator

Non-null Assertion операторът (постфикс !), наричан още "утвърждаване за определено присвояване", е функция на TypeScript, която ви позволява да потвърдите, че дадена променлива или свойство не е null или undefined, дори ако статичният типов анализ на TypeScript предполага, че това може да е така. С тази функция е възможно да се премахнат всички изрични проверки.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Декларации със стойности по подразбиране

Декларации със стойности по подразбиране се използват, когато на дадена променлива или параметър е присвоена стойност по подразбиране. Това означава, че ако не бъде подадена стойност за тази променлива или параметър, вместо това ще се използва стойността по подразбиране.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Optional Chaining

Операторът за optional chaining `?.` работи подобно на стандартния точков оператор (`.`) за достъп до свойства или методи. Разликата е, че той обработва безопасно стойности `null` или `undefined`, като прекратява израза и връща `undefined`, вместо да хвърля грешка.

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

### Nullish coalescing operator

Операторът за nullish coalescing `??` връща стойността от дясната страна, ако лявата страна е `null` или `undefined`; в противен случай връща стойността от лявата страна.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Template Literal Types

Template Literal Types позволяват да се манипулират string стойности на ниво тип и да се генерират нови string типове на база съществуващи. Те са полезни за създаване на по-изразителни и прецизни типове при операции със string стойности.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Function overloading

Function overloading позволява да дефинираш множество function signatures за една и съща функция, като всяка има различни типове на параметрите и return type.
Когато извикаш overloaded функция, TypeScript използва подадените аргументи, за да определи правилния function signature:

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

### Recursive Types

Recursive Type е тип, който може да реферира сам себе си. Това е полезно за дефиниране на структури от данни с йерархична или рекурсивна структура (потенциално безкрайно вложени), като linked lists, trees и graphs.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Recursive Conditional Types

В TypeScript е възможно да се дефинират сложни типови зависимости чрез логика и рекурсия.
Нека го разделим на по-прости части:

Conditional Types позволяват да дефинираш типове на базата на булеви условия:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Рекурсия означава дефиниция на тип, която се реферира към самата себе си:

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

Recursive Conditional Types комбинират и двете - условна логика и рекурсия. Това означава, че дефиницията на тип може да зависи от самата себе си чрез условни проверки, което позволява много гъвкави и сложни типови отношения.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### ECMAScript Module Support in Node

Node.js добавя поддръжка за ECMAScript Modules от версия 15.3.0, а TypeScript поддържа ECMAScript Module Support за Node.js от версия 4.7. Това може да се активира чрез свойството `module` със стойност `nodenext` в tsconfig.json файла:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js поддържа два файлови разширения за модули: `.mjs` за ES modules и `.cjs` за CommonJS modules. Съответните TypeScript разширения са `.mts` за ES modules и `.cts` за CommonJS modules. При компилация TypeScript ще генерира `.mjs` и `.cjs` файлове.

Ако искате да използвате ES модули във вашия проект, можете да зададете стойността на свойството `type` на "module" във файла package.json. Това указва на Node.js да третира проекта като проект с ES модули.

TypeScript също поддържа type declarations чрез .d.ts файлове. Те предоставят типова информация за библиотеки или модули, което позволява type checking и auto-completion.

### Assertion Functions

В TypeScript assertion functions са функции, които чрез своята връщана стойност показват дали дадено условие е изпълнено. В най-опростения си вид функцията за проверка проверява даден предикат и генерира грешка, когато предикатът се оценява като false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Или може да бъде деклариран като function expression:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Assertion functions са подобни на type guards. Type guards се използват за runtime проверки и връщат boolean стойност, която показва дали даден тип е валиден в конкретен контекст. Разликата е, че type guards връщат false, докато assertion functions хвърлят грешка при неуспех.
Функциите за проверка имат сходства с типовите защити. Типовите защити бяха въведени първоначално, за да извършват проверки по време на изпълнение и да гарантират типа на дадена стойност в рамките на конкретен обхват. По-конкретно, типовата защита е функция, която изчислява типов предикат и връща булева стойност, показваща дали предикатът е истински или неистински. Това се различава леко от функциите за проверка, при които целта е да се генерира грешка, а не да се върне стойност false, когато предикатът не е изпълнен.

Пример за типна защита:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Variadic Tuple Types

Variadic Tuple Types са feature, въведен в TypeScript версия 4.0, нека започнем да ги изучаваме, като си припомним какво е tuple:

Tuple типът е масив, който има дефинирана дължина и в който типът на всеки елемент е известен:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Терминът "variadic" означава неопределена арност (приема променлив брой аргументи).

Variadic tuple е tuple тип, който има всички свойства като преди, но точната форма все още не е дефинирана:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

В предишния код можем да видим, че формата на tuple-а се определя от generic-а `T`, който е подаден.

Variadic tuple-ите могат да приемат множество generics, което ги прави много гъвкави:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

С новите variadic tuples можем да използваме:

* Spread синтаксисът в tuple type вече може да бъде generic, което означава, че можем да моделираме higher-order операции върху tuples и arrays дори когато не знаем реалните типове, с които работим.
* Rest елементи могат да се появяват на всяка позиция в tuple.

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

### Boxed types

Boxed types се отнасят до wrapper обекти, които се използват за представяне на primitive типове като обекти. Тези wrapper обекти предоставят допълнителна функционалност и методи, които не са налични директно върху primitive стойностите.

Когато достъпваш метод като `charAt` или `normalize` върху `string` primitive, JavaScript го обвива в `String` обект, извиква метода и след това изхвърля обекта.

Демонстрация:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript представя тази разлика чрез отделни типове за primitive стойностите и техните object wrapper-и:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Boxed types обикновено не са необходими. Избягвай използването им и вместо това използвай primitive типове — например `string` вместо `String`.

### Ковариантност и Контравариантност в TypeScript

Ковариантността и контравариантността описват поведението на типовите отношения в генеричните типове.

В TypeScript:

* Масивите са **ковариантни**, но това не е напълно типово безопасно.
* Типовете на параметрите на функциите са:
  * **контравариантни**, когато `strictFunctionTypes` е включен
  * **бивариантни** в противен случай

Ковариантността означава, че връзката се запазва: ако тип A е подтип на тип B, тогава `F<A>` също е подтип на `F<B>`. В TypeScript това обикновено се появява в типовете на връщаните стойности и в масивите (въпреки че ковариантността на масивите не е напълно типово безопасна).

Контравариантността означава, че връзката е обърната: ако тип A е подтип на тип B, тогава `F<B>` е подтип на `F<A>`. В TypeScript типовете на параметрите на функциите са предназначени да бъдат контравариантни, което означава, че функция, която приема по-широк тип, може да се използва там, където се очаква по-тесен тип.

Въпреки това, на практика, TypeScript често позволява бивариантност за параметрите на функциите (освен ако `strictFunctionTypes` не е включен), което означава, че и двете посоки могат да бъдат приети, дори когато това не е строго типово безопасно.

Пример: Представете си пространство за всички животни и отделно пространство само за кучета.

* **Ковариантност**:  
  Можете да използвате "пространство за кучета", където се очаква "пространство за животни", защото всички кучета са животни.  
  Но не можете да използвате "пространство за животни", където се очаква "пространство за кучета", защото може да съдържа животни, които не са кучета.

* **Контравариантност** (мислете в термини на функции):  
  Ако имате нещо, което може да се справи с **всяко животно**, можете да го използвате там, където се очаква нещо, което се справя **само с кучета**.  
  Но не и обратното.

Пример за ковариантност:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Масивите в TypeScript са ковариантни (но не са типово безопасни)
animals = dogs; // allowed
dogs = animals; // error
```

Пример за контравариантност:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Преднамерена контравариантност:
feedDog = feedAnimal; // safe

// Това зависи от настройките на компилатора:
feedAnimal = feedDog; // грешка само при strictFunctionTypes
```

#### Optional Variance Annotations for Type Parameters

От TypeScript 4.7.0 можем да използваме `out` и `in` keywords, за да уточним variance аннотацията.

За covariant използваме `out`:

```typescript
type AnimalCallback<out T> = () => T; // T е covariant тук
```

А за contravariant използваме `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T е contravariant тук
```

### Template String Pattern Index Signatures

Template string pattern index signatures ни позволяват да дефинираме гъвкави index signatures чрез template string patterns. Тази функционалност ни позволява да създаваме обекти, които могат да бъдат индексирани със специфични шаблони от string keys, като по този начин получаваме повече контрол и прецизност при достъп и манипулация на свойства.

TypeScript от версия 4.4 позволява index signatures за symbols и template string patterns.

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

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### The satisfies Operator

`satisfies` операторът позволява да провериш дали даден тип отговаря на специфичен interface или условие. С други думи, той гарантира, че типът има всички изисквани свойства и методи на даден interface. Това е начин да се гарантира, че дадена променлива съответства на дефиниция на тип.
Ето един пример:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// В следните редове TypeScript няма да може да направи правилно inference
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion с `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// И тук TypeScript няма да може да направи правилно inference
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Използвайки `satisfies` операторите, можем да направим правилно inference на типовете
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript инферира правилно: string[]
user3.nickName; // TypeScript инферира правилно: undefined
```

### Type-Only Imports и Export

Type-Only Imports и Export позволява да импортираш или експортираш типове без да импортираш или експортираш стойностите или функциите, свързани с тези типове. Това може да бъде полезно за намаляване на размера на bundle-а.

За type-only imports можеш да използваш ключовата дума `import type`.

TypeScript позволява използване както на declaration, така и на implementation файлови разширения (.ts, .mts, .cts и .tsx) в type-only imports, независимо от настройката `allowImportingTsExtensions`.

Например:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Поддържат се следните форми:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using declaration и Explicit Resource Management

`using` декларация е block-scoped, immutable binding, подобен на `const`, използван за управление на disposable ресурси. Когато бъде инициализиран със стойност, методът `Symbol.dispose` на тази стойност се записва и впоследствие се изпълнява при излизане от съответния block scope.

Това е базирано на ECMAScript Resource Management функционалност, която е полезна за извършване на важни cleanup операции след създаване на обекти, като затваряне на връзки, изтриване на файлове и освобождаване на памет.

Бележки:

* Поради скорошното му въвеждане в TypeScript версия 5.2, повечето runtime среди нямат нативна поддръжка. Ще са ви необходими полифили за: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Освен това, ще трябва да конфигурирате вашия tsconfig.json както следва:

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
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

Кодът ще изведе:

```shell
1
2
disposed
3
```

Resource, който е eligible за disposal, трябва да отговаря на `Disposable` interface:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

`using` декларациите записват disposal операциите в stack, като гарантират, че те се изпълняват в обратен ред на декларацията:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Resources се гарантира, че ще бъдат disposed, дори ако последващ код или exception възникне. Това може да доведе до ситуация, в която disposal хвърля exception, който може да suppress-не друг. За да се запази информация за suppressed errors, се въвежда нов native exception `SuppressedError`.

#### Декларация await using

Декларацията `await using` се използва за управление на асинхронно освобождаеми ресурси. Стойността трябва да разполага с метод `Symbol.asyncDispose`, който ще бъде извикан в края на блока.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

За да бъде ресурсът асинхронно освобождаем, той трябва да отговаря на интерфейса `Disposable` или `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // Метод, който се извиква, когато обектът се унищожава асинхронно
    [Symbol.asyncDispose]() {
        // Затваряне на връзката и връщане на promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Създаване на нова връзка и асинхронно освобождаване, когато излезе от обхвата
    await using connection = new DatabaseConnection(); //  Resource е деклариран
    console.log('Doing some work...');
} // Resource е освободен (например, `await connection[Symbol.asyncDispose]()` се извиква)

doWork();
```

Кодът ще изведе:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Декларациите `using` и `await using` са разрешени в изрази: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Import Attributes

Import Attributes в TypeScript 5.3 (labels за imports) казват на runtime-a как да обработи модули (JSON и др.). Това подобрява сигурността, като гарантира ясни imports и се съобразява с Content Security Policy (CSP) за по-безопасно зареждане на ресурси. TypeScript валидира тяхната коректност, но оставя интерпретацията на runtime-а.

Пример:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

с dynamic import:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Проверка на синтаксиса на регулярните изрази

От версия 5.5.4 на TypeScript той проверява литералите с регулярни изрази за често срещани грешки още по време на компилация (например невалиден синтаксис, грешни обратни препратки, неподдържани функции за целевата версия на JavaScript). Това помага за ранното откриване на грешки, но не проверява низовете от типа new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` ви позволява да заредите модул, но да забавите неговото изпълнение, докато всъщност не използвате нещо от него. Това помага да се избегне ненужна работа и странични ефекти.

* Работи само с: `import defer * as name from "module"`
* Кодът се изпълнява само когато достъпите експорта
