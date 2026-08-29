---
title: 인터페이스와 타입
sidebar:
  order: 49
  label: 49. 인터페이스와 타입
---


### 공통 구문

TypeScript에서 인터페이스는 객체의 구조를 정의하며 객체가 가져야 하는 프로퍼티 또는 메서드의 이름과 타입을 지정합니다. TypeScript에서 인터페이스를 정의하는 일반적인 구문은 다음과 같습니다.

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

타입 정의도 이와 유사합니다.

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` 또는 `type TypeName`: 인터페이스의 이름을 정의합니다.
`property1`: `Type1`: 인터페이스의 프로퍼티와 해당 타입을 지정합니다. 여러 프로퍼티를 정의할 수 있으며 각 프로퍼티는 세미콜론으로 구분됩니다.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: 인터페이스의 메서드를 지정합니다. 메서드는 이름, 괄호 안의 매개변수 목록, 반환 타입 순으로 정의됩니다. 여러 메서드를 정의할 수 있으며 각 메서드는 세미콜론으로 구분됩니다.

인터페이스 예제:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

타입 예제:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

TypeScript에서 타입은 데이터의 형태를 정의하고 타입 검사를 강제하는 데 사용됩니다. TypeScript에서 타입을 정의하는 일반적인 구문은 구체적인 사용 사례에 따라 여러 가지가 있습니다. 다음은 몇 가지 예제입니다.

### 기본 타입

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### 객체와 인터페이스

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### 유니온 타입과 인터섹션 타입

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

