---
title: 接口及类型
sidebar:
  order: 48
  label: 48. 接口及类型
---


### 通用语法

在 TypeScript 中，接口定义对象的结构，指定对象必须具有的属性或方法的名称和类型。在 TypeScript 中定义接口的常用语法如下：

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

类型定义也类似：

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` 或者 `type TypeName`: 定义接口的名称。
`property1`: `Type1`: 指定接口的属性及其相应的类型。可以定义多个属性，每个属性用分号分隔。
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: 指定接口的方法。方法用其名称进行定义，后跟括号中的参数列表和返回类型。可以定义多个方法，每个方法用分号分隔。

接口示例:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

类型示例:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

在 TypeScript 中，类型用于定义数据的形状并强制执行类型检查。在 TypeScript 中定义类型有几种常见的语法，具体取决于具体的用例。这里有些例子：

### 基本类型

```typescript
let myNumber: number = 123; // 数字类型
let myBoolean: boolean = true; // 布尔类型
let myArray: string[] = ['a', 'b']; // 字符串数组
let myTuple: [string, number] = ['a', 123]; // 元组
```

### 对象和接口

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### 并集和交集类型

```typescript
type MyType = string | number; // 并集
let myUnion: MyType = 'hello'; // 可以是字符串
myUnion = 123; // 或者是一个数字

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // 交集
let myCombined: CombinedType = { name: 'John', age: 25 }; // 对象同时有name和age属性
```

