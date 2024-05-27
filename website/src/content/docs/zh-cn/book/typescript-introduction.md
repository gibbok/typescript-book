---
title: TypeScript简介
sidebar:
  order: 7
  label: 7. TypeScript简介
---


### 什么是TypeScript？

TypeScript 是一种基于 JavaScript 构建的强类型编程语言。它最初由 Anders Hejlsberg 于 2012 年设计，目前由 Microsoft 作为开源项目开发和维护。

TypeScript 编译为 JavaScript，并且可以在任何 JavaScript 运行时（例如浏览器或服务器 Node.js）中执行。

TypeScript 支持多种编程范式，例如函数式、泛型、命令式和面向对象。TypeScript 既不是解释型语言，也不是编译型语言。

### 为什么选择 TypeScript？

TypeScript 是一种强类型语言，有助于防止常见的编程错误，并在程序执行之前避免某些类型的运行时错误。

强类型语言允许开发人员在数据类型定义中指定各种程序约束和行为，从而有助于验证软件的正确性并防止缺陷。这在大规模应用中尤其有价值。

TypeScript 的一些好处

* 静态类型，可选强类型
* 类型推断
* 能使用ES6和ES7的新功能
* 跨平台和跨浏览器兼容性 \* IntelliSense 工具支持

### TypeScript 和 JavaScript

TypeScript是用`.ts`或`.tsx`文件编写的, 而JavaScript是用`.js`或`.jsx`文件编写的。

扩展名为.tsx或.jsx的文件可以包含 JavaScript 语法扩展 JSX，该扩展在 React 中用于 UI 开发。

就语法而言，TypeScript 是 JavaScript (ECMAScript 2015) 的类型化超集。所有 JavaScript 代码都是有效的 TypeScript 代码，但反之则不然。

例如，考虑 JavaScript 文件中具有.js扩展名的函数，如下所示：

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

该函数可以通过将文件扩展名更改为 .TypeScript 来转换和使用.ts。但是，如果同一个函数使用 TypeScript 类型进行注释，则未经编译就无法在任何 JavaScript 运行时中执行。如果未编译以下 TypeScript 代码，将会产生语法错误

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript 旨在通过让开发人员使用类型注释定义意图来检测编译期间运行时可能发生的异常。此外，如果没有提供类型注释，TypeScript 也可以捕获问题。例如，以下代码片段未指定任何 TypeScript 类型：

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

在这种情况下，TypeScript 检测到错误并报告：

```text
类型 '{ x: number; }' 上不存在属性 'y' 。
```

TypeScript 的类型系统很大程度上受到 JavaScript 运行时行为的影响。例如，加法运算符 (+) 在 JavaScript 中可以执行字符串连接或数字加法，在 TypeScript 中以相同的方式建模：

```typescript
const result = '1' + 1; // 结果是string类型
```

TypeScript 背后的团队经过深思熟虑，决定将 JavaScript 的异常使用标记为错误。例如，考虑以下有效的 JavaScript 代码：

<!-- skip -->
```typescript
const result = 1 + true; // 在JavaScript中, 结果等于2
```

但是，TypeScript 会抛出错误：

```text
运算符"+"不能应用于类型"number"和"boolean"。
``````

出现此错误的原因是 TypeScript 严格强制执行类型兼容性，在这种情况下，它标识了数字和布尔值之间的无效操作。

### TypeScript 代码生成

TypeScript 编译器有两个主要职责：检查类型错误和编译为 JavaScript。这两个过程是相互独立的。类型不会影响 JavaScript 运行时中代码的执行，因为它们在编译过程中会被完全擦除。即使存在类型错误，TypeScript 仍然可以输出 JavaScript。以下是存在类型错误的 TypeScript 代码示例：

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // "字符串"类型的参数不可赋值给"数字"类型的参数
```

但是，它仍然可以生成可执行的 JavaScript 输出：

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

无法在运行时检查 TypeScript 类型。例如：

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // "Dog"仅指一种类型，但在这里用作值。
        // ...
    }
};
```

由于编译后类型被删除，因此无法在 JavaScript 中运行此代码。为了在运行时识别类型，我们需要使用另一种机制。TypeScript 提供了多种选项，其中常见的一个是 "标签联合（tagged union）"。例如：

```typescript
interface Dog {
    kind: 'dog'; // 标签联合
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // 标签联合
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

属性"kind"是一个可以在运行时用来区分 JavaScript 中的对象的值。

运行时的值也可能具有与类型声明中声明的类型不同的类型。例如，如果开发人员误解了 API 类型并对其进行了错误注释。

TypeScript 是 JavaScript 的超集，因此"class"关键字可以在运行时用作类型和值。

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(public name: string, public bark: () => void) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(public name: string, public meow: () => void) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

在 JavaScript 中，"类"具有"prototype"属性，"instanceof"运算符可用于测试构造函数的原型属性是否出现在对象原型链中的任何位置。

TypeScript 对运行时性能没有影响，因为所有类型都将被删除。然而，TypeScript 确实引入了一些构建时间开销。

### 现在的现代 JavaScript（降级）

TypeScript 可以将代码编译为自 ECMAScript 3 (1999) 以来任何已发布的 JavaScript 版本。这意味着 TypeScript 可以将代码从最新的 JavaScript 功能转换为旧版本，这一过程称为降级。这允许使用现代 JavaScript，同时保持与旧运行时环境的最大兼容性。

值得注意的是，在转换为旧版本 JavaScript 的过程中，TypeScript 可能会生成与本机实现相比会产生性能开销的代码。

以下是一些可以在 TypeScript 中使用的现代 JavaScript 功能：

* ECMAScript 模块，而不是 AMD 风格的"define"回调或 CommonJS 的"require"语句。
* 用类代替原型。
* 变量声明使用"let"或"const"而不是"var"。
* "for-of"循环或".forEach"而不是传统的"for"循环。
* 用箭头函数代替函数表达式。
* 解构赋值。
* 简写属性/方法名称和计算属性名称。
* 默认函数参数。

通过利用这些现代 JavaScript 功能，开发人员可以在 TypeScript 中编写更具表现力和简洁的代码。

