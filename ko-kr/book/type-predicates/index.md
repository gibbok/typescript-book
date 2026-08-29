# 타입 술어



TypeScript의 타입 술어는 불리언 값을 반환하고 변수의 타입을 더 구체적인 타입으로 좁히는 데 사용되는 함수입니다.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5는 타입 술어(예: `x is T`)를 `.filter` 같은 함수에서 자동으로 추론하므로 undefined 같은 값이 제거되는 시점을 인식하여 더 정확한 타입과 더 적은 오류를 제공합니다. 이는 명확한 검사(예: `x !== undefined`)에서는 작동하지만 `!!x`처럼 모호한 검사에서는 작동하지 않습니다.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

