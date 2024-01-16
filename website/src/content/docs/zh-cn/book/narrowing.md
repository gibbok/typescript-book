---
title: 缩小范围
sidebar:
  order: 20
  label: 20. 缩小范围
---


TypeScript 缩小范围是细化条件块内变量类型的过程。这在使用联合类型时很有用，其中一个变量可以有多个类型。

TypeScript 可识别多种缩小类型范围的方法：

### typeof 类型保护

typeof 类型保护是 TypeScript 中的一种特定类型保护，它根据变量的内置 JavaScript 类型检查变量的类型。

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x 是数字
    }
    return -1;
};
```

### 真实性缩小

TypeScript 中的真实性缩小是通过检查变量是真还是假来相应地缩小其类型来实现的。

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### 相等缩小

TypeScript 中的相等缩小通过检查变量是否等于特定值来相应缩小其类型。

它与`switch`语句和等号运算符（例如`===`、`!==`、`==`和`!=`）结合使用来缩小类型范围。

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true
        case 'error':
            return null
    }
};
```

### In运算符缩小

TypeScript 中的 `in` 运算符缩小范围是一种根据变量类型中是否存在属性来缩小变量类型的方法。

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### instanceof 缩小

TypeScript 中的 `instanceof` 运算符缩小是一种根据变量的构造函数缩小变量类型的方法，方法是检查对象是否是某个类或接口的实例。

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

