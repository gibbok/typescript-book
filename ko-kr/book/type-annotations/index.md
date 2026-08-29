# 타입 어노테이션



`var`, `let`, `const`를 사용하여 선언한 변수에는 선택적으로 타입을 추가할 수 있습니다.

```typescript
const x: number = 1;
```

TypeScript는 특히 단순한 타입을 잘 추론하므로 대부분의 경우 이러한 선언은 필요하지 않습니다.

함수에서는 매개변수에 타입 어노테이션을 추가할 수 있습니다.

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

다음은 익명 함수(람다 함수라고도 함)를 사용하는 예제입니다.

```typescript
const sum = (a: number, b: number) => a + b;
```

매개변수에 기본값이 있으면 이러한 어노테이션을 생략할 수 있습니다.

```typescript
const sum = (a = 10, b: number) => a + b;
```

함수에 반환 타입 어노테이션을 추가할 수 있습니다.

```typescript
const sum = (a = 10, b: number): number => a + b;
```

이는 특히 더 복잡한 함수에서 유용합니다. 구현 전에 반환 타입을 작성하면 함수를 구상하는 데 도움이 될 수 있기 때문입니다.

일반적으로 타입 시그니처에는 어노테이션을 추가하되 함수 본문의 지역 변수에는 추가하지 않는 것을 고려하고, 객체 리터럴에는 항상 타입을 추가하세요.

