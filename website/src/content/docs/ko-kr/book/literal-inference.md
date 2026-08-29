---
title: 리터럴 추론
sidebar:
  order: 18
  label: 18. 리터럴 추론
---


리터럴 추론은 변수나 매개변수의 값을 바탕으로 타입을 추론할 수 있게 해주는 TypeScript 기능입니다.

다음 예제에서 TypeScript는 `x`의 값을 나중에 변경할 수 없으므로 이를 리터럴 타입으로 간주하는 반면, `y`는 나중에 언제든지 수정할 수 있으므로 string으로 추론합니다.

```typescript
const x = 'x'; // Literal type of 'x', because this value cannot be changed
let y = 'y'; // Type string, as we can change this value
```

다음 예제에서 TypeScript는 값이 나중에 언제든지 변경될 수 있다고 간주하므로 `o.x`를 `string`으로(`a` 리터럴이 아니라) 추론합니다.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // This is a wider string
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // Argument of type 'string' is not assignable to parameter of type 'X'
```

보이는 것처럼 X가 더 좁은 타입이므로 `o.x`를 `fn`에 전달할 때 코드에서 오류가 발생합니다.

`const` 또는 `X` 타입으로 타입 단언을 사용하여 이 문제를 해결할 수 있습니다.

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

또는 다음과 같이 작성합니다.

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

