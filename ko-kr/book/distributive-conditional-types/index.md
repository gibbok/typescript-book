# 분배 조건부 타입



분배 조건부 타입은 유니온의 각 멤버에 변환을 개별적으로 적용하여 타입을 타입 유니온 전체에 분배할 수 있게 하는 기능입니다.
이는 매핑된 타입이나 고차 타입을 다룰 때 특히 유용할 수 있습니다.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

