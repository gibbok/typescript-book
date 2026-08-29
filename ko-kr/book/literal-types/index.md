# 리터럴 타입



리터럴 타입은 집합 타입 내에서 하나의 요소만 포함하는 집합으로, JavaScript 원시 값 하나를 정확하게 정의합니다.

TypeScript의 리터럴 타입에는 숫자, 문자열, 불리언이 있습니다.

리터럴의 예제는 다음과 같습니다.

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

문자열, 숫자, 불리언 리터럴 타입은 유니온, 타입 가드, 타입 별칭에서 사용됩니다.
다음 예제에서는 유니온 타입 별칭을 확인할 수 있습니다. `O`는 지정된 값으로만 구성되며 다른 문자열은 유효하지 않습니다.

```typescript
type O = 'a' | 'b' | 'c';
```

