---
title: 기타
sidebar:
  order: 62
  label: 62. 기타
---


### 오류 및 예외 처리

TypeScript에서는 표준 JavaScript 오류 처리 메커니즘을 사용하여 오류를 포착하고 처리할 수 있습니다.

Try-Catch-Finally 블록:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

여러 유형의 오류를 처리할 수도 있습니다.

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

사용자 정의 오류 타입:

Error `class`를 확장하여 더 구체적인 오류를 지정할 수 있습니다.

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### 믹스인 클래스

믹스인 클래스를 사용하면 여러 클래스의 동작을 하나의 클래스로 결합하고 구성할 수 있습니다. 깊은 상속 체인 없이 기능을 재사용하고 확장할 수 있습니다.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### 비동기 언어 기능

TypeScript는 JavaScript의 상위 집합이므로 다음과 같은 JavaScript의 비동기 언어 기능이 내장되어 있습니다.

Promise:

Promise는 `.then()` 및 `.catch()`와 같은 메서드를 사용하여 성공 및 오류 조건을 처리함으로써 비동기 작업과 그 결과를 다루는 방법입니다.

더 알아보기: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Async/await 키워드는 Promise를 다룰 때 더 동기적으로 보이는 구문을 제공하는 방법입니다. `async` 키워드는 비동기 함수를 정의하는 데 사용되며, `await` 키워드는 비동기 함수 내에서 Promise가 이행되거나 거부될 때까지 실행을 일시 중지하는 데 사용됩니다.

더 알아보기:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

다음 API는 TypeScript에서 잘 지원됩니다.

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Worker:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Worker:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### 이터레이터와 제너레이터

이터레이터와 제너레이터 모두 TypeScript에서 잘 지원됩니다.

이터레이터는 이터레이터 프로토콜을 구현하는 객체로, 컬렉션이나 시퀀스의 요소에 하나씩 접근하는 방법을 제공합니다. 이터레이션의 다음 요소를 가리키는 포인터가 포함된 구조입니다. 이터레이터에는 `next()` 메서드가 있으며, 이 메서드는 시퀀스의 다음 값과 시퀀스가 `done` 상태인지 나타내는 불리언 값을 함께 반환합니다.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

제너레이터는 `function*` 구문을 사용하여 정의하는 특수 함수로, 이터레이터 생성을 간소화합니다. `yield` 키워드로 값의 시퀀스를 정의하며 값이 요청될 때 실행을 자동으로 일시 중지하고 다시 시작합니다.

제너레이터를 사용하면 이터레이터를 더 쉽게 만들 수 있으며, 특히 크거나 무한한 시퀀스를 다룰 때 유용합니다.

예제:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript는 비동기 이터레이터와 비동기 제너레이터도 지원합니다.

더 알아보기:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs JSDoc 참조

JavaScript 코드베이스로 작업할 때 추가 어노테이션이 포함된 JSDoc 주석으로 타입 정보를 제공하여 TypeScript가 올바른 타입을 추론하도록 도울 수 있습니다.

예제:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

전체 문서는 다음 링크에서 제공됩니다.
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

버전 3.7부터 JavaScript JSDoc 구문으로 .d.ts 타입 정의를 생성할 수 있습니다.
자세한 내용은 다음에서 확인할 수 있습니다.
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

@types 조직 아래의 패키지는 기존 JavaScript 라이브러리나 모듈의 타입 정의를 제공하기 위한 특별한 패키지 이름 지정 규칙을 따릅니다. 예를 들어 다음을 사용하면:

```shell
npm install --save-dev @types/lodash
```

현재 프로젝트에 `lodash`의 타입 정의가 설치됩니다.

`@types` 패키지의 타입 정의에 기여하려면 [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)에 풀 리퀘스트를 제출하세요.

### JSX

JSX(JavaScript XML)는 JavaScript 또는 TypeScript 파일 내에서 HTML과 유사한 코드를 작성할 수 있게 하는 JavaScript 언어 구문의 확장입니다. 일반적으로 React에서 HTML 구조를 정의하는 데 사용됩니다.

TypeScript는 타입 검사와 정적 분석을 제공하여 JSX의 기능을 확장합니다.

JSX를 사용하려면 `jsx` 컴파일러 옵션을 `tsconfig.json` 파일에서 설정해야 합니다. 일반적인 두 가지 구성 옵션은 다음과 같습니다.

* "preserve": JSX를 변경하지 않은 채 .jsx 파일을 내보냅니다. 이 옵션은 TypeScript가 JSX 구문을 그대로 유지하고 컴파일 과정에서 변환하지 않도록 합니다. Babel처럼 변환을 처리하는 별도의 도구가 있는 경우 이 옵션을 사용할 수 있습니다.
* "react": TypeScript에 내장된 JSX 변환을 활성화합니다. React.createElement가 사용됩니다.

모든 옵션은 다음에서 확인할 수 있습니다.
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 모듈

TypeScript는 ES6(ECMAScript 2015)와 그 이후의 여러 버전을 지원합니다. 즉, 화살표 함수, 템플릿 리터럴, 클래스, 모듈, 구조 분해 등과 같은 ES6 구문을 사용할 수 있습니다.

프로젝트에서 ES6 기능을 활성화하려면 tsconfig.json에서 `target` 프로퍼티를 지정할 수 있습니다.

구성 예제:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### ES7 지수 연산자

지수(`**`) 연산자는 첫 번째 피연산자를 두 번째 피연산자의 거듭제곱으로 올려 얻은 값을 계산합니다. `Math.pow()`와 유사하게 작동하지만 BigInt도 피연산자로 받을 수 있습니다.
TypeScript는 tsconfig.json 파일의 `target`을 `es2016` 이상으로 설정하여 이 연산자를 완전히 지원합니다.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### for-await-of 문

이 기능은 TypeScript에서 완전히 지원되는 JavaScript 기능으로, 대상 버전이 `es2018`일 때 비동기 이터러블 객체를 순회할 수 있게 합니다.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### new.target 메타 프로퍼티

TypeScript에서는 `new.target` 메타 프로퍼티를 사용하여 함수나 생성자가 new 연산자로 호출되었는지 확인할 수 있습니다. 이를 통해 생성자 호출의 결과로 객체가 생성되었는지 감지할 수 있습니다.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### 동적 import 표현식

TypeScript가 지원하는 동적 import에 관한 ECMAScript 제안을 사용하면 조건에 따라 모듈을 로드하거나 필요할 때 지연 로드할 수 있습니다.

TypeScript의 동적 import 표현식 구문은 다음과 같습니다.

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

이 명령은 `--watch` 매개변수로 TypeScript 컴파일러를 시작하여 TypeScript 파일이 수정될 때마다 자동으로 다시 컴파일할 수 있게 합니다.

```shell
tsc --watch
```

TypeScript 버전 4.9부터 파일 모니터링은 주로 파일 시스템 이벤트에 의존하며, 이벤트 기반 워처를 설정할 수 없는 경우 자동으로 폴링 방식으로 전환합니다.

### Non-null 단언 연산자

확정 할당 단언이라고도 하는 non-null 단언 연산자(후위 !)는 TypeScript의 정적 타입 분석에서 변수나 프로퍼티가 null 또는 undefined일 수 있다고 판단하더라도 null이나 undefined가 아니라고 단언할 수 있게 하는 TypeScript 기능입니다. 이 기능을 사용하면 명시적인 검사를 모두 제거할 수 있습니다.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### 기본값 선언

기본값 선언은 변수나 매개변수에 기본값을 할당할 때 사용됩니다. 즉, 해당 변수나 매개변수에 값이 제공되지 않으면 기본값이 대신 사용됩니다.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### 옵셔널 체이닝

옵셔널 체이닝 연산자 `?.`는 프로퍼티나 메서드에 접근할 때 일반 점 연산자(`.`)처럼 작동합니다. 하지만 오류를 발생시키는 대신 표현식 평가를 종료하고 `undefined`를 반환하여 null 또는 undefined 값을 안전하게 처리합니다.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### 널 병합 연산자

널 병합 연산자 `??`는 왼쪽 값이 `null` 또는 `undefined`이면 오른쪽 값을 반환하고, 그렇지 않으면 왼쪽 값을 반환합니다.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### 템플릿 리터럴 타입

템플릿 리터럴 타입을 사용하면 타입 수준에서 문자열 값을 조작하고 기존 문자열 타입을 기반으로 새로운 문자열 타입을 생성할 수 있습니다. 문자열 기반 연산으로 더 표현력 있고 정확한 타입을 만드는 데 유용합니다.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### 함수 오버로딩

함수 오버로딩을 사용하면 동일한 함수 이름에 대해 각각 서로 다른 매개변수 타입과 반환 타입을 가진 여러 함수 시그니처를 정의할 수 있습니다.
오버로드된 함수를 호출하면 TypeScript는 제공된 인수를 사용하여 올바른 함수 시그니처를 결정합니다.

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### 재귀 타입

재귀 타입은 자기 자신을 참조할 수 있는 타입입니다. 연결 리스트, 트리, 그래프처럼 계층적이거나 재귀적인 구조(잠재적으로 무한히 중첩될 수 있는 구조)를 가진 데이터 구조를 정의할 때 유용합니다.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### 재귀 조건부 타입

TypeScript에서는 논리와 재귀를 사용해 복잡한 타입 관계를 정의할 수 있습니다.
간단히 나누어 살펴보겠습니다.

조건부 타입을 사용하면 불리언 조건에 따라 타입을 정의할 수 있습니다.

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

재귀란 타입 정의 안에서 자기 자신을 참조하는 타입 정의를 의미합니다.

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

재귀 조건부 타입은 조건부 논리와 재귀를 결합합니다. 즉, 타입 정의가 조건부 논리를 통해 자기 자신에 의존할 수 있으므로 복잡하고 유연한 타입 관계를 만들 수 있습니다.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Node의 ECMAScript 모듈 지원

Node.js는 버전 15.3.0부터 ECMAScript 모듈을 지원하며, TypeScript는 버전 4.7부터 Node.js용 ECMAScript 모듈을 지원합니다. tsconfig.json 파일에서 `module` 프로퍼티의 값을 `nodenext`로 설정하면 이 지원을 활성화할 수 있습니다. 예시는 다음과 같습니다.

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js는 모듈에 두 가지 파일 확장자를 지원합니다. ES 모듈에는 `.mjs`, CommonJS 모듈에는 `.cjs`를 사용합니다. TypeScript에서 이에 해당하는 파일 확장자는 ES 모듈의 경우 `.mts`, CommonJS 모듈의 경우 `.cts`입니다. TypeScript 컴파일러가 이러한 파일을 JavaScript로 트랜스파일하면 `.mjs` 및 `.cjs` 파일이 생성됩니다.

프로젝트에서 ES 모듈을 사용하려면 package.json 파일에서 `type` 프로퍼티를 "module"로 설정할 수 있습니다. 이렇게 하면 Node.js가 해당 프로젝트를 ES 모듈 프로젝트로 취급합니다.

또한 TypeScript는 .d.ts 파일의 타입 선언도 지원합니다. 이러한 선언 파일은 TypeScript로 작성된 라이브러리나 모듈에 대한 타입 정보를 제공하므로, 다른 개발자가 TypeScript의 타입 검사 및 자동 완성 기능과 함께 해당 라이브러리나 모듈을 사용할 수 있습니다.

### 단언 함수

TypeScript에서 단언 함수는 반환 값을 바탕으로 특정 조건이 검증되었음을 나타내는 함수입니다. 가장 간단한 형태의 단언 함수는 주어진 조건자를 검사하고, 조건자가 false로 평가되면 오류를 발생시킵니다.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

또는 함수 표현식으로 선언할 수 있습니다.

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

단언 함수는 타입 가드와 유사합니다. 타입 가드는 런타임 검사를 수행하고 특정 범위 내에서 값의 타입을 보장하기 위해 처음 도입되었습니다.
구체적으로 타입 가드는 타입 조건자를 평가하고 그 조건자가 참인지 거짓인지를 나타내는 불리언 값을 반환하는 함수입니다. 조건자가 충족되지 않을 때 false를 반환하는 대신 오류를 발생시키려는 단언 함수와는 약간 다릅니다.

타입 가드의 예시는 다음과 같습니다.

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### 가변 튜플 타입

가변 튜플 타입은 TypeScript 버전 4.0에서 도입된 기능입니다. 먼저 튜플이 무엇인지 다시 살펴보겠습니다.

튜플 타입은 길이가 정해져 있고 각 요소의 타입이 알려진 배열입니다.

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

"가변"이라는 용어는 정해지지 않은 인수 개수(가변 개수의 인수를 허용함)를 의미합니다.

가변 튜플은 앞에서 설명한 모든 특성을 가지지만, 정확한 형태가 아직 정의되지 않은 튜플 타입입니다.

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

앞의 코드에서 튜플의 형태가 전달된 제네릭 `T`에 의해 정의되는 것을 볼 수 있습니다.

가변 튜플은 여러 제네릭을 받을 수 있으므로 매우 유연합니다.

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

새로운 가변 튜플을 사용하면 다음이 가능합니다.

* 이제 튜플 타입 구문의 스프레드가 제네릭일 수 있으므로, 실제로 다루는 타입을 알지 못하더라도 튜플과 배열에 대한 고차 연산을 표현할 수 있습니다.
* 나머지 요소는 튜플의 어느 위치에나 올 수 있습니다.

예시:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### 박싱 타입

박싱 타입은 원시 타입을 객체로 나타내는 데 사용되는 래퍼 객체를 의미합니다. 이러한 래퍼 객체는 원시 값에서 직접 사용할 수 없는 추가 기능과 메서드를 제공합니다.

`charAt`이나 `normalize` 같은 메서드에 `string` 원시 값으로 접근하면 JavaScript는 해당 값을 `String` 객체로 감싸고 메서드를 호출한 다음 그 객체를 버립니다.

예시:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript는 원시 타입과 그에 해당하는 객체 래퍼에 별도의 타입을 제공하여 이러한 차이를 나타냅니다.

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

일반적으로 박싱 타입은 필요하지 않습니다. 박싱 타입을 사용하지 말고 대신 원시 타입을 사용하세요. 예를 들어 `string`을 `String` 대신 사용합니다.

### TypeScript의 공변성과 반공변성

공변성과 반공변성은 제네릭 타입에서 타입 관계가 어떻게 동작하는지를 설명합니다.

TypeScript에서는 다음과 같습니다.

* 배열은 **공변적**이지만, 완전히 타입 안전하지는 않습니다.
* 함수 매개변수 타입은 다음과 같습니다.
  * `strictFunctionTypes`가 활성화되어 있으면 **반공변적**입니다.
  * 그렇지 않으면 **이변적**입니다.

공변성은 관계가 유지되는 것을 의미합니다. 타입 A가 타입 B의 하위 타입이면 `F<A>`도 `F<B>`의 하위 타입입니다. TypeScript에서는 반환 타입과 배열에서 흔히 나타납니다(다만 배열의 공변성은 완전히 타입 안전하지는 않습니다).

반공변성은 관계가 반대로 바뀌는 것을 의미합니다. 타입 A가 타입 B의 하위 타입이면 `F<B>`가 `F<A>`의 하위 타입입니다. TypeScript에서 함수 매개변수 타입은 반공변적으로 동작하도록 설계되어 있습니다. 즉, 더 넓은 타입을 허용하는 함수를 더 좁은 타입이 필요한 위치에서 사용할 수 있습니다.

하지만 실제로 TypeScript는 함수 매개변수에 이변성을 허용하는 경우가 많습니다(`strictFunctionTypes`가 활성화된 경우는 제외). 따라서 엄격하게 타입 안전하지 않은 경우에도 양방향이 모두 허용될 수 있습니다.

예시: 모든 동물을 위한 공간과 개만을 위한 별도의 공간을 상상해 보세요.

* **공변성**:  
  모든 개는 동물이므로 "동물 공간"이 필요한 곳에 "개 공간"을 사용할 수 있습니다.  
  하지만 "개 공간"이 필요한 곳에 "동물 공간"을 사용할 수는 없습니다. 개가 아닌 동물이 들어 있을 수 있기 때문입니다.

* **반공변성** (함수를 기준으로 생각하세요):  
  **모든 동물**을 처리할 수 있는 것이 있다면 **개만** 처리하는 것이 필요한 곳에 사용할 수 있습니다.  
  하지만 그 반대는 불가능합니다.

공변성 예시:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

반공변성 예시:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### 타입 매개변수의 선택적 변성 어노테이션

TypeScript 4.7.0부터 `out` 및 `in` 키워드를 사용하여 변성 어노테이션을 지정할 수 있습니다.

공변성에는 `out` 키워드를 사용합니다.

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

반공변성에는 `in` 키워드를 사용합니다.

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### 템플릿 문자열 패턴 인덱스 시그니처

템플릿 문자열 패턴 인덱스 시그니처를 사용하면 템플릿 문자열 패턴으로 유연한 인덱스 시그니처를 정의할 수 있습니다. 이 기능을 통해 특정 문자열 키 패턴으로 인덱싱할 수 있는 객체를 생성할 수 있으므로, 프로퍼티에 접근하고 프로퍼티를 조작할 때 더 세밀하게 제어하고 구체적으로 지정할 수 있습니다.

TypeScript는 버전 4.4부터 심볼과 템플릿 문자열 패턴을 위한 인덱스 시그니처를 지원합니다.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### satisfies 연산자

`satisfies` 연산자를 사용하면 주어진 타입이 특정 인터페이스나 조건을 충족하는지 확인할 수 있습니다. 다시 말해, 타입이 특정 인터페이스에 필요한 모든 프로퍼티와 메서드를 갖추도록 보장합니다. 이는 변수가 타입 정의에 부합하는지 보장하는 방법입니다.
예시는 다음과 같습니다.

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### 타입 전용 가져오기와 내보내기

타입 전용 가져오기와 내보내기를 사용하면 해당 타입과 관련된 값이나 함수를 가져오거나 내보내지 않고 타입만 가져오거나 내보낼 수 있습니다. 이는 번들 크기를 줄이는 데 유용할 수 있습니다.

타입 전용 가져오기를 사용하려면 `import type` 키워드를 사용하면 됩니다.

TypeScript에서는 `allowImportingTsExtensions` 설정과 관계없이 타입 전용 가져오기에서 선언 파일과 구현 파일의 확장자(.ts, .mts, .cts, .tsx)를 모두 사용할 수 있습니다.

예시:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

다음과 같은 형식이 지원됩니다.

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using 선언과 명시적 리소스 관리

`using` 선언은 `const`와 유사한 블록 범위의 불변 바인딩으로, 폐기 가능한 리소스를 관리하는 데 사용됩니다. 값으로 초기화되면 해당 값의 `Symbol.dispose` 메서드가 기록되고, 이후 둘러싸는 블록 범위를 벗어날 때 실행됩니다.

이는 객체 생성 후 연결 종료, 파일 삭제, 메모리 해제와 같은 필수 정리 작업을 수행하는 데 유용한 ECMAScript의 리소스 관리 기능을 기반으로 합니다.

참고:

* TypeScript 5.2에 최근 도입된 기능이므로 대부분의 런타임은 네이티브로 지원하지 않습니다. `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`에는 폴리필이 필요합니다.
* 또한 tsconfig.json을 다음과 같이 구성해야 합니다.

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

예시:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

코드의 로그 출력은 다음과 같습니다.

```shell
1
2
disposed
3
```

폐기할 수 있는 리소스는 `Disposable` 인터페이스를 준수해야 합니다.

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

`using` 선언은 리소스 폐기 작업을 스택에 기록하여 선언의 역순으로 폐기되도록 합니다.

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

이후 코드가 실행되거나 예외가 발생하더라도 리소스는 반드시 폐기됩니다. 이 과정에서 폐기 작업이 예외를 던져 다른 예외를 억제할 수 있습니다. 억제된 오류에 대한 정보를 유지하기 위해 새로운 네이티브 예외인 `SuppressedError`가 도입되었습니다.

#### await using 선언

`await using` 선언은 비동기적으로 폐기 가능한 리소스를 처리합니다. 값에는 `Symbol.asyncDispose` 메서드가 있어야 하며, 블록이 끝날 때 이 메서드의 완료를 기다립니다.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

비동기적으로 폐기 가능한 리소스는 `Disposable` 또는 `AsyncDisposable` 인터페이스를 준수해야 합니다.

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

코드는 다음과 같은 로그를 출력합니다.

```shell
Doing some work...
Closing the connection...
Connection closed.
```

`using` 및 `await using` 선언은 `for`, `for-in`, `for-of`, `for-await-of`, `switch` 문에서 사용할 수 있습니다.

### 가져오기 속성

TypeScript 5.3의 가져오기 속성(가져오기에 대한 레이블)은 런타임에 모듈(JSON 등)을 처리하는 방법을 알려 줍니다. 이를 통해 가져오기 방식이 명확해져 보안이 향상되고, 더 안전한 리소스 로딩을 위해 콘텐츠 보안 정책(CSP)에 부합합니다. TypeScript는 가져오기 속성이 유효한지 확인하지만, 특정 모듈을 처리하기 위해 이를 해석하는 일은 런타임에 맡깁니다.

예시:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

동적 가져오기의 경우:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### 정규 표현식 구문 검사

TypeScript 5.5.4부터는 컴파일 시간에 정규 표현식 리터럴의 일반적인 오류(예: 잘못된 구문, 잘못된 역참조, 대상 JavaScript 버전에서 지원되지 않는 기능)를 검사합니다. 버그를 더 일찍 발견하는 데 도움이 되지만, new RegExp("...") 문자열은 검사하지 않습니다.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer`를 사용하면 모듈을 로드하되 모듈에서 실제로 무언가를 사용할 때까지 실행을 지연할 수 있습니다. 이렇게 하면 불필요한 작업과 부작용을 피하는 데 도움이 됩니다.

* 다음 형식에서만 동작합니다: `import defer * as name from "module"`
* 내보낸 항목에 접근할 때만 코드가 실행됩니다.
