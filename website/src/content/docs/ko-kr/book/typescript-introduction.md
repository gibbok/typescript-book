---
title: TypeScript 소개
sidebar:
  order: 8
  label: 8. TypeScript 소개
---


### TypeScript란?

TypeScript는 JavaScript를 기반으로 구축된 강타입 프로그래밍 언어입니다. 원래 2012년에 Anders Hejlsberg가 설계했으며, 현재 Microsoft가 오픈 소스 프로젝트로 개발하고 유지 관리하고 있습니다.

TypeScript는 JavaScript로 컴파일되며 모든 JavaScript 런타임(예: 브라우저 또는 서버의 Node.js)에서 실행할 수 있습니다.

함수형, 제네릭, 명령형 및 객체 지향 프로그래밍과 같은 여러 프로그래밍 패러다임을 지원하며, 실행 전에 JavaScript로 변환되는 컴파일(트랜스파일) 언어입니다.

### 왜 TypeScript인가?

TypeScript는 프로그램이 실행되기 전에 일반적인 프로그래밍 실수를 방지하고 특정 종류의 런타임 오류를 피할 수 있도록 도와주는 강타입 언어입니다.

강타입 언어를 사용하면 개발자가 데이터 타입 정의에 다양한 프로그램 제약 조건과 동작을 지정할 수 있으므로 소프트웨어의 정확성을 검증하고 결함을 방지하기가 쉬워집니다. 이는 특히 대규모 애플리케이션에서 유용합니다.

TypeScript의 몇 가지 장점은 다음과 같습니다.

* 정적 타이핑, 선택적인 강타입 지정
* 타입 추론
* ES6 및 ES7 기능 사용
* 크로스 플랫폼 및 크로스 브라우저 호환성
* IntelliSense를 통한 도구 지원

### TypeScript와 JavaScript

TypeScript는 `.ts` 또는 `.tsx` 파일로 작성하는 반면, JavaScript 파일은 `.js` 또는 `.jsx`로 작성합니다.

확장자가 `.tsx` 또는 `.jsx`인 파일에는 UI 개발을 위해 React에서 사용하는 JavaScript 구문 확장인 JSX가 포함될 수 있습니다.

TypeScript는 구문 측면에서 JavaScript(ECMAScript 2015)의 타입이 지정된 상위 집합입니다. 모든 JavaScript 코드는 유효한 TypeScript 코드이지만, 그 반대가 항상 성립하는 것은 아닙니다.

예를 들어, 다음과 같이 확장자가 `.js`인 JavaScript 파일의 함수를 살펴보겠습니다.

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

파일 확장자를 `.ts`로 변경하면 이 함수를 TypeScript로 변환하여 사용할 수 있습니다. 그러나 같은 함수에 TypeScript 타입을 어노테이션하면 컴파일하지 않고는 어떤 JavaScript 런타임에서도 실행할 수 없습니다. 다음 TypeScript 코드는 컴파일하지 않으면 구문 오류가 발생합니다.

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript는 개발자가 타입 어노테이션을 통해 의도를 표현할 수 있도록 하여 잠재적인 런타임 오류를 컴파일 시점에 감지하도록 설계되었습니다. 또한 타입 추론 덕분에 명시적인 타입 어노테이션이 없어도 특정 문제를 포착할 수 있습니다. 예를 들어 다음 코드 조각에는 어떤 TypeScript 타입도 지정되어 있지 않습니다.

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

이 경우 TypeScript는 오류를 감지하고 다음과 같이 보고합니다.

```text
Property 'y' does not exist on type '{ x: number; }'.
```

TypeScript의 타입 시스템은 JavaScript의 런타임 동작에 큰 영향을 받습니다. 예를 들어 JavaScript에서 문자열 연결이나 숫자 덧셈을 수행할 수 있는 덧셈 연산자(+)는 TypeScript에서도 같은 방식으로 모델링됩니다.

```typescript
const result = '1' + 1; // Result is of type string
```

TypeScript 개발 팀은 JavaScript의 비정상적인 사용을 의도적으로 오류로 표시하기로 결정했습니다. 예를 들어 다음의 유효한 JavaScript 코드를 살펴보겠습니다.

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

하지만 TypeScript는 오류를 발생시킵니다.

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

이 오류는 TypeScript가 타입 호환성을 엄격하게 적용하기 때문에 발생하며, 이 경우 숫자와 불리언 사이의 잘못된 연산을 식별합니다.

### TypeScript 코드 생성

TypeScript 컴파일러에는 타입 오류 검사와 JavaScript 컴파일이라는 두 가지 주요 역할이 있습니다. 이 두 프로세스는 서로 독립적입니다. 타입은 컴파일 중에 완전히 제거되므로 JavaScript 런타임에서 코드 실행에 영향을 주지 않습니다. TypeScript는 타입 오류가 있더라도 JavaScript를 출력할 수 있습니다.
다음은 타입 오류가 있는 TypeScript 코드의 예입니다.

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

하지만 여전히 실행 가능한 JavaScript 출력을 생성할 수 있습니다.

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

런타임에는 TypeScript 타입을 검사할 수 없습니다. 예를 들면 다음과 같습니다.

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

컴파일 후에는 타입이 제거되므로 JavaScript에서는 이 코드를 실행할 방법이 없습니다. 런타임에 타입을 식별하려면 다른 메커니즘을 사용해야 합니다. TypeScript는 여러 가지 방법을 제공하며, 일반적으로 사용하는 방법 중 하나는 "태그된 유니온"입니다. 예를 들면 다음과 같습니다.

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

"kind" 프로퍼티는 런타임에 JavaScript 객체를 구별하는 데 사용할 수 있는 값입니다.

런타임의 값이 타입 선언에서 선언된 타입과 다른 타입을 갖는 것도 가능합니다. 예를 들어 개발자가 API 타입을 잘못 해석하여 잘못된 어노테이션을 지정한 경우입니다.

TypeScript는 JavaScript의 상위 집합이므로 "class" 키워드를 런타임에 타입과 값으로 사용할 수 있습니다.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

JavaScript에서 "class"에는 "prototype" 프로퍼티가 있으며, "instanceof" 연산자를 사용하면 생성자의 prototype 프로퍼티가 객체의 프로토타입 체인 어디에든 존재하는지 검사할 수 있습니다.

모든 타입이 제거되므로 TypeScript는 런타임 성능에 아무런 영향을 주지 않습니다. 하지만 TypeScript는 빌드 시간에 어느 정도 오버헤드를 발생시킵니다.

### 현대적인 JavaScript를 지금 사용하기(다운레벨링)

TypeScript는 ECMAScript 3(1999) 이후 출시된 모든 JavaScript 버전으로 코드를 컴파일할 수 있습니다. 즉, TypeScript는 최신 JavaScript 기능을 사용한 코드를 이전 버전으로 트랜스파일할 수 있으며, 이 과정을 다운레벨링이라고 합니다. 이를 통해 이전 런타임 환경과의 호환성을 최대한 유지하면서 현대적인 JavaScript를 사용할 수 있습니다.

이전 버전의 JavaScript로 트랜스파일할 때 TypeScript가 네이티브 구현보다 성능 오버헤드를 일으킬 수 있는 코드를 생성할 수도 있다는 점에 유의해야 합니다.

TypeScript에서 사용할 수 있는 현대적인 JavaScript 기능은 다음과 같습니다.

* AMD 스타일의 "define" 콜백이나 CommonJS의 "require" 문 대신 ECMAScript 모듈 사용.
* 프로토타입 대신 클래스 사용.
* "var" 대신 "let" 또는 "const"를 사용한 변수 선언.
* 전통적인 "for" 루프 대신 "for-of" 루프 또는 ".forEach" 사용.
* 함수 표현식 대신 화살표 함수 사용.
* 구조 분해 할당.
* 축약 프로퍼티/메서드 이름과 계산된 프로퍼티 이름.
* 기본 함수 매개변수.

이러한 현대적인 JavaScript 기능을 활용하면 개발자는 TypeScript에서 더 표현력 있고 간결한 코드를 작성할 수 있습니다.

