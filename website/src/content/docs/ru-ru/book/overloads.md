---
title: Перегрузки
sidebar:
  order: 52
  label: 52. Перегрузки
---


Перегрузки функций в TypeScript позволяют определить несколько сигнатур для одного имени функции, благодаря чему функцию можно вызывать несколькими способами. Рассмотрим пример:

```typescript
// Перегрузки
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Реализация
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Допустимо
sayHi(['aa', 'bb']); // Допустимо
```

Ещё один пример использования перегрузок функций внутри `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // перегрузка
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // реализация
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

