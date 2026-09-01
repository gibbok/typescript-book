---
title: โอเวอร์โหลด
sidebar:
  order: 52
  label: 52. โอเวอร์โหลด
---


โอเวอร์โหลดฟังก์ชันใน TypeScript ช่วยให้คุณกำหนดลายเซ็นฟังก์ชันหลายแบบสำหรับชื่อฟังก์ชันเดียว ทำให้สามารถกำหนดฟังก์ชันที่เรียกใช้ได้หลายรูปแบบ ต่อไปนี้คือตัวอย่าง:

```typescript
// Overloads
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Implementation
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Valid
sayHi(['aa', 'bb']); // Valid
```

ต่อไปนี้เป็นอีกตัวอย่างของการใช้โอเวอร์โหลดฟังก์ชันภายใน `class`:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // overload
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // implementation
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

