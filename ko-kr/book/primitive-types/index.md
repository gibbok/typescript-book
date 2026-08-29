# 원시 타입



TypeScript는 7가지 원시 타입을 지원합니다. 원시 데이터 타입은 객체가 아니며 관련된 메서드가 없는 타입을 의미합니다. TypeScript에서 모든 원시 타입은 불변이므로 값이 할당된 후에는 변경할 수 없습니다.

### string

`string` 원시 타입은 텍스트 데이터를 저장하며, 값은 항상 큰따옴표나 작은따옴표로 묶입니다.

```typescript
const x: string = 'x';
const y: string = 'y';
```

문자열을 백틱(`) 문자로 감싸면 여러 줄에 걸쳐 작성할 수 있습니다.

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

TypeScript의 `boolean` 데이터 타입은 `true` 또는 `false`인 이진 값을 저장합니다.

```typescript
const isReady: boolean = true;
```

### number

TypeScript의 `number` 데이터 타입은 64비트 부동 소수점 값으로 표현됩니다. `number` 타입은 정수와 소수를 나타낼 수 있습니다.
TypeScript는 16진수, 2진수, 8진수도 지원합니다. 예를 들면 다음과 같습니다.

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

`bigint`는 `number`가 지원하는 최대 안전 정수인 2^53 - 1보다 큰 정숫값을 나타냅니다.

`bigint`는 내장 함수 `BigInt()`를 호출하거나 정수 숫자 리터럴 끝에 `n`을 추가하여 만들 수 있습니다.

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

참고:

* `bigint` 값은 `number`와 혼합할 수 없으며 내장 `Math`와 함께 사용할 수 없습니다. 같은 타입으로 강제 변환해야 합니다.
* `bigint` 값은 target 구성이 ES2020 이상인 경우에만 사용할 수 있습니다.

### Symbol

심볼은 객체의 프로퍼티 키로 사용할 수 있는 고유 식별자로, 이름 충돌을 방지합니다.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null과 undefined

`null`과 `undefined` 타입은 모두 값이 없거나 어떤 값도 존재하지 않음을 나타냅니다.

`undefined` 타입은 값이 할당 또는 초기화되지 않았음을 의미하거나 의도하지 않은 값의 부재를 나타냅니다.

`null` 타입은 필드에 값이 없다는 사실을 알고 있어 해당 값을 사용할 수 없음을 의미하며, 의도적인 값의 부재를 나타냅니다.

### Array

`array`는 같은 타입 또는 서로 다른 타입의 여러 값을 저장할 수 있는 데이터 타입입니다. 다음 구문을 사용하여 정의할 수 있습니다.

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript는 다음 구문을 사용하여 읽기 전용 배열을 지원합니다.

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript는 튜플과 읽기 전용 튜플을 지원합니다.

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

`any` 데이터 타입은 문자 그대로 "모든" 값을 나타내며, TypeScript가 타입을 추론할 수 없거나 타입이 지정되지 않았을 때의 기본값입니다.

`any`를 사용하면 TypeScript 컴파일러가 타입 검사를 건너뛰므로 `any`를 사용하는 동안에는 타입 안전성이 보장되지 않습니다. 일반적으로 오류가 발생했을 때 컴파일러를 조용하게 만들기 위해 `any`를 사용하지 말고 오류를 수정하는 데 집중하세요. `any`를 사용하면 계약을 깨뜨리고 TypeScript 자동 완성의 이점을 잃을 수 있기 때문입니다.

`any` 타입은 컴파일러 오류를 억제할 수 있으므로 JavaScript에서 TypeScript로 점진적으로 마이그레이션할 때 유용할 수 있습니다.

새 프로젝트에서는 TypeScript 구성 옵션 `noImplicitAny`를 사용하세요. 이 옵션을 사용하면 `any`가 사용되거나 추론되는 곳에서 TypeScript가 오류를 발생시킵니다.

`any` 타입은 실제 타입 문제를 가릴 수 있는 오류의 원인이 되는 경우가 많습니다. 가능한 한 사용을 피하세요.

