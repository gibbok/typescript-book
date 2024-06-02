---
title: 类型操作
sidebar:
  order: 60
  label: 60. 类型操作
---


### 从类型创建类型

是否可以通过组合、操作或转换现有类型来创建新类型。

交集类型 ( &):

允许您将多种类型组合成单一类型：

```typescript
type A = { foo: number };
type B = { bar: string };
type C = A & B; // A和B的交集
const obj: C = { foo: 42, bar: 'hello' };
```

联合类型 (`|`):

允许您定义可以是以下几种类型之一的类型

```typescript
type Result = string | number;
const value1: Result = 'hello';
const value2: Result = 42;
```

映射类型：

允许您转换现有类型的属性以创建新类型：

```typescript
type Mutable<T> = {
    readonly [P in keyof T]: T[P];
};
type Person = {
    name: string;
    age: number;
};
type ImmutablePerson = Mutable<Person>; // 属性变为只读
```

条件类型：

允许您根据某些条件创建类型：

```typescript
type ExtractParam<T> = T extends (param: infer P) => any ? P : never;
type MyFunction = (name: string) => number;
type ParamType = ExtractParam<MyFunction>; // string
```

### 索引访问类型

在 TypeScript 中，可以使用索引访问和操作另一个类型中的属性类型 `Type[Key]`。

```typescript
type Person = {
    name: string;
    age: number;
};

type AgeType = Person['age']; // number
```

```typescript
type MyTuple = [string, number, boolean];
type MyType = MyTuple[2]; // boolean
```

### 工具类型

可以使用几种内置工具来操作类型，下面列出了最常用的：

#### Awaited\<T\>

构造一个递归解包 Promise 的类型。

```typescript
type A = Awaited<Promise<string>>; // string
```

#### Partial\<T\>

构造一个类型，并将 T 的所有属性设置为可选。

```typescript
type Person = {
    name: string;
    age: number;
};

type A = Partial<Person>; // { name?: string | undefined; age?: number | undefined; }
```

#### Required\<T\>

构造一个类型，并将 T 的所有属性设置为必需。

```typescript
type Person = {
    name?: string;
    age?: number;
};

type A = Required<Person>; // { name: string; age: number; }
```

#### Readonly\<T\>

构造一个类型，并将 T 的所有属性设置为只读。

<!-- skip -->
```typescript
type Person = {
    name: string;
    age: number;
};

type A = Readonly<Person>;

const a: A = { name: 'Simon', age: 17 };
a.name = 'John'; // 无效
```

#### Record\<K, T\>

构造一个具有类型 T 的一组属性 K 的类型。

```typescript
type Product = {
    name: string;
    price: number;
};

const products: Record<string, Product> = {
    apple: { name: 'Apple', price: 0.5 },
    banana: { name: 'Banana', price: 0.25 },
};

console.log(products.apple); // { name: 'Apple', price: 0.5 }
```

#### Pick\<T, K\>

通过从 T 中选取指定属性 K 来构造类型。

```typescript
type Product = {
    name: string;
    price: number;
};

type Price = Pick<Product, 'price'>; // { price: number; }
```

#### Omit\<T, K\>

通过从 T 中省略指定属性 K 来构造类型。

```typescript
type Product = {
    name: string;
    price: number;
};

type Name = Omit<Product, 'price'>; // { name: string; }
```

#### Exclude\<T, U\>

通过从 T 中排除类型 U 的所有值来构造类型。

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Exclude<Union, 'a' | 'c'>; // b
```

#### Extract\<T, U\>

通过从 T 中提取类型 U 的所有值来构造类型。

```typescript
type Union = 'a' | 'b' | 'c';
type MyType = Extract<Union, 'a' | 'c'>; // a | c
```

#### NonNullable\<T\>

通过从 T 中排除 null 和 undefined 来构造类型。

```typescript
type Union = 'a' | null | undefined | 'b';
type MyType = NonNullable<Union>; // 'a' | 'b'
```

#### Parameters\<T\>

提取函数类型 T 的参数类型。

```typescript
type Func = (a: string, b: number) => void;
type MyType = Parameters<Func>; // [a: string, b: number]
```

#### ConstructorParameters\<T\>

提取构造函数类型 T 的参数类型。

```typescript
class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}
type PersonConstructorParams = ConstructorParameters<typeof Person>; // [name: string, age: number]
const params: PersonConstructorParams = ['John', 30];
const person = new Person(...params);
console.log(person); // Person { name: 'John', age: 30 }
```

#### ReturnType\<T\>

提取函数类型 T 的返回类型。

```typescript
type Func = (name: string) => number;
type MyType = ReturnType<Func>; // number
```

#### InstanceType\<T\>

提取类类型 T 的实例类型。

```typescript
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}!`);
    }
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person('John');

person.sayHello(); // Hello, my name is John!
```

#### ThisParameterType\<T\>

从函数类型 T 中提取"this"参数的类型。

```typescript
interface Person {
    name: string;
    greet(this: Person): void;
}
type PersonThisType = ThisParameterType<Person['greet']>; // Person
```

#### OmitThisParameter\<T\>

从函数类型 T 中删除"this"参数。

```typescript
function capitalize(this: String) {
    return this[0].toUpperCase + this.substring(1).toLowerCase();
}

type CapitalizeType = OmitThisParameter<typeof capitalize>; // () => string
```

#### ThisType\<T\>

作为上下文类型 `this` 的一部分。

<!-- skip -->
```typescript
type Logger = {
    log: (error: string) => void;
};

let helperFunctions: { [name: string]: Function } & ThisType<Logger> = {
    hello: function () {
        this.log('some error'); // 有效，因为"log"是"this"的一部分
        this.update(); // 无效
    },
};
```

#### Uppercase\<T\>

将输入类型 T 的名称设为大写。

```typescript
type MyType = Uppercase<'abc'>; // "ABC"
```

#### Lowercase\<T\>

将输入类型 T 的名称设为小写。

```typescript
type MyType = Lowercase<'ABC'>; // "abc"
```

#### Capitalize\<T\>

输入类型 T 的名称大写。

```typescript
type MyType = Capitalize<'abc'>; // "Abc"
```

#### Uncapitalize\<T\>

将输入类型 T 的名称取消大写。

```typescript
type MyType = Uncapitalize<'Abc'>; // "abc"
```

#### NoInfer\<T\>

NoInfer 是一种实用类型，旨在阻止泛型函数范围内类型的自动推断。

示例：

```typescript
// 泛型函数范围内类型的自动推断。
function fn<T extends string>(x: T[], y: T) {
    return x.concat(y);
}
const r = fn(['a', 'b'], 'c'); // 此处的类型为 ("a" | "b" | "c")[]
```

使用 NoInfer：

<!-- skip -->
```typescript
// 使用 NoInfer 阻止类型推断的示例函数
function fn2<T extends string>(x: T[], y: NoInfer<T>) {
  return x.concat(y);
}

const r2 = fn2(["a", "b"], "c"); // 错误：类型为“c”的类型参数不能分配给类型为“a”|“b”的参数。
```

