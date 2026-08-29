---
title: 타입 인덱싱
sidebar:
  order: 34
  label: 34. 타입 인덱싱
---


타입 인덱싱은 명시적으로 선언되지 않은 프로퍼티의 타입을 지정하는 인덱스 시그니처를 사용하여 미리 알 수 없는 키로 인덱싱할 수 있는 타입을 정의하는 기능을 의미합니다.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

