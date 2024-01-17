---
title: 枚举
sidebar:
  order: 19
  label: 19. 枚举
---


在 TypeScript 中，枚举是一组命名常量值。

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

枚举可以用不同的方式定义：

### 数字枚举

在 TypeScript 中，数字枚举是一个枚举，其中每个常量都分配有一个数值，默认从 0 开始。

```typescript
enum Size {
    Small, // 值从 0 开始
    Medium,
    Large,
}
```

可以通过显式分配来指定自定义值：

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### 字符串枚举

在 TypeScript 中，字符串枚举是每个常量都分配有一个字符串值的枚举。

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

注意：TypeScript 允许使用异构枚举，其中字符串和数字成员可以共存。

### 常量枚举

TypeScript 中的常量枚举是一种特殊类型的枚举，其中所有值在编译时都是已知的，并且在使用枚举的任何地方都会内联，从而产生更高效的代码。

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

将被编译成：

```typescript
console.log('EN' /* Language.English */);
```

注意：常量枚举具有硬编码值，擦除枚举，这在独立库中可能更有效，但通常是不可取的。此外，常量枚举不能有计算成员。

### 反向映射

在 TypeScript 中，枚举中的反向映射是指从值中检索枚举成员名称的能力。默认情况下，枚举成员具有从名称到值的正向映射，但可以通过为每个成员显式设置值来创建反向映射。当您需要按枚举成员的值查找枚举成员，或者需要迭代所有枚举成员时，反向映射非常有用。需要注意的是，只有数字类型的枚举成员会生成反向映射，字符串类型的枚举成员则不会。

以下枚举：

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

编译为：

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

由此可见，对数字类型的枚举成员，可以从枚举值映射回枚举名称，但对字符串类型的枚举成员无法这样做。

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // 因为索引表达式的类型不是 'number'，所以元素是隐式的 'any' 类型。
```

### 环境枚举

TypeScript 中的环境枚举是一种在声明文件 (*.d.ts) 中定义的枚举类型，没有关联的实现。它允许您定义一组命名常量，这些常量可以在不同文件中以类型安全的方式使用，而无需在每个文件中导入实现细节。

### 计算成员和常量成员

在 TypeScript 中，计算成员是枚举的成员，其值在运行时计算，而常量成员是其值在编译时设置且在运行时无法更改的成员。常规枚举中允许使用计算成员，而常规枚举和常量枚举中都允许使用常量成员。

```typescript
// 常量成员
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 编译时生成
```

```typescript
// 计算成员
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // 运行时生成的随机数
```

枚举由包含其成员类型的联合表示。每个成员的值可以通过常量或非常量表达式确定，拥有常量值的成员被分配字面量类型。为了说明这一点，请考虑类型 E 及其子类型 E.A、E.B 和 E.C 的声明。在本例中，E 表​​示联合 E.A | E.B | E.C 。

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // 数字字面量
    B = 'bar', // 字符串字面量
    C = identity(42), // 不透明计算
}

console.log(E.C); //42
```

