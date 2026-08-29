# Unknown 타입



TypeScript에서 `unknown` 타입은 타입을 알 수 없는 값을 나타냅니다. 모든 타입의 값을 허용하는 `any` 타입과 달리, `unknown`은 특정 방식으로 사용하기 전에 타입 검사 또는 단언이 필요하므로, 더 구체적인 타입으로 먼저 단언하거나 좁히지 않으면 `unknown`에 어떠한 연산도 수행할 수 없습니다.

`unknown` 타입은 `any`와 `unknown` 자체에만 할당할 수 있으며, `any`를 대신하는 타입 안전한 선택지입니다.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

