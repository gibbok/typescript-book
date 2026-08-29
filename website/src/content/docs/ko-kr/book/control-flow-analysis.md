---
title: 제어 흐름 분석
sidebar:
  order: 23
  label: 23. 제어 흐름 분석
---


TypeScript의 제어 흐름 분석은 변수의 타입을 추론하기 위해 코드 흐름을 정적으로 분석하는 방법으로, 컴파일러가 분석 결과를 바탕으로 필요에 따라 해당 변수의 타입을 좁힐 수 있게 해줍니다.

TypeScript 4.4 이전에는 코드 흐름 분석이 if 문 안의 코드에만 적용되었지만, TypeScript 4.4부터는 const 변수를 통해 간접적으로 참조되는 조건식과 판별 프로퍼티 접근에도 적용할 수 있습니다.

예를 들면 다음과 같습니다.

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

좁히기가 발생하지 않는 몇 가지 예제는 다음과 같습니다.

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Error, no narrowing because isString it is not const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Error, no narrowing because obj is assigned in function body
    }
};
```

참고: 조건식에서는 최대 5단계의 간접 참조가 분석됩니다.

