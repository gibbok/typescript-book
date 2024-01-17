---
title: 泛型
sidebar:
  order: 55
  label: 55. 泛型
---


泛型允许您创建可与多种类型一起使用的可重用组件和函数。使用泛型，您可以参数化类型、函数和接口，从而允许它们对不同类型进行操作，而无需事先显式指定它们。

泛型允许您使代码更加灵活和可重用。

### 泛型类型

要定义泛型类型，可以使用尖括号 (`<>`) 来指定类型参数，例如：

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### 泛型类

泛型也可以应用于类，这样它们就可以通过使用类型参数来处理多种类型。这对于创建可重用的类定义非常有用，这些定义可以在保持类型安全的同时对不同的数据类型进行操作。

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### 泛型约束

可以使用关键字 `extends` 后跟类型参数必须满足的类型或接口来约束泛型参数。

在下面的示例中，T 必须正确包含 `length` 才能有效：

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // 无效
```

3.4 RC 版中引入的泛型的一个有趣功能是高阶函数类型推断，它引入了传播泛型类型参数：

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

此功能允许更轻松地键入安全的无点风格编程，这在函数式编程中很常见。

### 泛型上下文缩小

泛型上下文缩小是 TypeScript 中的机制，允许编译器根据使用泛型参数的上下文来缩小泛型参数的类型，在条件语句中使用泛型类型时非常有用：

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value 的类型被缩小到 'string' 类型
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value 的类型被缩小到 'number' 类型
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

