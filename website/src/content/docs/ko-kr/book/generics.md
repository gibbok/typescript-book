---
title: 제네릭
sidebar:
  order: 56
  label: 56. 제네릭
---


제네릭을 사용하면 여러 타입과 함께 동작할 수 있는 재사용 가능한 컴포넌트와 함수를 만들 수 있습니다. 제네릭을 사용하면 타입, 함수, 인터페이스를 매개변수화하여 사전에 타입을 명시적으로 지정하지 않고도 여러 타입을 대상으로 동작하게 할 수 있습니다.

제네릭을 사용하면 코드를 더 유연하고 재사용 가능하게 만들 수 있습니다.

### 제네릭 타입

제네릭 타입을 정의하려면 다음과 같이 꺾쇠괄호(`<>`)를 사용하여 타입 매개변수를 지정합니다.

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### 제네릭 클래스

제네릭은 클래스에도 적용할 수 있으며, 이를 통해 클래스가 타입 매개변수를 사용하여 여러 타입과 함께 동작할 수 있습니다. 이는 타입 안전성을 유지하면서 여러 데이터 타입을 대상으로 동작할 수 있는 재사용 가능한 클래스 정의를 만드는 데 유용합니다.

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

### 제네릭 제약 조건

제네릭 매개변수는 `extends` 키워드 뒤에 타입 매개변수가 충족해야 하는 타입이나 인터페이스를 지정하여 제약할 수 있습니다.

다음 예제에서 `T`가 유효하려면 올바르게 타입이 지정된 `length` 프로퍼티가 있어야 합니다.

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

버전 3.4 RC에서 도입된 주목할 만한 제네릭 기능으로 제네릭 타입 인수를 전파하는 고차 함수 타입 추론이 있습니다.

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

이 기능을 사용하면 함수형 프로그래밍에서 흔히 사용하는 타입 안전한 포인트프리 스타일 프로그래밍이 더 쉬워집니다.

### 제네릭의 문맥적 타입 좁히기

제네릭의 문맥적 타입 좁히기는 컴파일러가 제네릭 매개변수가 사용되는 문맥을 기반으로 해당 매개변수의 타입을 좁힐 수 있게 하는 TypeScript의 메커니즘입니다. 조건문에서 제네릭 타입을 다룰 때 유용합니다.

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

