# 타입 시스템 살펴보기



### TypeScript 언어 서비스

tsserver라고도 하는 TypeScript 언어 서비스는 오류 보고, 진단, 저장 시 컴파일, 이름 변경, 정의로 이동, 자동 완성 목록, 시그니처 도움말 등 다양한 기능을 제공합니다. 주로 통합 개발 환경(IDE)에서 IntelliSense 지원을 제공하는 데 사용됩니다. Visual Studio Code와 원활하게 통합되며 Conquer of Completion (Coc)과 같은 도구에서도 사용됩니다.

개발자는 전용 API를 활용하고 자체 언어 서비스 플러그인을 만들어 TypeScript 편집 환경을 개선할 수 있습니다. 이는 특별한 린팅 기능을 구현하거나 사용자 정의 템플릿 언어의 자동 완성을 활성화할 때 특히 유용합니다.

<!-- markdownlint-disable MD044 -->
실제 사용자 정의 플러그인의 예로는 styled components의 CSS 프로퍼티에 대한 구문 오류 보고와 IntelliSense 지원을 제공하는 "typescript-styled-plugin"이 있습니다.
<!-- markdownlint-enable MD044 -->

자세한 정보와 빠른 시작 가이드는 GitHub의 공식 TypeScript Wiki를 참고하세요. [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### 구조적 타이핑

TypeScript는 구조적 타입 시스템을 기반으로 합니다. 즉, C#이나 C와 같은 명목적 타입 시스템과 달리 타입의 호환성과 동등성은 이름이나 선언 위치가 아니라 타입의 실제 구조 또는 정의에 의해 결정됩니다.

TypeScript의 구조적 타입 시스템은 JavaScript의 동적 덕 타이핑 시스템이 런타임에 작동하는 방식을 바탕으로 설계되었습니다.

다음 예제는 유효한 TypeScript 코드입니다. 보이는 것처럼 "X"와 "Y"는 선언 이름이 서로 다르지만 동일한 멤버 "a"를 가집니다. 타입은 구조에 따라 결정되며, 이 경우 구조가 같으므로 서로 호환되고 유효합니다.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### TypeScript의 기본 비교 규칙

TypeScript의 비교 과정은 재귀적으로 이루어지며 모든 깊이에 중첩된 타입에 대해 실행됩니다.

"Y"가 최소한 "X"와 동일한 멤버를 가지고 있으면 타입 "X"는 "Y"와 호환됩니다.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

함수 매개변수는 이름이 아니라 타입으로 비교합니다.

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

함수 반환 타입은 같아야 합니다.

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

소스 함수의 반환 타입은 대상 함수 반환 타입의 하위 타입이어야 합니다.

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

함수 매개변수를 버리는 것은 허용됩니다. 이는 JavaScript에서 흔한 관행으로, 예를 들면 "Array.prototype.map()"을 사용할 때 그렇습니다.

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

따라서 다음 타입 선언은 완전히 유효합니다.

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

소스 타입의 추가 선택적 매개변수는 모두 유효합니다.

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

소스 타입에 대응하는 매개변수가 없는 대상 타입의 선택적 매개변수는 모두 유효하며 오류가 아닙니다.

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

나머지 매개변수는 선택적 매개변수가 무한히 이어지는 것으로 취급됩니다.

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

오버로드가 있는 함수는 오버로드 시그니처가 구현 시그니처와 호환되면 유효합니다.

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

소스와 대상의 매개변수를 상위 타입이나 하위 타입에 할당할 수 있으면 함수 매개변수 비교가 성공합니다(이변성).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

열거형은 숫자와 비교할 수 있으며 그 반대도 유효하지만, 서로 다른 열거형 타입의 열거형 값을 비교하는 것은 유효하지 않습니다.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

클래스의 인스턴스는 private 멤버와 protected 멤버에 대한 호환성 검사를 받습니다.

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

비교 검사는 서로 다른 상속 계층을 고려하지 않습니다. 예를 들면 다음과 같습니다.

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

제네릭은 제네릭 매개변수를 적용한 뒤의 결과 타입을 바탕으로 구조를 사용해 비교하며, 최종 결과만 비제네릭 타입으로 비교합니다.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

제네릭의 타입 인수를 지정하지 않으면 지정되지 않은 모든 인수는 "any" 타입으로 취급됩니다.

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

기억하세요.

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

"strictNullChecks"가 활성화된 경우 "null"과 "undefined"는 "void"와 비슷하게 취급되며, 그렇지 않으면 "never"와 비슷하게 취급된다는 점에 유의하세요.

### 집합으로서의 타입

TypeScript에서 타입은 가능한 값의 집합입니다. 이 집합은 타입의 도메인이라고도 합니다. 타입의 각 값은 집합의 원소로 볼 수 있습니다. 타입은 집합의 각 원소가 해당 집합의 구성원으로 간주되기 위해 충족해야 하는 제약 조건을 설정합니다.
TypeScript의 주된 작업은 한 집합이 다른 집합의 부분집합인지 검사하고 확인하는 것입니다.

TypeScript는 다양한 종류의 집합을 지원합니다.

| 집합 용어          | TypeScript                      | 참고                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 공집합             | never                           | "never"는 자기 자신 외에는 아무것도 포함하지 않습니다                                                            |
| 단일 원소 집합     | undefined / null / literal type |                                                                                                                    |
| 유한 집합          | boolean / union                 |                                                                                                                    |
| 무한 집합          | string / number / object        |                                                                                                                    |
| 전체집합           | any / unknown                   | 모든 원소는 "any"의 구성원이고 모든 집합은 그 부분집합입니다 / "unknown"은 "any"의 타입 안전한 대응 타입입니다 |

다음은 몇 가지 예입니다.

| TypeScript            | 집합 용어               | 예                                                                              |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (공집합)             | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| 리터럴 타입           | 단일 원소 집합         | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| T에 할당 가능한 값    | 값 ∈ T (구성원)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T2에 할당 가능한 T1   | T1 ⊆ T2 (부분집합)     | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (부분집합)     | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (합집합)       | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (교집합)       | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | 전체집합               | const x: unknown = 1                                                            |

합집합 (T1 | T2)는 더 넓은 집합(둘 다)을 만듭니다.

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

교집합 (T1 & T2)는 더 좁은 집합(공유되는 부분만)을 만듭니다.

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

이 맥락에서 `extends` 키워드는 "부분집합"으로 생각할 수 있습니다. 이는 타입에 제약 조건을 설정합니다. `extends`를 제네릭과 함께 사용하면 제네릭 타입 매개변수를 더 구체적인 타입으로 제한합니다.

여기서 `extends`는 OOP 의미의 클래스 상속과 아무런 관련이 없다는 점에 유의하세요.

TypeScript는 구조적 타입을 사용하며 엄격한 명목적 계층 구조가 없습니다. 실제로 아래 예제처럼 TypeScript는 객체의 구조 또는 형태를 고려하므로 두 타입 중 어느 쪽도 다른 쪽의 하위 타입이 아니면서 서로 겹칠 수 있습니다.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### 타입 지정하기: 타입 선언과 타입 단언

TypeScript에서는 여러 가지 방법으로 타입을 할당할 수 있습니다.

#### 타입 선언

다음 예제에서는 x: X (": Type")를 사용하여 변수 x의 타입을 선언합니다.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

변수가 지정된 형식에 맞지 않으면 TypeScript가 오류를 보고합니다. 예를 들면 다음과 같습니다.

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### 타입 단언

`as` 키워드를 사용하여 단언을 추가할 수 있습니다. 이는 개발자가 타입에 관해 더 많은 정보를 가지고 있음을 컴파일러에 알리고 발생할 수 있는 모든 오류를 표시하지 않게 합니다.

예를 들면 다음과 같습니다.

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

위 예제에서는 as 키워드를 사용하여 객체 x가 타입 X를 갖는다고 단언합니다. 이는 객체에 타입 정의에 없는 추가 프로퍼티 b가 있더라도 지정된 타입을 준수한다고 TypeScript 컴파일러에 알립니다.

타입 단언은 특히 DOM을 다룰 때처럼 더 구체적인 타입을 지정해야 하는 상황에 유용합니다. 예를 들면 다음과 같습니다.

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

여기서 타입 단언 as HTMLInputElement는 getElementById의 결과를 HTMLInputElement로 취급해야 한다고 TypeScript에 알리는 데 사용됩니다.
타입 단언은 아래의 템플릿 리터럴 예제처럼 키를 다시 매핑하는 데도 사용할 수 있습니다.

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

이 예제에서 `J<Type>` 타입은 템플릿 리터럴이 포함된 매핑된 타입을 사용하여 Type의 키를 다시 매핑합니다. 각 키에 "prefix_"가 추가된 새 프로퍼티를 만들고, 해당 값은 원래 프로퍼티 값을 반환하는 함수입니다.

타입 단언을 사용할 때 TypeScript가 초과 프로퍼티 검사를 실행하지 않는다는 점에 유의할 필요가 있습니다. 따라서 객체의 구조를 미리 알고 있다면 일반적으로 타입 선언을 사용하는 것이 좋습니다.

#### 앰비언트 선언

앰비언트 선언은 JavaScript 코드의 타입을 설명하는 파일이며 파일 이름 형식은 `.d.ts.`입니다. 보통 기존 JavaScript 라이브러리에 타입 어노테이션을 추가하거나 프로젝트의 기존 JS 파일에 타입을 추가하기 위해 가져와서 사용합니다.

많이 사용되는 라이브러리의 타입은 다음에서 찾을 수 있습니다.
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

그리고 다음 명령으로 설치할 수 있습니다.

```shell
npm install --save-dev @types/library-name
```

직접 정의한 앰비언트 선언은 "트리플 슬래시" 참조를 사용해 가져올 수 있습니다.

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

`// @ts-check`를 사용하면 JavaScript 파일 안에서도 앰비언트 선언을 사용할 수 있습니다.

`declare` 키워드는 기존 JavaScript 코드를 가져오지 않고도 타입을 정의할 수 있게 하며, 다른 파일 또는 전역에 있는 타입을 위한 자리 표시자 역할을 합니다.

### 프로퍼티 검사와 초과 프로퍼티 검사

TypeScript는 구조적 타입 시스템을 기반으로 하지만, 초과 프로퍼티 검사는 객체가 타입에 지정된 프로퍼티만 정확히 가지는지 확인하는 TypeScript 기능입니다.

초과 프로퍼티 검사는 객체 리터럴을 변수에 할당하거나 함수의 초과 프로퍼티에 인수로 전달할 때 수행됩니다. 예를 들면 다음과 같습니다.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### 약한 타입

모든 프로퍼티가 선택적인 프로퍼티 집합으로만 이루어진 타입은 약한 타입으로 간주됩니다.

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript에서는 겹치는 부분이 없을 때 약한 타입에 어떤 값을 할당하는 것을 오류로 간주합니다. 예를 들어 다음 코드는 오류를 발생시킵니다.

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

권장되지는 않지만 필요하다면 타입 단언을 사용하여 이 검사를 우회할 수 있습니다.

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

또는 약한 타입의 인덱스 시그니처에 `unknown`을 추가할 수 있습니다.

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### 엄격한 객체 리터럴 검사(Freshness)

엄격한 객체 리터럴 검사는 "freshness"라고도 하며, 일반적인 구조적 타입 검사에서는 알아차리지 못할 수 있는 초과 프로퍼티나 철자가 잘못된 프로퍼티를 찾는 데 도움이 되는 TypeScript 기능입니다.

객체 리터럴을 만들 때 TypeScript 컴파일러는 이를 "fresh"한 것으로 간주합니다. 객체 리터럴을 변수에 할당하거나 매개변수로 전달할 때, 객체 리터럴에 대상 타입에 없는 프로퍼티가 지정되어 있으면 TypeScript가 오류를 발생시킵니다.

그러나 객체 리터럴이 확장되거나 타입 단언을 사용하면 "freshness"가 사라집니다.

다음은 이를 보여 주는 몇 가지 예제입니다.

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### 타입 추론

TypeScript는 다음 상황에서 어노테이션이 제공되지 않아도 타입을 추론할 수 있습니다.

* 변수 초기화.
* 멤버 초기화.
* 매개변수의 기본값 설정.
* 함수 반환 타입.

예를 들면 다음과 같습니다.

```typescript
let x = 'x'; // The type inferred is string
```

TypeScript 컴파일러는 값이나 표현식을 분석하고 사용 가능한 정보를 바탕으로 타입을 결정합니다.

### 더 고급 추론

타입 추론에 여러 표현식이 사용되면 TypeScript는 "최적 공통 타입"을 찾습니다. 예를 들면 다음과 같습니다.

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

컴파일러가 최적 공통 타입을 찾을 수 없으면 유니온 타입을 반환합니다. 예를 들면 다음과 같습니다.

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript는 변수의 위치를 바탕으로 "문맥적 타이핑"을 사용하여 타입을 추론합니다. 다음 예제에서 컴파일러는 다양한 일반 JavaScript 구문과 DOM의 앰비언트 선언이 들어 있는 lib.d.ts 파일에 정의된 `click` 이벤트 타입을 바탕으로 `e`가 `MouseEvent` 타입임을 압니다.

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### 타입 넓히기

타입 넓히기는 TypeScript가 타입 어노테이션 없이 초기화된 변수에 타입을 할당하는 과정입니다. 좁은 타입에서 더 넓은 타입으로 넓히는 것은 허용하지만 그 반대는 허용하지 않습니다.
다음 예제를 살펴보세요.

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript는 초기화할 때 제공된 단일 값(`x`)을 바탕으로 `x`에 `string`을 할당하며, 이는 타입 넓히기의 예입니다.

TypeScript는 예를 들어 "const"를 사용하여 타입 넓히기 과정을 제어하는 방법을 제공합니다.

### Const

변수를 선언할 때 `const` 키워드를 사용하면 TypeScript가 더 좁은 타입을 추론합니다.

예를 들면 다음과 같습니다.

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

`const`를 사용해 변수 x를 선언하면 타입이 특정 리터럴 값 'x'로 좁혀집니다. x의 타입이 좁혀졌으므로 오류 없이 변수 y에 할당할 수 있습니다.
타입을 추론할 수 있는 이유는 `const` 변수를 재할당할 수 없기 때문입니다. 따라서 타입을 특정 리터럴 타입, 이 경우에는 리터럴 타입 'x'로 좁힐 수 있습니다.

#### 타입 매개변수의 Const 수정자

TypeScript 버전 5.0부터 제네릭 타입 매개변수에 `const` 속성을 지정할 수 있습니다. 이를 통해 가능한 한 가장 정밀한 타입을 추론할 수 있습니다. `const`를 사용하지 않은 예제를 살펴보겠습니다.

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

보이는 것처럼 프로퍼티 `a`와 `b`는 `string` 타입으로 추론됩니다.

이제 `const` 버전과의 차이를 살펴보겠습니다.

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

이제 프로퍼티 `a`와 `b`가 단순한 `string` 타입이 아니라 문자열 리터럴로 추론되는 것을 확인할 수 있습니다.

#### Const 단언

이 기능을 사용하면 초기화 값을 바탕으로 더 정밀한 리터럴 타입을 갖는 변수를 선언하여, 해당 값을 불변 리터럴로 취급해야 함을 컴파일러에 알릴 수 있습니다. 다음은 몇 가지 예제입니다.

단일 프로퍼티에 적용하는 경우:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

객체 전체에 적용하는 경우:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

이는 튜플의 타입을 정의할 때 특히 유용할 수 있습니다.

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### 명시적 타입 어노테이션

타입을 구체적으로 지정하여 전달할 수 있습니다. 다음 예제에서 프로퍼티 `x`는 `number` 타입입니다.

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

리터럴 타입의 유니온을 사용하면 타입 어노테이션을 더 구체적으로 만들 수 있습니다.

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### 타입 좁히기

타입 좁히기는 일반적인 타입이 더 구체적인 타입으로 좁혀지는 TypeScript의 과정입니다. TypeScript가 코드를 분석하여 특정 조건이나 연산이 타입 정보를 구체화할 수 있다고 판단할 때 발생합니다.

타입 좁히기는 다음을 비롯해 다양한 방식으로 이루어질 수 있습니다.

#### 조건

`if`나 `switch` 같은 조건문을 사용하면 TypeScript가 조건의 결과를 바탕으로 타입을 좁힐 수 있습니다. 예를 들면 다음과 같습니다.

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### 예외 발생 또는 반환

오류를 발생시키거나 분기에서 일찍 반환하면 TypeScript가 타입을 좁히는 데 도움이 될 수 있습니다. 예를 들면 다음과 같습니다.

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

TypeScript에서 타입을 좁히는 다른 방법은 다음과 같습니다.

* `instanceof` 연산자: 객체가 특정 클래스의 인스턴스인지 확인하는 데 사용됩니다.
* `in` 연산자: 객체에 프로퍼티가 존재하는지 확인하는 데 사용됩니다.
* `typeof` 연산자: 런타임에 값의 타입을 확인하는 데 사용됩니다.
* `Array.isArray()` 같은 기본 제공 함수: 값이 배열인지 확인하는 데 사용됩니다.

#### 판별 유니온

"판별 유니온(Discriminated Union)"을 사용하는 것은 유니온에 포함된 서로 다른 타입을 구별하기 위해 객체에 명시적인 "태그(tag)"를 추가하는 TypeScript 패턴입니다. 이 패턴은 "태그된 유니온(tagged union)"이라고도 합니다. 다음 예제에서는 "태그"를 "type" 프로퍼티로 나타냅니다.

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### 사용자 정의 타입 가드

TypeScript가 타입을 판별할 수 없는 경우에는 "사용자 정의 타입 가드(user-defined type guard)"라는 헬퍼 함수를 작성할 수 있습니다. 다음 예제에서는 특정 필터링을 적용한 뒤 타입을 좁히기 위해 타입 술어(Type Predicate)를 사용합니다.

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Switch-true 좁히기

TypeScript 5.3에는 switch-true 좁히기가 추가되어, 복잡한 if/else 체인을 불리언 조건을 사용하는 switch (true)로 대체할 수 있습니다. 가독성이 향상되면서도 타입은 계속 좁혀집니다. 패턴 매칭과 비슷하지만 더 간단합니다.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

