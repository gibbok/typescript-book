# 조건부 타입의 infer 타입 추론



`infer` 키워드는 조건부 타입에서 해당 타입에 의존하는 제네릭 매개변수의 타입을 추론(추출)하는 데 사용됩니다. 이를 통해 더 유연하고 재사용 가능한 타입 정의를 작성할 수 있습니다.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

