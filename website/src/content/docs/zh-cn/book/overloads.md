---
title: 重载
sidebar:
  order: 51
  label: 51. 重载
---


TypeScript 中的函数重载允许您为单个函数名称定义多个函数签名，从而使您能够定义可以多种方式调用的函数。这是一个例子：

```typescript
// 重载
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// 实现
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // 有效
sayHi(['aa', 'bb']); // 有效
```

这是在 `class` 中使用函数重载的另一个示例：

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // 重载
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // 实现
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

