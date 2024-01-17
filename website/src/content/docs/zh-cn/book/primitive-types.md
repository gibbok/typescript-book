---
title: 原始类型
sidebar:
  order: 10
  label: 10. 原始类型
---


TypeScript 支持 7 种基本类型。原始数据类型是指不是对象并且没有任何与其关联的方法的类型。在 TypeScript 中，所有原始类型都是不可变的，这意味着它们的值一旦分配就无法更改。

### string

原始 `string` 类型存储文本数据，并且值始终是双引号或单引号的。

```typescript
const x: string = 'x';
const y: string = 'y';
```

如果字符串被反引号 (`) 字符包围，则字符串可以跨越多行：

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

TypeScript 中的数据 `boolean` 类型存储二进制值，或者true或false。

```typescript
const isReady: boolean = true;
```

### number

TypeScript 中的数据类型 `number` 用 64 位浮点值表示。类型 `number` 可以表示整数和分数。TypeScript 还支持十六进制、二进制和八进制，例如：

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // 十六进制数以 0x 开始
const binary: number = 0b1010; // 二进制数以 0b 开始
const octal: number = 0o633; // 八进制数以 0o 开始
```

### bigInt

`bigInt` 表示无法用 `number` 表示的非常大的数值 (253 – 1)。

`bigInt` 可以通过调用内置函数 `BigInt()` 或添加 `n` 到任何整数数字字面量的末尾来创建：

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

笔记：

* `bigInt` 值不能与 `number` 混合，也不能与内置的 `Math` 一起使用，它们必须强制为相同的类型。
* 仅当目标配置为 ES2020 或更高版本时，“bigInt”值才可用。

### symbol

JavaScript 有一个原始函数 Symbol()，它创建一个全局唯一的引用。

```typescript
let sym = Symbol('x'); // symbol 类型
```

### null and undefined

`null`和 `undefined` 类型都表示没有值或不存在任何值。

`undefined` 类型意味着该值未分配或初始化，或者指示无意中缺少值。

`null` 类型意味着我们知道该字段没有值，因此值不可用，这表明故意不存在值。

### Array

`array` 是一种可以存储多个相同类型或不同类型的值的数据类型。可以使用以下语法定义它：

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2];
```

TypeScript 使用以下语法支持只读数组：

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // 只读修饰符
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // 有效
```

TypeScript 支持数组和只读数组：

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

数据 `any` 类型字面上代表"任何"值，当 TypeScript 无法推断类型或未指定时，它是默认值。

使用 `any` 时，TypeScript编译器会跳过类型检查，因此 `any` 使用时不存在类型安全。通常，当发生错误时不要使用 `any` 静默编译器，而是专注于修复错误，因为使用 `any` 它可能会破坏契约，并且我们会失去 TypeScript 自动完成的好处。

在从 JavaScript 逐步迁移到 TypeScript 的过程中，该 `any` 类型可能很有用，因为它可以让编译器保持沉默。

对于新项目，请使用 TypeScript 配置 `noImplicitAny` ，该配置使 TypeScript 能够在any使用或推断时发出错误。

`any` 通常是错误的来源，它可以掩盖类型的实际问题。尽可能避免使用它。

