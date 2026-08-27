---
title: 型の絞り込み
sidebar:
  order: 21
  label: 21. 型の絞り込み
---


TypeScript の型の絞り込みは、条件ブロック内で変数の型をより具体的にするプロセスです。これは、変数が複数の型を持つ可能性があるユニオン型を扱う際に役立ちます。

TypeScript は、型を絞り込むいくつかの方法を認識します。

### typeof 型ガード

typeof 型ガードは、組み込みの JavaScript 型に基づいて変数の型を確認する、TypeScript 固有の型ガードの 1 つです。

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### 真偽値による絞り込み

TypeScript の真偽値による絞り込みは、変数が truthy か falsy かを確認し、それに応じて型を絞り込む仕組みです。

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### 等価性による絞り込み

TypeScript の等価性による絞り込みは、変数が特定の値と等しいかどうかを確認し、それに応じて型を絞り込む仕組みです。

型を絞り込むために、`switch` 文や `===`、`!==`、`==`、`!=` などの等価演算子と組み合わせて使用します。

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### in 演算子による絞り込み

TypeScript の `in` 演算子による絞り込みは、変数の型にプロパティが存在するかどうかに基づいて、その変数の型を絞り込む方法です。

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

### instanceof による絞り込み

TypeScript の `instanceof` 演算子による絞り込みは、オブジェクトが特定のクラスまたはインターフェースのインスタンスであるかどうかを確認し、そのコンストラクター関数に基づいて変数の型を絞り込む方法です。

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

