---
title: 探索类型系统
sidebar:
  order: 9
  label: 9. 探索类型系统
---


### TypeScript 的语言服务

TypeScript 的语言服务, 也被称为 tsserver，提供了各种功能，例如错误报告、诊断、保存时编译、重命名、跳转到定义、补全列表、签名帮助等。 它主要由集成开发环境 (IDE) 使用来提供 IntelliSense 支持。它与 Visual Studio Code 无缝集成，并由 Conquer of Completion (Coc) 等工具使用。

开发人员可以利用专用 API 并创建自己的自定义语言服务插件来增强 TypeScript 编辑体验。这对于实现特殊的 linting 功能或启用自定义模板语言的自动完成特别有用。

<!-- markdownlint-disable MD044 -->
现实世界中的自定义插件的一个示例是"typescript-styled-plugin"，它为样式组件中的 CSS 属性提供语法错误报告和 IntelliSense 支持。
<!-- markdownlint-enable MD044 -->

有关更多信息和快速入门指南，您可以参考 GitHub 上的官方 TypeScript Wiki： <https://github.com/microsoft/TypeScript/wiki/>

### 结构类型

TypeScript 基于结构类型系统。这意味着类型的兼容性和等效性由类型的实际结构或定义决定，而不是由其名称或声明位置决定，如 C# 或 C 等主要类型系统中那样。

TypeScript 的结构类型系统是基于 JavaScript 的动态 duck 类型系统在运行时的工作方式而设计的。

以下示例是有效的 TypeScript 代码。正如您所观察到的，"X"和"Y"具有相同的成员"a"，尽管它们具有不同的声明名称。类型由其结构决定，在这种情况下，由于结构相同，因此它们是兼容且有效的。

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // 有效
```

### TypeScript 的基本比较规则

TypeScript 比较过程是递归的，并在任何级别嵌套的类型上执行。

如果"Y"至少具有与"X"相同的成员，则类型"X"与"Y"兼容。

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // 有效, 至少它拥有相同的成员 X
const r: X = y;
```

函数参数按类型进行比较，而不是按名称进行比较：

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // 有效
x = y; // 有效
```

函数返回类型必须相同：

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // 无效
x = y; // 无效
```

源函数的返回类型必须是目标函数的返回类型的子类型：

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // 有效
y = x; // 无效，缺少 b 成员
```

允许丢弃函数参数，因为这是 JavaScript 中的常见做法，例如使用 "Array.prototype.map()"：

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

因此，以下类型声明是完全有效的：

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // 缺少 b 参数
y = x; // 有效
```

源类型的任何附加可选参数都是有效的：

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // 有效
x = y; // 有效
```

目标类型的任何可选参数在源类型中没有对应的参数都是有效的并且不是错误：

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // 有效
x = y; // 有效
```

其余参数被视为无限系列的可选参数：

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; // 有效
```

如果重载签名与其实现签名兼容，则具有重载的函数有效：

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // 有效
x('a', 1); // 有效

function y(a: string): void; // 无效, 不兼容重载的签名
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

如果源参数和目标参数可赋值给超类型或子类型（Bivariance 双变），则函数参数比较成功。

```typescript
// 超类
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// 子类
class Y extends X {}
// 子类
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// 双变（Bivariance） 确实接收超类
console.log(getA(new X('x'))); // 有效
console.log(getA(new Y('Y'))); // 有效
console.log(getA(new Z('z'))); // 有效
```

枚举与数字具有可比性和有效性，反之亦然，但比较不同枚举类型的枚举值是无效的。

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
const xa: number = X.A; // 有效
const ya: Y = 0; // 有效
X.A === Y.A; // 无效
```

类的实例需要对其私有成员和受保护成员进行兼容性检查：

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

let x: X = new Y('y'); // 无效
```

比较检查不考虑不同的继承层次结构，例如：

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
x === y; // 有效
x === z; // 有效即使 z 来自不同的继承层次结构
```

泛型根据应用泛型参数后的结果类型使用其结构进行比较，仅将最终结果作为非泛型类型进行比较。

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // 无效，因为最终结构中使用了类型参数
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // 有效，因为最终结构中没有使用类型参数
```

当泛型未指定其类型参数时，所有未指定的参数都将被视为带有"any"的类型：

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // 有效
```

记住：

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // 有效，一切都可以赋值给自己

let c: any;
c = 1; // 有效，所有类型都可以赋值给any

let d: unknown;
d = 1; // 有效，所有类型都可以赋值给unknown

let e: unknown;
let e1: unknown = e; // 有效, unknown只能赋值给自己和any
let e2: any = e; // 有效
let e3: number = e; // 无效

let f: never;
f = 1; // 无效, 所有类型不能赋值给never

let g: void;
let g1: any;
g = 1; // 无效, void不可赋值给除"any"之外的任何内容或从任何内容赋值
g = g1; // 有效
```

请注意，当启用"strictNullChecks"时，"null"和"undefined"的处理方式与"void"类似；否则，它们类似于"never"。

### 类型作为集合

在 TypeScript 中，类型是一组可能的值。该集合也称为类型的域。类型的每个值都可以被视为集合中的一个元素。类型建立了集合中的每个元素必须满足才能被视为该集合的成员的约束。TypeScript 的主要任务是检查并验证一组是否是另一组的子集。

TypeScript 支持各种类型的集合：

| Set term | TypeScript                      | Notes                                                                          |
| -------- | ------------------------------- | ------------------------------------------------------------------------------ |
| 空集     | never                           | "never" 包含除自身之外的任何类型                                               |
| 单元素集 | undefined / null / literal type |                                                                                |
| 有限集   | boolean / union                 |                                                                                |
| 无限集   | string / number / object        |                                                                                |
| 通用集   | any / unknown                   | 每个元素都是"any"的成员，每个集合都是它的子集/"unknown"是"any"的类型安全对应项 |

这里有几个例子：

| TypScript             | Set term         | Example                                                          |
| --------------------- | ---------------- | ---------------------------------------------------------------- |
| never                 | ∅ (空集)         | const x: never = 'x'; // 错误: 'string'类似不能赋值给'never'类型 |
|                       |                  |
| Literal type          | 单元素集         | type X = 'X';                                                    |
|                       |                  | type Y = 7;                                                      |
|                       |                  |
| Value assignable to T | Value ∈ T (属于) | type XY = 'X' \| 'Y';                                            |
|                       |                  | const x: XY = 'X';                                               |
|                       |                  |
| T1 assignable to T2   | T1 ⊆ T2 (子集)   | type XY = 'X' \| 'Y';                                            |
|                       |                  | const x: XY = 'X';                                               |
|                       |                  | const j: XY = 'J'; // 类型'"J"' 不能赋值给 'XY' 类型.            |
|                       |                  |                                                                  |
| T1 extends T2         | T1 ⊆ T2 (子集)   | type X = 'X' extends string ? true : false;                      |
|                       |                  |
| T1 \| T2              | T1 ∪ T2 (并集)   | type XY = 'X' \| 'Y';                                            |
|                       |                  | type JK = 1 \| 2;                                                |
|                       |                  |
| T1 & T2               | T1 ∩ T2 (交集)   | type X = { a: string }                                           |
|                       |                  | type Y = { b: string }                                           |
|                       |                  | type XY = X & Y                                                  |
|                       |                  | const x: XY = { a: 'a', b: 'b' }                                 |
|                       |                  |
| unknown               | 通用集           | const x: unknown = 1                                             |

并集 (T1 | T2) 创建一个更广泛的集合（两者）：

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // 有效
```

交集（T1 & T2）创建一个更窄的集合（仅共享）：

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
const r: XY = { a: 'a' }; // 无效
const j: XY = { a: 'a', b: 'b' }; // 有效
```

在这种情况下，关键字extends可以被视为"的子集"。它为类型设置约束。与泛型一起使用的扩展将泛型视为无限集，并将其限制为更具体的类型。请注意，这extends与 OOP 意义上的层次结构无关（TypScript 中没有这个概念）。TypeScript 使用集合并且没有严格的层次结构，事实上，如下面的示例所示，两种类型可以重叠，而不会成为另一种类型的子类型（TypScript 考虑对象的结构和形状）。

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

const r: Z1 = z; // 有效
```

### 赋值类型：类型声明和类型断言

在 TypeScript 中可以通过不同的方式赋值类型：

#### 类型声明

在下面的示例中，我们使用 x:X(":Type") 来声明变量 x 的类型。

```typescript
type X = {
    a: string;
};

// 类型声明
const x: X = {
    a: 'a',
};
```

如果变量不是指定的格式，TypeScript 将报告错误。例如：

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // 错误: 对象字面量只能指定已知属性
};
```

#### 类型断言

可以使用as关键字添加断言。这告诉编译器开发人员拥有有关类型的更多信息并消除可能发生的任何错误。

例如：

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

在上面的示例中，使用 as 关键字将对象 x 断言为类型 X。这通知 TypeScript 编译器该对象符合指定的类型，即使它具有类型定义中不存在的附加属性 b。

类型断言在需要指定更具体类型的情况下非常有用，尤其是在使用 DOM 时。例如：

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

此处，类型断言 HTMLInputElement 用于告诉 TypeScript getElementById 的结果应被视为 HTMLInputElement。类型断言还可以用于重新映射键，如下面使用模板文字的示例所示：

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

在此示例中，类型 J 使用带有模板文字的映射类型来重新映射 Type 的键。它创建新属性，并在每个键上添加 prefix_ ，它们对应的值是返回原始属性值的函数。

值得注意的是，当使用类型断言时，TypeScript 不会执行多余的属性检查。因此，当预先知道对象的结构时，通常最好使用类型声明。

#### 非空断言

此断言是使用后缀表达式!运算符应用的，它告诉 TypeScript 值不能为 null 或未定义。

```typescript
let x: null | number;
let y = x!; // number
```

#### 环境声明

环境声明是描述 JavaScript 代码类型的文件，它们的文件名格式为.d.ts.. 它们通常被导入并用于注释现有的 JavaScript 库或向项目中的现有 JS 文件添加类型。

许多常见的库类型可以在以下位置找到：
<https://github.com/DefinitelyTyped/DefinitelyTyped/>

```shell
npm install --save-dev @types/library-name
```

对于您定义的环境声明，您可以使用"三斜杠"引用导入：

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

即使在 JavaScript 文件中，您也可以通过 `// @ts-check` 使用环境声明。

### 属性检测和多余属性检测

TypeScript 基于结构类型系统，但过多的属性检查是 TypeScript 的一个属性，它允许它检查对象是否具有类型中指定的确切属性。

例如，在将对象字面量赋值给变量或将它们作为参数传递给函数的多余属性时，会执行多余属性检查。

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // 有效，因为结构类型
const w: X = { a: 'a', b: 'b' }; // 无效，因为多余属性检测
```

### 弱类型

当一个类型只包含一组全可选属性时，该类型被认为是弱类型：

```typescript
type X = {
    a?: string;
    b?: string;
};
```

当没有重叠时，TypeScript 认为将任何内容赋值给弱类型是错误的，例如，以下会引发错误：

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // 无效
```

尽管不推荐，但如果需要，可以使用类型断言绕过此检查：

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // 有效
```

或者通过将unknown索引签名添加到弱类型：

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // 有效
```

### 严格的对象字面量检测 (Freshness)

严格的对象字面量检查（有时称为“新鲜度”）是 TypeScript 中的一项功能，有助于捕获多余或拼写错误的属性，否则这些属性在正常结构类型检查中会被忽视。

创建对象字面量时，TypeScript 编译器认为它是“新鲜的”。 如果将对象字面量分配给变量或作为参数传递，并且对象字面量指定目标类型中不存在的属性，则 TypeScript 将引发错误。

然而，当扩展对象文字或使用类型断言时，“新鲜感”就会消失。

下面举一些例子来说明：

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // 严格的对象字面量检查：无效的赋值
var y: Y;
y = { a: 'a', bx: 'bx' }; // 严格的对象字面量检查：无效的赋值

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // 类型加宽：没有错误, 结构类型兼容

fn({ a: 'a', bx: 'b' }); // 严格的对象字面量检查：无效的参数

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // 类型加宽：没有严格的对象字面量检查
```

### 类型推断

当在以下期间未提供注释时，TypeScript 可以推断类型：

* 变量初始化
* 成员初始化。
* 设置参数的默认值。
* 函数返回类型。

例如：

```typescript
let x = 'x'; // 推断的类型是 string
```

TypeScript 编译器分析值或表达式并根据可用信息确定其类型。

### 更高级的推断

当在类型推断中使用多个表达式时，TypeScript 会查找"最佳常见类型"。例如：

```typescript
let x = [1, 'x', 1, null]; // 类型推断为: (string | number | null)[]
```

如果编译器找不到最佳通用类型，它将返回联合类型。例如：

```typescript
let x = [new RegExp('x'), new Date()]; // 类型推断为: (RegExp | Date)[]
```

TypeScript 利用基于变量位置的"上下文类型"来推断类型。在下面的示例中，编译器知道它的e类型是MouseEvent，因为在lib.d.ts 文件中定义了click事件类型，该文件包含各种常见 JavaScript 构造和 DOM 的环境声明：

```typescript
window.addEventListener('click', function (e) {}); // e 的类型被推断为 MouseEvent
```

### 类型加宽

类型加宽是 TypeScript 将类型分配给未提供类型注释时初始化的变量的过程。它允许从窄到宽的类型，但反之则不然。在以下示例中：

<!-- skip -->
```typescript
let x = 'x'; // TypeScript 推断为字符串，一种宽类型
let y: 'y' | 'x' = 'y'; // y 类型是字面量类型的联合
y = x; // 无效，字符串不可分配给类型 'x' | 'y'。
```

TypeScript根据初始化期间提供的单个值（`x`），将 `string` 赋予给 `x`，这是一个扩展的示例。

TypeScript 提供了控制加宽过程的方法，例如使用"const"。

### 常量

在声明变量时使用 `const` 关键字会导致 TypeScript 中的类型推断范围更窄。

For example:

```typescript
const x = 'x'; // TypeScript 将 x 的类型推断为 'x'，一种较窄的类型
let y: 'y' | 'x' = 'y';
y = x; // 有效: x的类型推断为 'x'
```

通过使用 const 声明变量 x，其类型被缩小为特定的文字值"x"。由于 x 的类型被缩小，因此可以将其赋值给变量 y 而不会出现任何错误。可以推断类型的原因是因为 const 变量无法重新分配，因此它们的类型可以缩小到特定的文字类型，在本例中为字面量类型"x"。

#### 类型参数的 const 修饰符

从 TypeScript 5.0 版本开始，可以 `const` 在泛型类型参数上指定属性。这可以推断出最精确的类型。让我们看一个不使用 `const` 的示例：

```typescript
function identity<T>(value: T) {
    // 这里没有const
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // 类型推断为: { a: string; b: string; }
```

正如您所看到的，属性a和b是通过 类型推断出来的string 。

现在，让我们看看 `const` 版本的差异：

```typescript
function identity<const T>(value: T) {
    // 对类型参数使用 const 修饰符
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // 类型推断为: { a: "a"; b: "b"; }
```

现在我们可以看到属性 `a` 和 `b` 被推断为const，因此 `a` 和 `b`被视为字符串文字而不仅仅是 `string` 类型。

### 常量断言

此功能允许您根据变量的初始化值声明具有更精确的文字类型的变量，这向编译器表明该值应被视为不可变文字。 这里有一些例子：

在单个属性上：

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

在整个对象上：

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

这在定义元组的类型时特别有用：

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // 只读数组 [1, 2, 3]
```

### 显式类型注释

我们可以具体地传递一个类型，在下面的示例中，属性x的类型是number：

```typescript
const v = {
    x: 1, // 推断类型: number (加宽了)
};
v.x = 3; // 有效
```

我们可以通过使用字面量类型的联合使类型注释更加具体：

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x 现在是字面量的联合类型： 1 | 2 | 3
};
v.x = 3; // 有效
v.x = 100; // 无效的
```

### 类型缩小

类型缩小是 TypeScript 中的一个过程，其中一般类型缩小为更具体的类型。当 TypeScript 分析代码并确定某些条件或操作可以细化类型信息时，就会发生这种情况。

缩小类型可以通过不同的方式发生，包括：

#### 条件

通过使用条件语句（比如 `if` 或 `switch`），TypeScript 可以根据条件的结果缩小类型范围。例如：

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // 由于条件判断，类型被缩小为 number
}
```

#### 抛错或者返回

抛出错误或从分支提前返回可用于帮助 TypeScript 缩小类型范围。例如：

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

在 TypeScript 中缩小类型范围的其他方法包括：

* `instanceof` 操作: 用于检查对象是否是特定类的实例。
* `in` 操作: 用于检查对象中是否存在属性。
* `typeof` 操作: 用于在运行时检查值的类型。
* 内部函数，比如: `Array.isArray()`: 用于检查值是否为数组。

#### 可区分联合

使用"可区分联合"是 TypeScript 中的一种模式，其中向对象添加显式"标签"以区分联合内的不同类型。该模式也称为"标记联合"。在以下示例中，"tag"由属性"type"表示：

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // 类型为 A
        case 'type_b':
            return input.value + 'extra'; // 类型为 B
    }
};
```

#### 用户定义的类型保护

在 TypeScript 无法确定类型的情况下，可以编写一个称为"用户定义类型保护"的辅助函数。在下面的示例中，我们将在应用某些过滤后利用类型谓词来缩小类型范围：

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // 类型为 (string | null)[], TypeScript 不能准确推断类型

const isValid = (item: string | null): item is string => item !== null; // 自定义类型保护

const r2 = data.filter(isValid); // 类型现在为 string[], 通过使用断言类型保护，我们能够缩小类型
```

