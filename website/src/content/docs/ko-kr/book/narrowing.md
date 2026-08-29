---
title: 좁히기
sidebar:
  order: 21
  label: 21. 좁히기
---


TypeScript 좁히기는 조건부 블록 내에서 변수의 타입을 구체화하는 과정입니다. 변수가 둘 이상의 타입을 가질 수 있는 유니온 타입을 다룰 때 유용합니다.

TypeScript는 타입을 좁히는 여러 가지 방법을 인식합니다.

### typeof 타입 가드

typeof 타입 가드는 내장 JavaScript 타입을 바탕으로 변수의 타입을 확인하는 TypeScript의 특정 타입 가드입니다.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### 참 같은 값에 의한 좁히기

TypeScript의 참 같은 값 좁히기는 변수가 참 같은 값인지 거짓 같은 값인지 확인하여 그에 따라 타입을 좁힙니다.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### 동등성 좁히기

TypeScript의 동등성 좁히기는 변수가 특정 값과 같은지 여부를 확인하여 그에 따라 타입을 좁힙니다.

타입을 좁히기 위해 `switch` 문 및 `===`, `!==`, `==`, `!=` 같은 동등 연산자와 함께 사용합니다.

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

### In 연산자 좁히기

TypeScript의 `in` 연산자 좁히기는 변수의 타입에 특정 프로퍼티가 존재하는지를 바탕으로 변수의 타입을 좁히는 방법입니다.

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

### instanceof 좁히기

TypeScript의 `instanceof` 연산자 좁히기는 객체가 특정 클래스나 인터페이스의 인스턴스인지 확인하여 생성자 함수를 바탕으로 변수의 타입을 좁히는 방법입니다.

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

