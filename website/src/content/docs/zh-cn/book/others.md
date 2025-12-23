---
title: 其他
sidebar:
  order: 61
  label: 61. 其他
---


### 错误和异常处理

TypeScript 允许您使用标准 JavaScript 错误处理机制捕获和处理错误：

Try-Catch-Finally 块：

```typescript
try {
    // 可能会抛出异常的代码
} catch (error) {
    // 处理错误
} finally {
    // 总是会执行的代码, finally 是可选的
}
```

您还可以处理不同类型的错误：

```typescript
try {
    // 可能会抛出不同类型错误的代码
} catch (error) {
    if (error instanceof TypeError) {
        // 处理 TypeError
    } else if (error instanceof RangeError) {
        // 处理 RangeError
    } else {
        // 处理其他的错误
    }
}
```

自定义错误类型：

可以通过扩展 Error 来指定更具体的错误 `class` ：

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### 混合类

Mixin 类允许您将多个类的行为组合并组合成一个类。它们提供了一种重用和扩展功能的方法，而不需要深层继承链。

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

// 扩展 MyClass 以包含可识别和可选择的行为
interface MyClass extends Identifiable, Selectable {}

// 将 mixins 应用于类的函数
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

// 将 mixins 应用到 MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### 异步语言特性

由于 TypeScript 是 JavaScript 的超集，因此它内置了 JavaScript 的异步语言功能，例如：

Promises：

Promise 是一种处理异步操作及其结果的方法，使用 `.then()`和等方法 `.catch()` 来处理成功和错误条件。

要了解更多信息： [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Async/await 关键字是一种为处理 Promise 提供看起来更同步的语法的方法。`async` 关键字用于定义异步函数，并且 `await` 关键字在异步函数中使用以暂停执行，直到 Promise 被解决或拒绝。

要了解更多信息：
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

TypeScript 很好地支持以下 API：

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### 迭代器和生成器

TypeScript 对迭代器和生成器都提供了很好的支持。

迭代器是实现迭代器协议的对象，提供了一种逐个访问集合或序列元素的方法。它是一个包含指向迭代中下一个元素的指针的结构。他们有一个 `next()` 方法返回序列中的下一个值以及指示序列是否为 的布尔值 `done` 。

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

生成器是使用 `function*` 简化迭代器创建的语法定义的特殊函数。它们使用 `yield` 关键字来定义值的序列，并在请求值时自动暂停和恢复执行。

生成器使创建迭代器变得更加容易，并且对于处理大型或无限序列特别有用。

例子：

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

TypeScript 还支持异步迭代器和异步生成器。

要了解更多信息：

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs JSDoc 参考

使用 JavaScript 代码库时，可以通过使用 JSDoc 注释和附加注释来提供类型信息，帮助 TypeScript 推断正确的类型。

例子：

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

此链接提供了完整文档：
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

从版本 3.7 开始，可以从 JavaScript JSDoc 语法生成 .d.ts 类型定义。更多信息可以在这里找到：
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

@types 组织下的包是特殊的包命名约定，用于为现有 JavaScript 库或模块提供类型定义。例如使用：

```shell
npm install --save-dev @types/lodash
```

将在您当前的项目中安装 `lodash` 的类型定义。

要为 @types 包的类型定义做出贡献，请向 [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 提交pr请求。

### JSX

JSX (JavaScript XML) 是 JavaScript 语言语法的扩展，允许您在 JavaScript 或 TypeScript 文件中编写类似 HTML 的代码。它通常在 React 中用来定义 HTML 结构。

TypeScript 通过提供类型检查和静态分析来扩展 JSX 的功能。

要使用 JSX，您需要在文件 `tsconfig.json` 中设置 `jsx` 编译器选项。两个常见的配置选项：

* "preserve": 触发 .jsx 文件且 JSX 不变. 此选项告诉 TypeScript 按原样保留 JSX 语法，而不是在编译过程中对其进行转换。 如果您有单独的工具（例如 Babel）来处理转换，则可以使用此选项。
* "react": 启用 TypeScript 的内置 JSX 转换。 将使用 React.createElement 。

所有选项均可在此处使用：
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 模块

TypeScript 确实支持 ES6 (ECMAScript 2015) 和许多后续版本。这意味着您可以使用 ES6 语法，例如箭头函数、模板文字、类、模块、解构等等。

要在项目中启用 ES6 功能，您可以在 `tsconfig.json` 中指定 `target` 属性。

配置示例：

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

### ES7 求幂运算符

求幂 (`**`) 运算符计算通过将第一个操作数进行第二个操作数的幂获得的值。它的功能与 `Math.pow()` 类似，但增加了接受 BigInts 作为操作数的功能。TypeScript 完全支持在 `tsconfig.json` 文件中设置 `target` 为 `es2016`或更大版本来使用此运算符。

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### for-await-of 语句

这是 TypeScript 完全支持的 JavaScript 功能，它允许您从目标版本 `es2018` 迭代异步可迭代对象。

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

### New target 元属性

您可以在 TypeScript 中使用 `new.target` 元属性，该属性使您能够确定是否使用 new 运算符调用函数或构造函数。它允许您检测对象是否是由于构造函数调用而创建的。

```typescript
class Parent {
    constructor() {
        console.log(new.target); // 记录用于创建实例的构造函数
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

### 动态导入表达式

可以使用 TypeScript 支持的动态导入 ECMAScript 建议有条件地加载模块或按需延迟加载模块。

TypeScript 中动态导入表达式的语法如下：

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // 动态导入
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

此命令使用 `--watch` 参数启动 TypeScript 编译器，能够在修改 TypeScript 文件时自动重新编译它们。

```shell
tsc --watch
```

从 TypeScript 4.9 版本开始，文件监控主要依赖于文件系统事件，如果无法建立基于事件的观察程序，则会自动诉诸轮询。

### 默认声明

当为变量或参数分配默认值时，将使用默认声明。这意味着如果没有为该变量或参数提供值，则将使用默认值。

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### 可选链

可选的链接运算符 `?.` 与常规点运算符 (`.`) 一样用于访问属性或方法。但是，它通过优雅处理 `undefined` 和 `null` 来终止表达式并返回 `undefined`，而不是抛出错误。

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

### 空合并运算符

如果 `??` 左侧是 `null` 或者 `undefined` ，则空合并运算符返回右侧值，否则，它返回左侧值。

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### 模板字符串类型

模板字符串类型允许在类型级别操作字符串值并基于现有字符串生成新的字符串类型。它们对于从基于字符串的操作创建更具表现力和更精确的类型非常有用。

```typescript
type Department = 'enginnering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "enginnering-english-id" | "enginnering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### 函数重载

函数重载允许您为同一函数名定义多个函数签名，每个函数签名具有不同的参数类型和返回类型。当您调用重载函数时，TypeScript 使用提供的参数来确定正确的函数签名：

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

### 递归类型

递归类型是可以引用自身的类型。 这对于定义具有分层或递归结构（可能无限嵌套）的数据结构非常有用，例如链表、树和图。

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### 递归条件类型

可以使用 TypeScript 中的逻辑和递归来定义复杂的类型关系。让我们简单地分解一下：

条件类型：允许您基于布尔条件定义类型：

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

递归：是指在自己的定义中引用自身的类型定义：

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

递归条件类型结合了条件逻辑和递归。这意味着类型定义可以通过条件逻辑依赖于自身，从而创建复杂且灵活的类型关系。

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Node 中的 ECMAScript 模块支持

Node.js 从 15.3.0 版本开始添加了对 ECMAScript 模块的支持，而 TypeScript 从 4.7 版本开始增加了对 Node.js 的 ECMAScript 模块支持。可以通过将 `tsconfig.json` 文件中的`module`属性的值设置为 `nodenext` 来启用此支持。这是一个例子：

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js 支持两种模块文件扩展名：`.mjs` 的ES 模块和 `.cjs` 的CommonJS 模块。TypeScript 中的等效文件扩展名适用 `.mts` 于 ES 模块和 `.cts` 于CommonJS 模块。当 TypeScript 编译器将这些文件转译为 JavaScript 时，它将分别创建 `.mjs` 和 `.cjs` 文件。

如果您想在项目中使用 ES 模块，可以type在 package.json 文件中将该属性设置为"module"。这指示 Node.js 将项目视为 ES 模块项目。

此外，TypeScript 还支持 .d.ts 文件中的类型声明。这些声明文件为用 TypeScript 编写的库或模块提供类型信息，允许其他开发人员通过 TypeScript 的类型检查和自动完成功能来利用它们。

### 断言函数

在 TypeScript 中，断言函数是根据返回值指示特定条件验证的函数。在最简单的形式中，断言函数检查提供的谓词，并在谓词计算结果为 false 时引发错误。

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

或者可以声明为函数表达式：

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

断言函数与类型保护有相似之处。类型保护最初是为了执行运行时检查并确保值的类型在特定范围内而引入的。具体来说，类型保护是一个计算类型谓词并返回指示谓词是真还是假的布尔值的函数。这与断言函数略有不同，断言函数的目的是在不满足谓词时抛出错误而不是返回 false。

类型保护示例：

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### 可变参数元组类型

可变元组类型是 TypeScript 4.0 版本中引入的一个功能，让我们通过回顾什么是元组来开始学习它们：

元组类型是一个具有定义长度的数组，并且每个元素的类型已知：

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

术语"可变参数"意味着不定数量（接受可变数量的参数）。

可变参数元组是一种元组类型，它具有以前的所有属性，但确切的形状尚未定义：

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

在前面的代码中我们可以看到元组形状是由T传入的泛型定义的。

可变参数元组可以接受多个泛型，这使得它们非常灵活：

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

使用新的可变参数元组，我们可以使用：

* 元组类型语法中的扩展现在可以是通用的，因此即使我们不知道我们正在操作的实际类型，我们也可以表示元组和数组上的高阶操作
* 其余元素可以出现在元组中的任何位置。

例子：

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

### 装箱类型

装箱类型是指用于将基本类型表示为对象的包装对象。这些包装器对象提供了原始值无法直接使用的附加功能和方法。

当你访问原始 `string` 上的 `charAt` 或者 `normalize` 方法时，JavaScript 将其包装在 `String` 类型的对象中，调用该方法，然后丢弃该对象

示范：

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript 通过为原语及其相应的对象包装器提供单独的类型来表示这种区别：

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

通常不需要盒装类型。避免使用装箱类型，而是使用基元类型，例如 `string` 代替 `String`。

### TypeScript 中的协变和逆变

协变和逆变用于描述在处理类型的继承或赋值时关系如何工作。

协变意味着类型关系保留继承或赋值的方向，因此如果类型 A 是类型 B 的子类型，则类型 A 的数组也被视为类型 B 的数组的子类型。这里需要注意的重要事项是维持子类型关系，这意味着协变接受子类型但不接受超类型。

逆变意味着类型关系颠倒了继承或赋值的方向，因此如果类型 A 是类型 B 的子类型，则类型 B 的数组被视为类型 A 数组的子类型。子类型关系颠倒了，这意味着该逆变接受超类型但不接受子类型。

注意：双变量意味着同时接受超类型和子类型。

示例：假设我们有一个适合所有动物的空间和一个专门适合狗的单独空间。

在协方差中，您可以将所有狗放入动物空间中，因为狗是一种动物。但你不能把所有的动物都放在狗的空间里，因为可能还有其他动物混在一起。

在逆变中，您不能将所有动物放入狗空间中，因为动物空间也可能包含其他动物。然而，你可以把所有的狗都放在动物空间里，因为所有的狗也是动物。

<!-- skip -->
```typescript
// 协变示例
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

// 协变允许将子类型（狗）数组分配给超类型（动物）数组
animals = dogs;
dogs = animals; // 无效: 'Animal[]' 不能赋值给 'Dog[]'

// 逆变示例
type Feed<in T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = (animal: Animal) => {
    console.log(`Animal name: ${animal.name}`);
};

let feedDog: Feed<Dog> = (dog: Dog) => {
    console.log(`Dog name: ${dog.name}, Breed: ${dog.breed}`);
};

// 逆变允许将超类型（动物）回调赋值给子类型（狗）回调
feedDog = feedAnimal;
feedAnimal = feedDog; // 无效: Type 'Feed<Dog>' 不能赋值给 'Feed<Animal>'.
```

在 TypeScript 中，数组的类型关系是协变的，而函数参数的类型关系是逆变的。这意味着 TypeScript 同时表现出协变和逆变，具体取决于上下文。

#### 类型参数的可选方差注释

从 TypeScript 4.7.0 开始，我们可以使用out和in关键字来具体说明方差注释。

对于协变，使用out关键字：

```typescript
type AnimalCallback<out T> = () => T; // 此处 T 是协变的
```

对于逆变，使用in关键字：

```typescript
type AnimalCallback<in T> = (value: T) => void; // 此处 T 是逆变的
```

### 模板字符串模式索引签名

模板字符串模式索引签名允许我们使用模板字符串模式定义灵活的索引签名。 此功能使我们能够创建可以使用特定字符串键模式进行索引的对象，从而在访问和操作属性时提供更多控制和特异性。

TypeScript 4.4 版开始允许符号和模板字符串模式的索引签名。

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

### satisfies操作符

`satisfies` 允许您检查给定类型是否满足特定接口或条件。换句话说，它确保类型具有特定接口所需的所有属性和方法。这是确保变量适合类型定义的一种方法。

下面是一个示例：

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// `User`的类型注释
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// 在以下几行中，TypeScript 将无法正确推断
user.attributes?.map(console.log); // 'string | string[]' 中不存在属性 'map'。'string' 中不存在属性 'map'。
user.nickName; // string | string[] | undefined

// 类型断言 `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// 这里也一样的， TypeScript 将无法正确推断
user2.attributes?.map(console.log); //'string | string[]' 中不存在属性 'map'。'string' 中不存在属性 'map'。
user2.nickName; // string | string[] | undefined

// 使用"satisfies"运算符我们现在可以正确推断类型
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript 推断正确: string[]
user3.nickName; // TypeScript 推断正确: undefined
```

### 仅类型导入和导出

仅类型导入和导出允许您导入或导出类型，而无需导入或导出与这些类型关联的值或函数。 这对于减小捆绑包的大小很有用。

要使用仅类型导入，您可以使用`import type`关键字。

TypeScript 允许在仅类型导入中使用声明和实现文件扩展名（.ts、.mts、.cts 和 .tsx），无论`allowImportingTsExtensions`设置如何。

例如：

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

以下是支持的形式：

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### 使用声明和显式资源管理

"using"声明是块范围的、不可变的绑定，类似于"const"，用于管理一次性资源。 当使用值初始化时，该值的"Symbol.dispose"方法将被记录，并随后在退出封闭块作用域时执行。

这是基于 ECMAScript 的资源管理功能，该功能对于在对象创建后执行基本的清理任务非常有用，例如关闭连接、删除文件和释放内存。

笔记：

* 由于最近在 TypeScript 5.2 版中引入，大多数运行时缺乏本机支持。 您将需要以下功能的填充：`Symbol.dispose`、`Symbol.asyncDispose`、`DisposableStack`、`AsyncDisposableStack`、`SuppressedError`。
* 此外，您需要按如下方式配置 tsconfig.json：

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
````

例子：

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // 简单的兼容性填充

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // 资源被声明
    console.log(2);
} // 资源被释放 (例如, `work[Symbol.dispose]()` 被执行)

console.log(3);
```

该代码将记录：

```shell
1
2
disposed
3
```

符合处置条件的资源必须遵守 `Disposable` 接口：

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

"using"声明在堆栈中记录资源处置操作，确保它们以与声明相反的顺序处置：

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // 先释放 `C`, 然后 `B`, 然后 `A`.
```

即使发生后续代码或异常，也保证会释放资源。 这可能会导致处置可能引发异常，并可能抑制另一个异常。 为了保留有关被抑制错误的信息，引入了一个新的本机异常"SuppressedError"。

#### 使用声明等待

"await using"声明处理异步一次性资源。 该值必须具有"Symbol.asyncDispose"方法，该方法将在块末尾等待。

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // 资源被声明
} // // 资源被释放 (例如, `await work[Symbol.asyncDispose]()` 被执行)
```

对于异步可处置资源，它必须遵守"Disposable"或"AsyncDisposable"接口：

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polify

class DatabaseConnection implements AsyncDisposable {
    // 当对象被异步释放时会被调用的方法
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // 创建一个新的连接，并在其超出作用域时进行异步释放
    await using connection = new DatabaseConnection(); // 资源被声明
    console.log('Doing some work...');
} // 资源被释放 (例如, `await connection[Symbol.asyncDispose]()` 被执行)

doWork();
```

代码日志：

```shell
Doing some work...
Closing the connection...
Connection closed.
```

语句中允许使用"using"和"await using"声明："for"、"for-in"、"for-of"、"for-await-of"、"switch"。

### 导入属性

TypeScript 5.3 的导入属性（导入标签）告诉运行时如何处理模块（JSON 等）。这通过确保干净的导入来提高安全性，并与内容安全策略 (CSP) 保持一致，以实现更安全的资源加载。TypeScript 确保它们有效，但让运行时处理它们的解释以进行特定的模块处理。

示例：

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

使用动态导入：

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```
