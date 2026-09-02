---
title: Изучение системы типов
sidebar:
  order: 10
  label: 10. Изучение системы типов
---


### Языковая служба TypeScript

Языковая служба TypeScript, также известная как tsserver, предоставляет различные возможности, включая сообщения об ошибках, диагностику, компиляцию при сохранении, переименование, переход к определению, списки автодополнения, подсказки по сигнатурам и многое другое. Она преимущественно используется интегрированными средами разработки (IDE) для поддержки IntelliSense. Служба беспрепятственно интегрируется с Visual Studio Code и используется такими инструментами, как Conquer of Completion (Coc).

Разработчики могут использовать специальный API и создавать собственные плагины языковой службы, чтобы улучшить процесс редактирования TypeScript. Это может быть особенно полезно для реализации специальных возможностей линтинга или включения автодополнения для пользовательского языка шаблонов.

<!-- markdownlint-disable MD044 -->
Примером реального специализированного плагина является "typescript-styled-plugin", который сообщает о синтаксических ошибках и поддерживает IntelliSense для свойств CSS в стилизованных компонентах.
<!-- markdownlint-enable MD044 -->

Дополнительную информацию и руководства по быстрому началу работы можно найти в официальной вики TypeScript на GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Структурная типизация

TypeScript основан на структурной системе типов. Это означает, что совместимость и эквивалентность типов определяются фактической структурой или определением типа, а не его именем или местом объявления, как в номинативных системах типов, таких как C# или C.

Структурная система типов TypeScript разработана с учётом того, как динамическая утиная типизация JavaScript работает во время выполнения.

Следующий пример является допустимым кодом TypeScript. Как можно заметить, "X" и "Y" имеют один и тот же член "a", хотя им присвоены разные имена при объявлении. Типы определяются их структурами, а поскольку в данном случае структуры одинаковы, типы совместимы и допустимы.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Основные правила сравнения в TypeScript

Процесс сравнения в TypeScript является рекурсивным и выполняется для типов, вложенных на любом уровне.

Тип "X" совместим с "Y", если "Y" имеет как минимум те же члены, что и "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Параметры функций сравниваются по типам, а не по именам:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Возвращаемые типы функций должны совпадать:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Возвращаемый тип исходной функции должен быть подтипом возвращаемого типа целевой функции:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Отбрасывать параметры функции разрешено, поскольку это распространённая практика в JavaScript, например при использовании "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Таким образом, следующие объявления типов полностью допустимы:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Любые дополнительные необязательные параметры исходного типа допустимы:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Любые необязательные параметры целевого типа, которым не соответствуют параметры исходного типа, допустимы и не приводят к ошибке:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Остаточный параметр рассматривается как бесконечная последовательность необязательных параметров:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Функции с перегрузками допустимы, если сигнатура перегрузки совместима с сигнатурой реализации:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Сравнение параметров функций считается успешным, если исходные и целевые параметры могут быть присвоены супертипам или подтипам (бивариантность).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Перечисления совместимы с числами и наоборот, однако сравнение значений из перечислений разных типов недопустимо.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

При проверке совместимости экземпляров классов учитываются их закрытые и защищённые члены:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

При сравнении не учитываются различия в иерархии наследования, например:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Обобщённые типы сравниваются по их структурам на основе результирующего типа после применения параметра типа. Сравнивается только конечный результат как необобщённый тип.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Если аргументы обобщённых типов не указаны, все неуказанные аргументы рассматриваются как типы "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Помните:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Обратите внимание, что при включённом параметре "strictNullChecks" типы "null" и "undefined" обрабатываются аналогично "void"; в противном случае — аналогично "never".

### Типы как множества

В TypeScript тип представляет собой множество возможных значений. Это множество также называется областью определения типа. Каждое значение типа можно рассматривать как элемент множества. Тип задаёт ограничения, которым должен удовлетворять каждый элемент множества, чтобы считаться его членом.
Основная задача TypeScript — проверять, является ли одно множество подмножеством другого.

TypeScript поддерживает различные виды множеств:

| Термин теории множеств | TypeScript                      | Примечания                                                                                                                    |
| ---------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Пустое множество       | never                           | "never" не содержит ничего, кроме самого себя                                                                                |
| Одноэлементное множество | undefined / null / literal type |                                                                                                                             |
| Конечное множество     | boolean / union                 |                                                                                                                               |
| Бесконечное множество  | string / number / object        |                                                                                                                               |
| Универсальное множество | any / unknown                  | Каждый элемент принадлежит "any", и каждое множество является его подмножеством / "unknown" — типобезопасный аналог "any" |

Ниже приведено несколько примеров:

| TypeScript            | Термин теории множеств       | Пример                                                                          |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (пустое множество)        | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                             |
| Литеральный тип       | Одноэлементное множество    | type X = 'X';                                                                   |
|                       |                             | type Y = 7;                                                                     |
|                       |                             |
| Значение, присваиваемое T | Значение ∈ T (принадлежит) | type XY = 'X' \| 'Y';                                                          |
|                       |                             | const x: XY = 'X';                                                              |
|                       |                             |
| T1 присваивается T2   | T1 ⊆ T2 (подмножество)      | type XY = 'X' \| 'Y';                                                           |
|                       |                             | const x: XY = 'X';                                                              |
|                       |                             | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                             |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (подмножество)      | type X = 'X' extends string ? true : false;                                     |
|                       |                             |
| T1 \| T2              | T1 ∪ T2 (объединение)       | type XY = 'X' \| 'Y';                                                           |
|                       |                             | type JK = 1 \| 2;                                                               |
|                       |                             |
| T1 & T2               | T1 ∩ T2 (пересечение)       | type X = \{ a: string \}                                                          |
|                       |                             | type Y = \{ b: string \}                                                          |
|                       |                             | type XY = X & Y                                                                 |
|                       |                             | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                             |
| unknown               | Универсальное множество     | const x: unknown = 1                                                            |

Объединение (T1 | T2) создаёт более широкое множество (оба множества):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Пересечение (T1 & T2) создаёт более узкое множество (только общие элементы):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

В этом контексте ключевое слово `extends` можно рассматривать как «является подмножеством». Оно задаёт ограничение для типа. Когда `extends` используется с обобщённым типом, оно ограничивает параметр обобщённого типа более конкретным типом.

Обратите внимание, что здесь `extends` не имеет отношения к наследованию классов в смысле ООП.

TypeScript работает со структурными типами и не имеет строгой номинальной иерархии. Как показано в примере ниже, два типа могут пересекаться, хотя ни один из них не является подтипом другого, поскольку TypeScript учитывает структуру, или форму, объектов.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### Задание типа: объявления типов и утверждения типов

В TypeScript тип можно задать разными способами:

#### Объявление типа

В следующем примере мы используем x: X (": Type"), чтобы объявить тип переменной x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Если переменная не соответствует указанному формату, TypeScript сообщит об ошибке. Например:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Утверждение типа

Утверждение можно добавить с помощью ключевого слова `as`. Оно сообщает компилятору, что разработчик располагает дополнительной информацией о типе, и подавляет возможные ошибки.

Например:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

В приведённом выше примере с помощью ключевого слова as утверждается, что объект x имеет тип X. Это сообщает компилятору TypeScript, что объект соответствует указанному типу, даже если у него есть дополнительное свойство b, отсутствующее в определении типа.

Утверждения типов полезны в ситуациях, когда необходимо указать более конкретный тип, особенно при работе с DOM. Например:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Здесь утверждение типа as HTMLInputElement сообщает TypeScript, что результат getElementById следует рассматривать как HTMLInputElement.
Утверждения типов также можно использовать для переназначения ключей, как показано в приведённом ниже примере с шаблонными литералами:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

В этом примере тип `J<Type>` использует сопоставляемый тип с шаблонным литералом для переназначения ключей Type. Он создаёт новые свойства, добавляя к каждому ключу "prefix_", а их соответствующими значениями становятся функции, возвращающие исходные значения свойств.

Стоит отметить, что при использовании утверждения типа TypeScript не выполняет проверку избыточных свойств. Поэтому, если структура объекта известна заранее, обычно предпочтительнее использовать объявление типа.

#### Внешние объявления

Внешние объявления — это файлы, описывающие типы для кода JavaScript; их имена имеют формат `.d.ts`. Обычно они импортируются и используются для аннотирования существующих библиотек JavaScript или добавления типов к существующим файлам JS в проекте.

Типы для многих распространённых библиотек можно найти здесь:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

и установить следующим образом:

```shell
npm install --save-dev @types/library-name
```

Собственные внешние объявления можно импортировать с помощью ссылки с «тремя косыми чертами»:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Внешние объявления можно использовать даже в файлах JavaScript с помощью `// @ts-check`.

Ключевое слово `declare` позволяет задавать определения типов для существующего кода JavaScript без его импорта, выступая в роли заполнителя для типов из другого файла или глобальной области.

### Проверка свойств и проверка избыточных свойств

TypeScript основан на структурной системе типов, однако проверка избыточных свойств — это возможность TypeScript, которая позволяет проверить, содержит ли объект в точности те свойства, которые указаны в типе.

Проверка избыточных свойств выполняется, например, при присваивании объектных литералов переменным или при их передаче в качестве аргументов функции.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Слабые типы

Тип считается слабым, если он содержит только набор необязательных свойств:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript считает ошибкой присваивание слабому типу значения, с которым у него нет общих свойств. Например, следующий код приводит к ошибке:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Хотя это не рекомендуется, при необходимости данную проверку можно обойти с помощью утверждения типа:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Либо добавив `unknown` в индексную сигнатуру слабого типа:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Строгая проверка объектных литералов (свежесть)

Строгая проверка объектных литералов, иногда называемая «свежестью», — это возможность TypeScript, которая помогает обнаруживать избыточные свойства или свойства с опечатками, которые в противном случае остались бы незамеченными при обычных проверках структурной типизации.

При создании объектного литерала компилятор TypeScript считает его «свежим». Если объектный литерал присваивается переменной или передаётся как параметр, TypeScript выдаёт ошибку, если объектный литерал содержит свойства, отсутствующие в целевом типе.

Однако «свежесть» исчезает, когда объектный литерал расширяется или используется утверждение типа.

Рассмотрим несколько примеров:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Вывод типов

TypeScript может выводить типы, если аннотация не указана при:

* Инициализации переменной.
* Инициализации члена.
* Установке значений параметров по умолчанию.
* Определении возвращаемого типа функции.

Например:

```typescript
let x = 'x'; // The type inferred is string
```

Компилятор TypeScript анализирует значение или выражение и определяет его тип на основе доступной информации.

### Более сложные случаи вывода типов

Если при выводе типов используется несколько выражений, TypeScript ищет «наилучшие общие типы». Например:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Если компилятор не может найти наилучшие общие типы, он возвращает тип-объединение. Например:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript использует «контекстную типизацию» на основе расположения переменной для вывода типов. В следующем примере компилятор знает, что `e` имеет тип `MouseEvent`, благодаря типу события `click`, определённому в файле lib.d.ts, который содержит внешние объявления для различных распространённых конструкций JavaScript и DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Расширение типов

Расширение типов — это процесс, при котором TypeScript назначает тип переменной, инициализированной без аннотации типа. Этот процесс допускает переход от узких типов к более широким, но не наоборот.
В следующем примере:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

На основе единственного значения, указанного при инициализации (`x`), TypeScript назначает переменной `x` тип `string`; это пример расширения.

TypeScript позволяет управлять процессом расширения, например с помощью "const".

### Const

Использование ключевого слова `const` при объявлении переменной приводит к выводу более узкого типа в TypeScript.

Например:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

При использовании `const` для объявления переменной x её тип сужается до конкретного литерального значения 'x'. Поскольку тип x сужен, его можно присвоить переменной y без ошибок.
Тип можно вывести, поскольку переменным `const` нельзя повторно присваивать значения, поэтому их тип можно сузить до конкретного литерального типа — в данном случае до литерального типа 'x'.

#### Модификатор const для параметров типов

Начиная с TypeScript 5.0, для параметра обобщённого типа можно указать атрибут `const`. Это позволяет вывести наиболее точный возможный тип. Рассмотрим пример без использования `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Как видно, для свойств `a` и `b` выводится тип `string`.

Теперь рассмотрим различие с версией, использующей `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Теперь видно, что для свойств `a` и `b` выводятся строковые литералы, а не просто типы `string`.

#### Утверждение const

Эта возможность позволяет объявить переменную с более точным литеральным типом на основе её начального значения, сообщая компилятору, что это значение следует рассматривать как неизменяемый литерал. Ниже приведено несколько примеров:

Для отдельного свойства:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Для всего объекта:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Это может быть особенно полезно при определении типа кортежа:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Явная аннотация типа

Можно явно указать тип. В следующем примере свойство `x` имеет тип `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Аннотацию типа можно сделать более конкретной, используя объединение литеральных типов:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Сужение типов

Сужение типов — это процесс в TypeScript, при котором общий тип сужается до более конкретного. Это происходит, когда TypeScript анализирует код и определяет, что некоторые условия или операции позволяют уточнить информацию о типе.

Сужение типов может происходить разными способами, в том числе следующими:

#### Условия

С помощью условных конструкций, таких как `if` или `switch`, TypeScript может сузить тип на основе результата условия. Например:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Выбрасывание исключения или возврат

Выбрасывание исключения или досрочный возврат из ветви можно использовать, чтобы помочь TypeScript сузить тип. Например:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

К другим способам сужения типов в TypeScript относятся:

* Оператор `instanceof`: используется для проверки того, является ли объект экземпляром определённого класса.
* Оператор `in`: используется для проверки наличия свойства в объекте.
* Оператор `typeof`: используется для проверки типа значения во время выполнения.
* Встроенные функции, такие как `Array.isArray()`: используются для проверки того, является ли значение массивом.

#### Дискриминируемое объединение

«Дискриминируемое объединение» — это шаблон в TypeScript, в котором к объектам добавляется явная «метка», позволяющая различать типы внутри объединения. Этот шаблон также называют «помеченным объединением». В следующем примере «метка» представлена свойством «type»:

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Пользовательские защитники типа

В случаях, когда TypeScript не может определить тип, можно написать вспомогательную функцию, известную как «пользовательский защитник типа». В следующем примере мы воспользуемся предикатом типа, чтобы сузить тип после применения фильтрации:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Сужение с помощью switch (true)

В TypeScript 5.3 появилось сужение с помощью switch (true), позволяющее заменить громоздкие цепочки if/else конструкцией switch (true) с логическими условиями. Оно улучшает читаемость и при этом сохраняет сужение типов. Это похоже на сопоставление с образцом, но проще.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

