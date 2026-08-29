# 열거형



TypeScript에서 `enum`은 이름이 지정된 상숫값의 집합입니다.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

열거형은 다양한 방식으로 정의할 수 있습니다.

### 숫자 열거형

TypeScript에서 숫자 열거형은 각 상수에 숫자 값이 할당되는 열거형으로, 기본적으로 0부터 시작합니다.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

값을 명시적으로 할당하여 사용자 지정 값을 지정할 수 있습니다.

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### 문자열 열거형

TypeScript에서 문자열 열거형은 각 상수에 문자열 값이 할당되는 열거형입니다.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

참고: TypeScript에서는 문자열 멤버와 숫자 멤버가 함께 존재할 수 있는 이종 열거형을 사용할 수 있습니다.

### 상수 열거형

TypeScript의 상수 열거형은 모든 값을 컴파일 시간에 알 수 있고 열거형이 사용되는 모든 위치에 인라인되어 더 효율적인 코드를 만드는 특별한 종류의 열거형입니다.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

다음과 같이 컴파일됩니다.

```typescript
console.log('EN' /* Language.English */);
```

참고:
상수 열거형은 값이 하드코딩되어 열거형 자체가 제거되므로 자체 포함 라이브러리에서는 더 효율적일 수 있지만 일반적으로는 바람직하지 않습니다. 또한 상수 열거형에는 계산된 멤버를 포함할 수 없습니다.

### 역방향 매핑

TypeScript에서 열거형의 역방향 매핑은 값으로 열거형 멤버 이름을 가져오는 기능을 의미합니다. 기본적으로 열거형 멤버에는 이름에서 값으로 향하는 정방향 매핑이 있지만, 각 멤버의 값을 명시적으로 설정하면 역방향 매핑을 만들 수 있습니다. 역방향 매핑은 값으로 열거형 멤버를 찾거나 모든 열거형 멤버를 순회해야 할 때 유용합니다. 숫자 열거형 멤버만 역방향 매핑을 생성하며, 문자열 열거형 멤버에는 역방향 매핑이 전혀 생성되지 않는다는 점에 유의하세요.

다음 열거형은:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

다음과 같이 컴파일됩니다.

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

따라서 값을 키에 매핑하는 것은 숫자 열거형 멤버에서는 작동하지만 문자열 열거형 멤버에서는 작동하지 않습니다.

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### 앰비언트 열거형

TypeScript의 앰비언트 열거형은 관련 구현 없이 선언 파일(*.d.ts)에 정의되는 열거형의 한 종류입니다. 각 파일에서 구현 세부 정보를 가져올 필요 없이 여러 파일에서 타입 안전하게 사용할 수 있는 이름이 지정된 상수 집합을 정의할 수 있습니다.

### 계산된 멤버와 상수 멤버

TypeScript에서 계산된 멤버는 런타임에 값이 계산되는 열거형 멤버이고, 상수 멤버는 컴파일 시간에 값이 설정되어 런타임에 변경할 수 없는 멤버입니다. 계산된 멤버는 일반 열거형에서 사용할 수 있으며, 상수 멤버는 일반 열거형과 const 열거형 모두에서 사용할 수 있습니다.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

열거형은 멤버 타입으로 구성된 유니온으로 표현됩니다. 각 멤버의 값은 상수 표현식이나 비상수 표현식을 통해 결정할 수 있으며, 상숫값을 갖는 멤버에는 리터럴 타입이 할당됩니다. 예를 들어 타입 E와 그 하위 타입 E.A, E.B, E.C의 선언을 살펴보세요. 이 경우 E는 유니온 E.A | E.B | E.C를 나타냅니다.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

